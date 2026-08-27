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

          <nav className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {ENLACES.map((e) => (
              <a
                key={e.texto}
                href={e.href}
                {...(e.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="font-medium text-white/85 transition hover:text-white hover:underline"
              >
                {e.texto}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/60">
            <a href={`mailto:${PROGRAMA.correo}`} className="hover:text-white">
              {PROGRAMA.correo}
            </a>
            <a href={`mailto:${PROGRAMA.correoQuejas}`} className="hover:text-white">
              {PROGRAMA.correoQuejas}
            </a>
          </div>
        </div>

        {/* Atribución de las fotos. CC BY y CC BY-SA la exigen; va aquí, visible. */}
        <div className="mt-14 border-t border-white/15 pt-8">
          <p className="text-center text-xs uppercase tracking-[0.14em] text-white/35">
            Créditos fotográficos
          </p>
          <ul className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-xs text-white/45">
            {CREDITOS_FOTOS.map((c) => (
              <li key={c.archivo}>
                <a
                  href={c.fuente}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/75 hover:underline"
                >
                  {c.titulo}
                </a>{" "}
                · {c.autor} ·{" "}
                <a
                  href={c.licenciaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/75 hover:underline"
                >
                  {c.licencia}
                </a>
              </li>
            ))}
          </ul>
        </div>

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
