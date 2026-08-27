import { Check, Mail } from "lucide-react";
import { CONVOCATORIA, REGLAS_DINERO, FINANCIABLE } from "@/lib/contenido";
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

        {/* En qué se puede gastar el capital semilla.

            Aquí había además una tarjeta azul, «Cómo se postula», y debajo un
            bloque de perfiles deseables. Los dos salieron el 2026-08-27 a
            petición de Estefy: los tres pasos de postular están ahora en la
            franja de cierre, al final de la página, y el recorrido completo del
            programa en la sección «El proceso». */}
        <Reveal>
          <div className="mt-8 rounded-2xl bg-white p-9 ring-1 ring-navy/8">
            <h3 className="flex items-center gap-2.5 text-xl font-bold">
              <Check size={20} strokeWidth={3} className="text-verde" />
              Qué puedes financiar
            </h3>
            <ul className="mt-6 grid gap-3 md:grid-cols-2 md:gap-x-10">
              {FINANCIABLE.map((f) => (
                <li key={f} className="flex gap-3 text-sm leading-relaxed text-navy/75">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-verde" />
                  {f}
                </li>
              ))}
            </ul>
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
