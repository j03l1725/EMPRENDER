import { ArrowRight, FileText, Mail, AlertTriangle } from "lucide-react";
import { CONVOCATORIA, REGLAS_DINERO, CONDICIONES, PERFILES_DESEABLES } from "@/lib/contenido";
import { Reveal } from "./Reveal";

export function Convocatoria() {
  return (
    <section id="convocatoria" className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-5 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-verde">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verde opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-verde" />
              </span>
              Convocatoria abierta
            </p>
            <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
              {CONVOCATORIA.titulo}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy/70">
              {CONVOCATORIA.bajada}
            </p>
          </div>
        </Reveal>

        {/* Las tres reglas de dinero */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {REGLAS_DINERO.map((r, i) => (
            <Reveal key={r.titulo} delay={i * 0.08}>
              <div className="h-full rounded-2xl bg-verde-claro p-9">
                <p className="text-[clamp(1.75rem,2.8vw,2.25rem)] font-bold leading-none tracking-tight text-verde">
                  {r.cifra}
                </p>
                <h3 className="mt-4 text-lg font-bold">{r.titulo}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-navy/70">{r.detalle}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Cómo se postula, sin mandar a nadie a un Drive */}
        <Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-navy p-9 text-white">
              <h3 className="text-xl font-bold">Cómo se postula</h3>
              <ol className="mt-6 space-y-4 text-white/75">
                <li className="flex gap-3.5">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold">
                    1
                  </span>
                  <span className="leading-relaxed">
                    Llena el <strong className="font-semibold text-white">formulario de postulación</strong> en línea.
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold">
                    2
                  </span>
                  <span className="leading-relaxed">
                    Reúne los documentos de la lista de abajo en una carpeta digital —Drive,
                    OneDrive— <strong className="font-semibold text-white">con acceso público</strong>.
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold">
                    3
                  </span>
                  <span className="leading-relaxed">
                    Envía el enlace de esa carpeta a{" "}
                    <a
                      href={`mailto:${CONVOCATORIA.correoPostulacion}`}
                      className="break-all font-semibold text-verde-claro underline underline-offset-4"
                    >
                      {CONVOCATORIA.correoPostulacion}
                    </a>
                    .
                  </span>
                </li>
              </ol>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={CONVOCATORIA.urlFormulario}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-verde px-7 py-3.5 font-semibold transition hover:bg-verde/85"
                >
                  Abrir el formulario
                  <ArrowRight size={17} className="transition group-hover:translate-x-1" />
                </a>
                <a
                  href={CONVOCATORIA.urlBases}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-7 py-3.5 font-semibold transition hover:bg-white/10"
                >
                  <FileText size={17} />
                  Bases completas (PDF)
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-navy/10 p-9">
              <h3 className="text-xl font-bold">Además de los requisitos</h3>
              <ul className="mt-6 space-y-5">
                {CONDICIONES.map((c) => (
                  <li key={c.titulo}>
                    <p className="font-semibold">{c.titulo}</p>
                    <p className="mt-1 text-sm leading-relaxed text-navy/65">{c.detalle}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Perfiles deseables */}
        <Reveal>
          <div className="mt-8 rounded-2xl bg-gris p-9">
            <h3 className="text-lg font-bold">Se valora especialmente que en tu cadena de valor participen</h3>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {PERFILES_DESEABLES.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-navy/12 bg-white px-4 py-2 text-sm text-navy/80"
                >
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-start gap-2.5 text-sm text-navy/55">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              Los beneficiarios directos e indirectos de una cadena de valor no pueden participar
              en más de una solicitud de cofinanciamiento.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-10 text-center text-sm leading-relaxed text-navy/55">
            <Mail size={16} className="mr-2 inline-block align-text-bottom" />
            ¿Problemas con algún enlace? Escribe a{" "}
            <a
              href={`mailto:${CONVOCATORIA.correoPostulacion}`}
              className="break-all font-semibold text-verde underline underline-offset-4"
            >
              {CONVOCATORIA.correoPostulacion}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
