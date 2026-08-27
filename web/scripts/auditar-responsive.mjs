import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const BASE = process.argv[2] || "http://localhost:3000";

// puppeteer-core no trae navegador. Se usa el Chrome del sistema; la ruta se
// puede forzar con CHROME=/ruta/al/binario para máquinas que lo tengan en otro
// sitio. Antes estaba clavada a /usr/bin/google-chrome y el arnés no arrancaba
// fuera de la máquina donde se escribió.
const CHROME = process.env.CHROME || [
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/snap/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((r) => existsSync(r));

if (!CHROME) {
  console.error("✗ No se encontró Chrome. Indica la ruta: CHROME=/ruta/al/chrome pnpm auditar");
  process.exit(2);
}
const VIEWPORTS = [
  { n: "iphone-se",     w: 375,  h: 667,  movil: true },
  { n: "iphone-15",     w: 390,  h: 844,  movil: true },
  { n: "iphone-max",    w: 430,  h: 932,  movil: true },
  { n: "ipad-mini-v",   w: 768,  h: 1024, movil: true },
  { n: "ipad-air-v",    w: 820,  h: 1180, movil: true },
  { n: "ipad-pro-v",    w: 1024, h: 1366, movil: true },
  { n: "ipad-h",        w: 1024, h: 768,  movil: true },
  { n: "laptop-chico",  w: 1280, h: 800,  movil: false },
];

const b = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

let fallos = 0;

for (const v of VIEWPORTS) {
  const p = await b.newPage();
  await p.setViewport({ width: v.w, height: v.h, isMobile: v.movil, hasTouch: v.movil });
  await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await p.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });

  const r = await p.evaluate((anchoPantalla) => {
    // ¿Puede el usuario desplazar la página de lado?
    window.scrollTo(9999, 0);
    const desplaza = window.scrollX;
    window.scrollTo(0, 0);

    // ▲▲ La prueba que de verdad importa, y la que scrollX NO da.
    // Un carrusel horizontal puede ensanchar la ventana de composición sin
    // producir scroll: innerWidth pasa a 704 en una pantalla de 375 y todo lo
    // `position: fixed` se coloca contra ese ancho falso, fuera de la vista.
    // Es la Trampa 1 de CLAUDE.md, y así es como se detecta.
    const anchoComposicion = window.innerWidth;
    const ensancha = anchoComposicion > anchoPantalla + 1;

    // Corolario: lo `fixed` tiene que caer dentro de la pantalla real.
    const fugados = [];
    document.querySelectorAll("body *").forEach((el) => {
      if (getComputedStyle(el).position !== "fixed") return;
      const q = el.getBoundingClientRect();
      if (q.width === 0 || q.height === 0) return;
      if (q.left > anchoPantalla - 8 || q.right < 8) {
        fugados.push(`${el.tagName.toLowerCase()}[x=${Math.round(q.left)}] ${(el.className?.toString?.() || "").slice(0, 45)}`);
      }
    });

    const vw = document.documentElement.clientWidth;
    const clipa = (el) => {
      let a = el.parentElement;
      while (a && a !== document.documentElement) {
        const o = getComputedStyle(a).overflowX;
        if (o !== "visible") return true;
        a = a.parentElement;
      }
      return false;
    };
    const culpables = [];
    document.querySelectorAll("body *").forEach((el) => {
      const q = el.getBoundingClientRect();
      if (q.right > vw + 1 && q.width > 30 && !clipa(el)) {
        culpables.push(`${el.tagName.toLowerCase()}[${Math.round(q.width)}px→${Math.round(q.right)}] ${(el.className?.toString?.() || "").slice(0, 55)}`);
      }
    });

    // Texto que se sale de su caja (desbordamiento de palabras largas)
    const cortado = [];
    document.querySelectorAll("h1,h2,h3,p,a,li,span,button").forEach((el) => {
      if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 40 &&
          getComputedStyle(el).overflowX === "visible") {
        cortado.push(`${el.tagName.toLowerCase()}: "${(el.textContent || "").trim().slice(0, 38)}"`);
      }
    });

    // Objetivos de toque demasiado pequeños
    const chicos = [];
    document.querySelectorAll("a,button").forEach((el) => {
      const q = el.getBoundingClientRect();
      if (q.width > 0 && q.height > 0 && (q.height < 32 || q.width < 32)) {
        chicos.push(`${el.tagName.toLowerCase()} ${Math.round(q.width)}x${Math.round(q.height)} "${(el.textContent || "").trim().slice(0, 24)}"`);
      }
    });

    return {
      desplaza, vw, anchoComposicion, ensancha,
      alto: document.body.scrollHeight,
      fugados: [...new Set(fugados)].slice(0, 6),
      culpables: [...new Set(culpables)].slice(0, 6),
      cortado: [...new Set(cortado)].slice(0, 6),
      chicos: [...new Set(chicos)].slice(0, 6),
    };
  }, v.w);

  const ok = r.desplaza === 0 && !r.ensancha && r.fugados.length === 0 &&
             r.culpables.length === 0 && r.cortado.length === 0;
  if (!ok) fallos++;

  const ancho = r.ensancha ? `innerWidth=${r.anchoComposicion}▲` : `innerWidth=${r.anchoComposicion}`;
  console.log(`\n${ok ? "✓" : "✗"} ${v.n.padEnd(13)} ${v.w}x${v.h}  alto=${r.alto}px  scrollX=${r.desplaza}  ${ancho}`);
  if (r.ensancha) {
    console.log(`     ▲ la ventana de composición mide ${r.anchoComposicion}px en una pantalla de ${v.w}px`);
    console.log(`       (Trampa 1 de CLAUDE.md: falta 'contain: layout' en algo con scroll horizontal)`);
  }
  r.fugados.forEach((c) => console.log(`     fixed fuera de pantalla: ${c}`));
  r.culpables.forEach((c) => console.log(`     desborda: ${c}`));
  r.cortado.forEach((c) => console.log(`     texto cortado: ${c}`));
  r.chicos.forEach((c) => console.log(`     toque chico: ${c}`));

  await p.close();
}
await b.close();

// Sale con código distinto de cero para poder encadenarlo: `pnpm verificar && pnpm auditar`
console.log(fallos === 0
  ? `\n✓ los ${VIEWPORTS.length} tamaños pasan`
  : `\n✗ ${fallos} de ${VIEWPORTS.length} tamaños fallan`);
process.exit(fallos === 0 ? 0 : 1);
