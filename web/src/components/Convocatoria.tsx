import { ArrowRight, FileText, CalendarClock } from "lucide-react";
import { CONVOCATORIA } from "@/lib/contenido";
import { Borrador } from "./revision";
import { Reveal } from "./Reveal";

export function Convocatoria() {
  return (
    <section id="convocatoria" className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          {/* Tarjeta del monto */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-verde">
                Convocatoria
              </p>
              <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
                Capital semilla para tu agronegocio
              </h2>

              <div className="mt-10 overflow-hidden rounded-2xl border border-navy/10">
                <div className="bg-verde-claro px-8 py-8">
                  <p className="text-sm font-semibold uppercase tracking-wide text-verde">
                    Monto por unidad productiva
                  </p>
                  <p className="mt-3 text-[clamp(2rem,4vw,2.75rem)] font-bold leading-none tracking-tight">
                    {CONVOCATORIA.montoMin}
                    <span className="mx-2.5 font-normal text-verde/50">–</span>
                    {CONVOCATORIA.montoMax}
                  </p>
                </div>
                <div className="flex items-center gap-3 px-8 py-5 text-sm">
                  <CalendarClock size={17} className="shrink-0 text-navy/40" />
                  <span className="text-navy/70">
                    <Borrador nota="Fechas de la convocatoria 2026 — las da Estefy">
                      {CONVOCATORIA.estado} · cierre {CONVOCATORIA.cierre}
                    </Borrador>
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={CONVOCATORIA.urlPostular}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-verde px-8 py-4 font-semibold text-white transition hover:bg-verde/85"
                >
                  Postular ahora
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </a>
                <a
                  href={CONVOCATORIA.urlBases}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-navy/20 px-8 py-4 font-semibold transition hover:border-navy hover:bg-navy hover:text-white"
                >
                  <FileText size={18} />
                  Bases de la convocatoria
                </a>
              </div>
            </div>
          </Reveal>

          {/* Pasos */}
          <Reveal delay={0.1}>
            <ol className="relative space-y-1">
              {CONVOCATORIA.pasos.map((p, i) => (
                <li key={p.n} className="relative flex gap-7 pb-12 last:pb-0">
                  {i < CONVOCATORIA.pasos.length - 1 && (
                    <span className="absolute left-[27px] top-14 h-[calc(100%-2.5rem)] w-px bg-navy/12" />
                  )}
                  <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy text-lg font-bold text-white">
                    {p.n}
                  </span>
                  <div className="pt-2.5">
                    <h3 className="text-xl font-bold tracking-tight">{p.titulo}</h3>
                    <p className="mt-2.5 leading-relaxed text-navy/65">
                      <Borrador nota="Los pasos los redactamos nosotros — confirmar con Estefy">
                        {p.detalle}
                      </Borrador>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
