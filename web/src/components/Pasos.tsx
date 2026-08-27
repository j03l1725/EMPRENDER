"use client";

import Image from "next/image";
import { useRef } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { PASOS, PASOS_CABECERA } from "@/lib/contenido";

/**
 * Los cuatro pasos del proceso, en carrusel horizontal.
 *
 * Se pidió «tipo carrusel, a lo horizontal» a partir de una galería 3D que
 * gira con el scroll de la página. Esa no se usó, y por tres motivos que aquí
 * pesan más que el efecto:
 *
 *   · Secuestra el scroll —necesita 500vh de página para dar una vuelta—, lo
 *     que en un móvil de gama baja en zona rural es hostil.
 *   · Coloca las tarjetas con `translateZ`, que ensancha la ventana de
 *     composición: es la Trampa 1 de CLAUDE.md, la que ya costó una tanda.
 *   · Sin JS no se lee nada, porque todo depende de transformadas calculadas
 *     en el cliente. Es la Trampa 4.
 *
 * Este carrusel da la misma lectura —tarjetas grandes con foto, se recorren de
 * lado— con scroll nativo y ajuste por tarjeta: funciona sin JS, respeta el
 * scroll de la página y no ensancha nada. Los botones solo lo adornan; el dedo
 * y la rueda ya funcionan solos.
 */
export function Pasos() {
  const pista = useRef<HTMLDivElement>(null);

  const mover = (dir: -1 | 1) => {
    const p = pista.current;
    if (!p) return;
    p.scrollBy({ left: dir * (p.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="bg-gris py-24 md:py-28">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-6">
        <div>
          <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
            {PASOS_CABECERA.antetitulo}
          </h3>
          <p className="mt-2 max-w-xl text-navy/55">{PASOS_CABECERA.bajada}</p>
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            onClick={() => mover(-1)}
            aria-label="Anterior"
            className="grid h-11 w-11 place-items-center rounded-full bg-navy/5 text-navy transition hover:bg-navy/10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => mover(1)}
            aria-label="Siguiente"
            className="grid h-11 w-11 place-items-center rounded-full bg-navy/5 text-navy transition hover:bg-navy/10"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={pista}
        // `contain: layout` no es decoración: sin él, el ancho del contenido de este
        // carrusel ensancha la ventana de composición en móvil y todo lo que es
        // `position: fixed` se coloca sobre ese ancho falso y queda fuera de pantalla.
        // Es la Trampa 1 de CLAUDE.md. `overflow-x: auto` no basta.
        style={{ contain: "layout" }}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] scroll-pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PASOS.map((p, i) => (
          <article
            key={p.titulo}
            className="group relative w-[19rem] shrink-0 snap-start overflow-hidden rounded-2xl bg-navy shadow-lg sm:w-[23rem]"
          >
            <div className="relative aspect-[16/11]">
              <Image
                src={p.imagen}
                alt=""
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                quality={62}
                sizes="(max-width: 640px) 19rem, 23rem"
              />
              {/* El degradado sostiene el texto blanco de abajo sobre cualquier foto. */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-transparent" />
              <span className="absolute left-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-verde text-white shadow-lg">
                <Check size={18} strokeWidth={3} />
              </span>
              <span className="absolute right-5 top-5 text-sm font-bold text-white/45">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="-mt-16 relative p-6 text-white">
              <h4 className="text-lg font-bold leading-snug">{p.titulo}</h4>
              <p className="mt-2.5 text-sm leading-relaxed text-white/70">{p.texto}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
