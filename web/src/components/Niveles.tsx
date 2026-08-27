import { ArrowUpRight, Clock, Layers } from "lucide-react";
import { NIVELES, FORMACION_CABECERA } from "@/lib/contenido";
import { Borrador } from "./revision";
import { Reveal } from "./Reveal";

/**
 * Los tres niveles de formación.
 *
 * Toma el molde que tenía la sección de cursos abiertos —fondo morado del SEAL,
 * cabecera alineada a la izquierda en blanco, tarjetas blancas encima—, que es
 * lo que se pidió el 2026-08-27. Aquella sección se retiró: los niveles son
 * ahora lo único que se enseña de formación.
 */
export function Niveles() {
  return (
    <section id="niveles" className="bg-morado px-6 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-verde-claro">
              {FORMACION_CABECERA.antetitulo}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {FORMACION_CABECERA.titulo}
            </h2>
            <p className="mt-3 leading-relaxed text-white/60">{FORMACION_CABECERA.bajada}</p>
            <p className="mt-8 text-xl font-bold tracking-tight text-white md:text-2xl">
              {FORMACION_CABECERA.subtitulo}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {NIVELES.map((n, i) => (
            <Reveal key={n.n} delay={i * 0.09}>
              <a
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-morado text-xl font-bold text-white">
                    {n.n}
                  </span>
                  <ArrowUpRight
                    size={22}
                    className="text-navy/25 transition group-hover:text-verde"
                  />
                </div>

                <h3 className="mt-7 text-2xl font-bold leading-tight tracking-tight text-navy">
                  {n.nombre}
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-navy/65">{n.detalle}</p>

                <div className="mt-8 flex items-center gap-5 border-t border-navy/8 pt-5 text-sm text-navy/50">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={15} />
                    <Borrador>{n.duracion}</Borrador>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Layers size={15} />
                    <Borrador>{n.modulos} módulos</Borrador>
                  </span>
                </div>

                {/* Barra de acento, molde SEAL */}
                <span className="mt-6 block h-1 w-10 rounded-full bg-verde transition-all duration-300 group-hover:w-full" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
