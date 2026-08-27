import { ArrowRight, Info } from "lucide-react";
import { PROCESO, PROCESO_CABECERA, PROCESO_NOTA } from "@/lib/contenido";
import { Reveal } from "./Reveal";

/**
 * El recorrido del programa, de postular a implementar.
 *
 * ▲ Este fichero se perdió y se reconstruyó desde el código compilado que
 * quedaba en `.next` (2026-08-27): se borró por error creyendo que era el
 * duplicado de «Cronograma», y nunca llegó a estar en git. Si algún detalle no
 * cuadra con el original, viene de ahí.
 */
export function Proceso() {
  return (
    <section id="proceso" className="bg-plomo px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-verde">
              {PROCESO_CABECERA.antetitulo}
            </p>
            <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
              {PROCESO_CABECERA.titulo}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy/70">
              {PROCESO_CABECERA.bajada}
            </p>
          </div>
        </Reveal>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESO.map((e, i) => {
            const ultima = i === PROCESO.length - 1;
            return (
              // El <li> va pegado al <ol> —un div por medio rompe la lista— y por
              // eso es él quien lleva las clases de rejilla. <Reveal> envuelve el
              // contenido, dentro.
              <li key={e.titulo} className={ultima ? "lg:col-span-2" : ""}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl bg-white p-7 ring-1 ring-navy/8">
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-verde">
                      {String(i + 1).padStart(2, "0")} · {e.titulo}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/70">{e.texto}</p>
                    <ArrowRight
                      size={18}
                      aria-hidden
                      className={`mt-6 self-end text-navy/25 ${ultima ? "invisible" : ""}`}
                    />
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <Reveal>
          <p className="mt-8 flex items-start gap-3 rounded-2xl bg-white/60 p-6 text-sm leading-relaxed text-navy/65">
            <Info size={17} className="mt-0.5 shrink-0 text-navy/40" />
            {PROCESO_NOTA}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
