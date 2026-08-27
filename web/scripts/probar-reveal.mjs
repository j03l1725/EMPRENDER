/**
 * Prueba de las tres garantías de <Reveal>.
 *
 * Existe por la Trampa 4 de CLAUDE.md: una versión anterior animaba con JS y
 * una caída del script dejó la página en blanco. Eso no se detecta mirando la
 * página en un navegador sano, así que se comprueba aquí.
 *
 *   1 · Sin JS, todo el texto se lee.
 *   2 · Con «menos movimiento», todo el texto se lee y nada se anima.
 *   3 · Con JS, lo que está bajo el pliegue empieza escondido y aparece al
 *       llegar a él. Si no, la animación no está haciendo nada.
 *
 * Uso: pnpm probar   (necesita el sitio servido en :3000)
 */
import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const BASE = process.argv[2] || "http://localhost:3000";

const CHROME = process.env.CHROME || [
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/snap/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((r) => existsSync(r));

if (!CHROME) {
  console.error("✗ No se encontró Chrome. Indica la ruta: CHROME=/ruta/al/chrome pnpm probar");
  process.exit(2);
}

const b = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

let fallos = 0;
const comprobar = (nombre, ok, detalle = "") => {
  console.log(`${ok ? "✓" : "✗"} ${nombre}${detalle ? `  — ${detalle}` : ""}`);
  if (!ok) fallos++;
};

// Cuenta el texto que un ojo humano puede leer: descarta lo transparente y lo
// que tenga tamaño cero. Es la medida que importa, no si el nodo existe.
const textoLegible = () =>
  [...document.querySelectorAll("h1,h2,h3,p,li")].filter((el) => {
    const q = el.getBoundingClientRect();
    if (q.width < 10 || q.height < 5) return false;
    if (!(el.textContent || "").trim()) return false;
    let a = el;
    while (a && a !== document.documentElement) {
      const cs = getComputedStyle(a);
      if (Number(cs.opacity) < 0.05 || cs.visibility === "hidden" || cs.display === "none") return false;
      a = a.parentElement;
    }
    return true;
  }).length;

// ─── 1 · Sin JavaScript ──────────────────────────────────────────────────────
{
  const p = await b.newPage();
  await p.setJavaScriptEnabled(false);
  await p.setViewport({ width: 1280, height: 800 });
  await p.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
  const n = await p.evaluate(textoLegible);
  comprobar("sin JS se lee la página", n > 40, `${n} bloques de texto legibles`);
  await p.close();
}

// ─── 2 · prefers-reduced-motion ──────────────────────────────────────────────
{
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 800 });
  await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await p.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 400));
  const escondidos = await p.evaluate(() =>
    [...document.querySelectorAll("div[style*='opacity']")]
      .filter((el) => Number(getComputedStyle(el).opacity) < 0.05).length,
  );
  const n = await p.evaluate(textoLegible);
  comprobar("con «menos movimiento» no se esconde nada", escondidos === 0, `${escondidos} escondidos`);
  comprobar("con «menos movimiento» se lee la página", n > 40, `${n} bloques de texto legibles`);
  await p.close();
}

// ─── 3 · La animación de entrada hace algo ───────────────────────────────────
{
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 800 });
  await p.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 400));

  const antes = await p.evaluate(() =>
    [...document.querySelectorAll("div[style*='opacity']")]
      .filter((el) => {
        const q = el.getBoundingClientRect();
        return q.top > window.innerHeight && Number(getComputedStyle(el).opacity) < 0.05;
      }).length,
  );
  comprobar("bajo el pliegue empieza escondido", antes > 0, `${antes} elementos escondidos esperando`);

  // Bajar del todo y dar tiempo a la transición de .55s
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 1500));
  await p.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 1500));

  const despues = await p.evaluate(() =>
    [...document.querySelectorAll("div[style*='opacity']")]
      .filter((el) => Number(getComputedStyle(el).opacity) < 0.05).length,
  );
  comprobar("tras recorrerla, nada queda escondido", despues === 0, `${despues} siguen escondidos`);

  const n = await p.evaluate(textoLegible);
  comprobar("con JS se lee la página", n > 40, `${n} bloques de texto legibles`);
  await p.close();
}

await b.close();
console.log(fallos === 0 ? "\n✓ Reveal cumple sus tres garantías" : `\n✗ ${fallos} comprobaciones fallan`);
process.exit(fallos === 0 ? 0 : 1);
