/**
 * La verificación completa, de una: lint → build → servidor → arnés → prueba.
 *
 * Existe porque encadenar esto a mano tiene un pie muy fácil de pisar. Si
 * queda un `next start` vivo de una vez anterior, el nuevo no puede coger el
 * puerto, se muere en silencio, y el navegador acaba midiendo el build viejo:
 * el HTML pide un CSS que ya no existe, la página se sirve SIN ESTILOS y el
 * arnés informa de desastres de maquetación que no son reales. Pasó, y costó
 * caro. Aquí el servidor se levanta en un puerto libre y se mata siempre,
 * pase lo que pase.
 *
 * Uso: pnpm verificar-todo
 */
import { spawn } from "node:child_process";
import { createServer } from "node:net";

const ejecutar = (cmd, args, opciones = {}) =>
  new Promise((resolver) => {
    const p = spawn(cmd, args, { stdio: "inherit", shell: false, ...opciones });
    p.on("close", (codigo) => resolver(codigo ?? 1));
  });

const puertoLibre = () =>
  new Promise((resolver) => {
    const s = createServer();
    s.listen(0, () => {
      const { port } = s.address();
      s.close(() => resolver(port));
    });
  });

const esperarA = async (url, intentos = 60) => {
  for (let i = 0; i < intentos; i++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (r.ok) return true;
    } catch {
      /* todavía no levanta */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
};

const paso = (n, texto) => console.log(`\n\x1b[1m▸ ${n} · ${texto}\x1b[0m`);

paso(1, "lint");
if (await ejecutar("pnpm", ["lint"])) {
  console.error("\n✗ el lint falla. Nada más se ejecuta.");
  process.exit(1);
}

paso(2, "build");
if (await ejecutar("pnpm", ["build"])) {
  console.error("\n✗ el build falla. Nada más se ejecuta.");
  process.exit(1);
}

const puerto = await puertoLibre();
const base = `http://localhost:${puerto}`;
paso(3, `servidor en ${base}`);

const servidor = spawn("pnpm", ["start", "--port", String(puerto)], {
  stdio: ["ignore", "ignore", "inherit"],
  detached: true,
});

let salida = 1;
try {
  if (!(await esperarA(base))) {
    console.error(`✗ el servidor no respondió en ${base}`);
    process.exit(1);
  }
  console.log("  levantado");

  paso(4, "arnés responsive");
  const a = await ejecutar("node", ["scripts/auditar-responsive.mjs", base]);

  paso(5, "garantías de Reveal");
  const r = await ejecutar("node", ["scripts/probar-reveal.mjs", base]);

  salida = a || r ? 1 : 0;
  console.log(salida === 0 ? "\n\x1b[32m✓ todo pasa\x1b[0m" : "\n\x1b[31m✗ hay fallos arriba\x1b[0m");
} finally {
  // El grupo entero: `pnpm start` deja un next-server hijo que sobrevive si
  // solo se mata al padre. Ese huérfano es justo el que provoca el fallo que
  // este script existe para evitar.
  try {
    process.kill(-servidor.pid, "SIGKILL");
  } catch {
    /* ya estaba muerto */
  }
}

process.exit(salida);
