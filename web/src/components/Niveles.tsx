import { ArrowUpRight, Clock, Layers } from "lucide-react";
import { NIVELES } from "@/lib/contenido";
import { Borrador } from "./revision";
import { Reveal } from "./Reveal";

export function Niveles() {
  return (
    <section id="niveles" className="bg-gris px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-verde">
              Formación
            </p>
            <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
              Tres niveles, un camino
            </h2>
            <p className="mt-5 text-lg text-navy/65">
              Cada nivel se cursa en la plataforma de enseñanza en línea del Ministerio de
              Agricultura, Ganadería y Pesca.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {NIVELES.map((n, i) => (
            <Reveal key={n.n} delay={i * 0.09}>
              <a
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl bg-white p-9 ring-1 ring-navy/8 transition hover:-translate-y-1 hover:shadow-xl hover:ring-verde/30"
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

                <h3 className="mt-7 text-2xl font-bold leading-tight tracking-tight">
                  <Borrador nota="Nombre del nivel — lo confirma Estefy">{n.nombre}</Borrador>
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-navy/65">
                  <Borrador nota="Contenido del nivel — lo confirma Estefy">{n.detalle}</Borrador>
                </p>

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
