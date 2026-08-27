import { PROGRAMA, CREDITOS_FOTOS } from "@/lib/contenido";

const ENLACES = [
  { href: "#programa", texto: "El programa" },
  { href: "#convocatoria", texto: "Convocatoria" },
  { href: "#niveles", texto: "Formación" },
  { href: "#recursos", texto: "Recursos" },
  { href: PROGRAMA.fichaOficial, texto: "Ficha oficial", externo: true },
];

export function Footer() {
  return (
    <footer className="bg-morado px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-10 text-center">
          <p className="text-2xl font-extrabold tracking-tight">EMPRENDER</p>

          <nav className="-my-2 flex flex-wrap justify-center gap-x-8 gap-y-1">
            {ENLACES.map((e) => (
              <a
                key={e.texto}
                href={e.href}
                {...(e.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="px-1 py-2.5 font-medium text-white/85 transition hover:text-white hover:underline"
              >
                {e.texto}
              </a>
            ))}
          </nav>

          <div className="-my-2 flex flex-wrap justify-center gap-x-6 gap-y-0 text-sm text-white/60">
            <a href={`mailto:${PROGRAMA.correo}`} className="px-1 py-2.5 hover:text-white">
              {PROGRAMA.correo}
            </a>
            <a href={`mailto:${PROGRAMA.correoQuejas}`} className="px-1 py-2.5 hover:text-white">
              {PROGRAMA.correoQuejas}
            </a>
          </div>
        </div>

        {/*
          Atribución de las fotos. Ocupaba un bloque entero y se pidió reducirla.
          Se pliega en una línea, pero NO se borra: dos de las licencias son
          CC BY-SA y todas exigen atribución, y la página es públicamente
          alcanzable aunque lleve `noindex`. Plegada sigue cumpliendo —el texto
          está en el HTML y a un clic—; borrada, no. Ver Regla 4.

          Cuando lleguen las fotos propias del Ministerio, se borra
          CREDITOS_FOTOS de contenido.ts y este bloque desaparece solo.
        */}
        <details className="group mt-12 border-t border-white/10 pt-6">
          <summary className="cursor-pointer list-none text-center text-[11px] uppercase tracking-[0.14em] text-white/25 transition hover:text-white/50">
            Créditos fotográficos
            <span className="ml-1.5 inline-block transition group-open:rotate-180">▾</span>
          </summary>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] leading-relaxed text-white/35">
            {CREDITOS_FOTOS.map((c) => (
              <li key={c.archivo}>
                <a
                  href={c.fuente}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/70 hover:underline"
                >
                  {c.titulo}
                </a>{" "}
                · {c.autor} ·{" "}
                <a
                  href={c.licenciaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/70 hover:underline"
                >
                  {c.licencia}
                </a>
              </li>
            ))}
          </ul>
        </details>

        <div className="mt-10 border-t border-white/15 pt-8 text-center text-sm text-white/55">
          <p className="mx-auto max-w-2xl leading-relaxed">
            {PROGRAMA.nombreLargo}
          </p>
          <p className="mt-3">© 2026 · {PROGRAMA.ejecutor} del Ecuador</p>
        </div>
      </div>
    </footer>
  );
}
