"use client";

import { Clock, Layers } from "lucide-react";
import { NIVELES, FORMACION_CABECERA } from "@/lib/contenido";
import { Reveal } from "./Reveal";
import { SqueezeCarousel, type SqueezeSlide } from "./ui/carousel-squeeze";

/**
 * Los tres niveles de formación, en carrusel de acordeón.
 *
 * Sigue con el fondo morado del SEAL. Los paneles cerrados son anchos —no las
 * tiras de ocho píxeles de la demo original— porque con tres niveles hay que
 * poder distinguirlos sin abrirlos: cada uno lleva su nombre girado encima.
 *
 * La duración y el número de módulos siguen marcados como `borrador`: van en el
 * rótulo de la esquina del panel abierto, envueltos por el propio <Borrador>
 * desde el componente padre, para que el botón «Revisión» los siga resaltando.
 */
const slides: SqueezeSlide[] = NIVELES.map((n) => ({
  id: String(n.n),
  title: n.nombre,
  description: n.detalle,
  action: "Ver el nivel",
  href: n.href,
  image: n.foto,
  imageAlt: "",
  slatLabel: n.nombre,
  overlay: (
    <span className="flex items-center gap-3 text-white sm:gap-4">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-base font-bold backdrop-blur sm:h-11 sm:w-11 sm:text-lg">
        {n.n}
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-base font-bold leading-tight sm:text-lg">{n.nombre}</span>
        <span className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/70">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} />
            {n.duracion}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Layers size={13} />
            {n.modulos} módulos
          </span>
        </span>
      </span>
    </span>
  ),
}));

export function Niveles() {
  return (
    <section id="niveles" className="bg-morado px-6 py-20 text-white md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-verde-claro">
              {FORMACION_CABECERA.antetitulo}
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {FORMACION_CABECERA.titulo}
            </h2>
            <p className="mt-3 leading-relaxed text-white/60">{FORMACION_CABECERA.bajada}</p>
            <p className="mt-8 text-xl font-bold tracking-tight md:text-2xl">
              {FORMACION_CABECERA.subtitulo}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <SqueezeCarousel
            slides={slides}
            label="Los tres niveles de formación"
            className="mt-10"
            height={380}
            gap={12}
            slatWidth={110}
            radius={16}
            duration={700}
            autoplay
            interval={7000}
          />
        </Reveal>
      </div>
    </section>
  );
}
