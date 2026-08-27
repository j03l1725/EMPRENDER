"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, GraduationCap, RefreshCw } from "lucide-react";
import { CURSOS } from "@/lib/contenido";

/**
 * Molde de tarjeta del SEAL, pedido en el audio 2 de Estefy:
 * «ese es el formato que tenemos que tener para los cursos […] la imagen de arriba,
 * la fotito del curso».
 * Referencia: docs/referencias/capturas/seal-03-cursos-abiertos-y-pie.png
 */
export function CursosAbiertos() {
  const pista = useRef<HTMLDivElement>(null);

  const mover = (dir: -1 | 1) => {
    const p = pista.current;
    if (!p) return;
    p.scrollBy({ left: dir * (p.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="bg-morado py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Cursos abiertos
            </h2>
            <p className="mt-2 text-white/60">
              Disponibles ahora mismo en la plataforma del MAGP.
            </p>
          </div>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              onClick={() => mover(-1)}
              aria-label="Anterior"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => mover(1)}
              aria-label="Siguiente"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={pista}
        // `contain: layout` no es decoración: sin él, el ancho del contenido de este
        // carrusel ensancha la ventana de composición en móvil —704 px en una pantalla
        // de 375— y todo lo que es `position: fixed` (la cabecera, el botón de menú, el
        // de revisión) se coloca sobre ese ancho falso y queda fuera de pantalla.
        // `overflow-x: auto` no basta; `layout` es el valor mínimo que lo corrige.
        style={{ contain: "layout" }}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CURSOS.map((c) => (
          <a
            key={c.titulo}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-[19rem] shrink-0 snap-start overflow-hidden rounded-xl bg-white shadow-lg transition hover:-translate-y-1 sm:w-[22rem]"
          >
            <div className="relative aspect-[16/10] bg-gris">
              <Image
                src={c.imagen}
                alt=""
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="22rem"
              />
              {"nuevo" in c && c.nuevo && (
                <span className="absolute right-3 top-3 rounded bg-verde-claro px-2.5 py-1 text-xs font-bold text-verde">
                  Nuevo
                </span>
              )}
            </div>

            <div className="p-6">
              <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-snug text-navy transition group-hover:text-verde">
                {c.titulo}
              </h3>
              <div className="mt-3 flex items-center gap-5 text-sm text-navy/50">
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap size={16} />
                  {c.inscritos}
                  <span className="sr-only">inscritos</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <RefreshCw size={14} />
                  {c.actualizado}
                </span>
              </div>
            </div>

            <span className="block h-1 w-1/3 bg-verde transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>
    </section>
  );
}
