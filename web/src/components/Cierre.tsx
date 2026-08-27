import { ArrowRight, FileText } from "lucide-react";
import { CIERRE, CONVOCATORIA } from "@/lib/contenido";
import { Reveal } from "./Reveal";

/**
 * La franja de cierre: lo último que se lee y lo único que hay que hacer.
 *
 * Recoge los tres pasos de postulación que estaban en la tarjeta azul de la
 * sección de la convocatoria. Allí llegaban demasiado pronto —antes de los
 * requisitos y del cronograma—; aquí llegan cuando el postulante ya sabe si
 * le sirve el programa.
 *
 * El resplandor verde va en un div aparte con `pointer-events-none`: es
 * decoración y no debe comerse los clics de los dos botones.
 */
export function Cierre() {
  return (
    <section className="relative overflow-hidden bg-navy px-6 py-24 text-white md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          background:
            "radial-gradient(ellipse 70% 90% at 15% 0%, #1c6d0e 0%, transparent 62%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div>
            <h2 className="text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.08] tracking-tight">
              {CIERRE.titulo}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">{CIERRE.bajada}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={CONVOCATORIA.urlFormulario}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-verde px-8 py-4 font-semibold transition hover:bg-verde/85"
              >
                {CIERRE.botonPrimario}
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </a>
              <a
                href={CONVOCATORIA.urlBases}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-8 py-4 font-semibold transition hover:bg-white/10"
              >
                <FileText size={18} />
                {CIERRE.botonSecundario}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ol className="space-y-5 rounded-2xl bg-white/6 p-9 ring-1 ring-white/12">
            {CIERRE.pasos.map((paso, i) => (
              <li key={paso} className="flex gap-4">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-verde-claro text-xs font-bold text-verde">
                  {i + 1}
                </span>
                <span className="leading-relaxed text-white/80">{paso}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
