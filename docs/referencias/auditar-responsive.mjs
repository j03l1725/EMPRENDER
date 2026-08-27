import puppeteer from "puppeteer-core";

const BASE = process.argv[2] || "http://localhost:3000";
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
  executablePath: "/usr/bin/google-chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

for (const v of VIEWPORTS) {
  const p = await b.newPage();
  await p.setViewport({ width: v.w, height: v.h, isMobile: v.movil, hasTouch: v.movil });
  await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await p.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });

  const r = await p.evaluate(() => {
    // ¿Puede el usuario desplazar la página de lado? Es la única prueba que importa.
    window.scrollTo(9999, 0);
    const desplaza = window.scrollX;
    window.scrollTo(0, 0);

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
      desplaza, vw,
      alto: document.body.scrollHeight,
      culpables: [...new Set(culpables)].slice(0, 6),
      cortado: [...new Set(cortado)].slice(0, 6),
      chicos: [...new Set(chicos)].slice(0, 6),
    };
  });

  const ok = r.desplaza === 0 && r.culpables.length === 0 && r.cortado.length === 0;
  console.log(`\n${ok ? "✓" : "✗"} ${v.n.padEnd(13)} ${v.w}x${v.h}  alto=${r.alto}px  scrollX=${r.desplaza}`);
  r.culpables.forEach((c) => console.log(`     desborda: ${c}`));
  r.cortado.forEach((c) => console.log(`     texto cortado: ${c}`));
  r.chicos.forEach((c) => console.log(`     toque chico: ${c}`));

  await p.close();
}
await b.close();
