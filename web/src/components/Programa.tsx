import Image from "next/image";
import { Check, Users, Sprout, TrendingUp } from "lucide-react";
import { QUE_ES, OBJETIVOS, ENFOQUES, TARJETA_PMA } from "@/lib/contenido";
import { Reveal } from "./Reveal";

/** Un icono por enfoque, en el mismo orden que ENFOQUES. */
const ICONOS_ENFOQUE = [Users, Sprout, TrendingUp];

export function Programa() {
  return (
    <section id="programa" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-verde">
              El programa
            </p>
            <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
              Fortalecer lo que ya produce el territorio
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-navy/70">
              {QUE_ES.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {ENFOQUES.map((e, i) => {
                const Icono = ICONOS_ENFOQUE[i] ?? Check;
                return (
                  <span
                    key={e}
                    className="inline-flex items-center gap-2 rounded-full bg-verde-claro px-4 py-2 text-sm font-semibold text-verde"
                  >
                    <Icono size={15} className="shrink-0" />
                    {e}
                  </span>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="/img/campo.jpg"
                  alt="Productor trabajando la tierra"
                  fill
                  className="object-cover"
                  quality={62}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 46vw"
                />
              </div>
              <div className="relative -mt-6 ml-0 max-w-[16rem] rounded-xl bg-navy p-6 text-white shadow-2xl sm:absolute sm:-bottom-6 sm:-left-6 sm:mt-0">
                <p className="text-2xl font-bold uppercase leading-[1.1] tracking-tight">
                  {TARJETA_PMA.titulo}
                </p>
                <p className="mt-2 text-sm leading-snug text-white/70">{TARJETA_PMA.texto}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Objetivos específicos — textuales de la ficha oficial */}
        <Reveal>
          <div className="mt-28 rounded-2xl bg-gris p-10 md:p-14">
            <h3 className="text-2xl font-bold tracking-tight">Qué hace el proyecto</h3>
            <ul className="mt-10 grid gap-x-12 gap-y-6 md:grid-cols-2">
              {OBJETIVOS.map((o) => (
                <li key={o} className="flex gap-3.5">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-verde/10 text-verde">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="leading-relaxed text-navy/80">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
