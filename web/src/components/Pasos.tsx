"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PASOS, PASOS_CABECERA } from "@/lib/contenido";

/**
 * Los cuatro pasos, en carrusel de portada.
 *
 * Antes esto era la galería 3D que giraba con el scroll de la página, dentro de
 * un bloque de 300vh con el interior pegajoso. Se descartó porque en pantalla
 * real se veía mal: dejaba pantallas enteras vacías, y en los bordes del bloque
 * pegajoso las tarjetas quedaban cortadas por la mitad.
 *
 * Este ocupa lo que ocupa —sin secuestrar el scroll— y coloca las tarjetas por
 * su distancia a la del centro, así que nunca hay una a medio camino ni fuera
 * del recuadro. La de delante se ve entera; las vecinas asoman giradas.
 */
export function Pasos() {
  const [activa, setActiva] = useState(0);
  const n = PASOS.length;

  const mover = (dir: -1 | 1) => setActiva((a) => (a + dir + n) % n);

  // Avanza solo, y se detiene mientras el ratón está encima o si se pidió
  // menos movimiento.
  const [pausa, setPausa] = useState(false);
  useEffect(() => {
    if (pausa) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActiva((a) => (a + 1) % n), 5000);
    return () => clearInterval(t);
  }, [pausa, n]);

  return (
    <section className="bg-plomo px-6 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {PASOS_CABECERA.antetitulo}
            </h2>
            <p className="mt-2 max-w-xl text-navy/60">{PASOS_CABECERA.bajada}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => mover(-1)}
              aria-label="Paso anterior"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/70 text-navy transition hover:bg-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => mover(1)}
              aria-label="Paso siguiente"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/70 text-navy transition hover:bg-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* `contain: layout` por la Trampa 1: las tarjetas van giradas y
            desplazadas, y sin esto su caja ensancharía la ventana de
            composición en móvil. */}
        <div
          style={{ contain: "layout", perspective: "1400px" }}
          className="relative mt-10 h-[26rem] sm:h-[27rem]"
          onMouseEnter={() => setPausa(true)}
          onMouseLeave={() => setPausa(false)}
        >
          {PASOS.map((p, i) => {
            // Distancia con signo a la tarjeta central, por el camino corto.
            let d = i - activa;
            if (d > n / 2) d -= n;
            if (d < -n / 2) d += n;
            const lado = Math.abs(d);
            const frente = d === 0;

            return (
              <article
                key={p.titulo}
                aria-hidden={!frente}
                className="absolute left-1/2 top-0 h-full w-[17rem] overflow-hidden rounded-2xl bg-navy shadow-2xl transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none sm:w-[20rem]"
                style={{
                  zIndex: n - lado,
                  opacity: lado > 1 ? 0 : 1,
                  pointerEvents: lado > 1 ? "none" : "auto",
                  transform: [
                    "translateX(-50%)",
                    `translateX(${d * 62}%)`,
                    `rotateY(${d * -32}deg)`,
                    `scale(${frente ? 1 : 0.84})`,
                  ].join(" "),
                  transformOrigin: "center",
                  filter: frente ? "none" : "brightness(0.65)",
                }}
              >
                <Image
                  src={p.imagen}
                  alt=""
                  fill
                  className="object-cover"
                  quality={62}
                  sizes="(max-width: 640px) 17rem, 20rem"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <span className="text-sm font-bold text-verde-claro">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1.5 text-xl font-bold leading-snug">{p.titulo}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/75">{p.texto}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-2.5">
          {/* El punto se ve de 8 px, pero el botón mide 24 de alto: un objetivo
              de toque de 8 px es imposible de acertar con el dedo. El relleno
              es transparente, así que no cambia nada visualmente. */}
          {PASOS.map((p, i) => (
            <button
              key={p.titulo}
              onClick={() => setActiva(i)}
              aria-label={`Ir al paso ${i + 1}: ${p.titulo}`}
              aria-current={i === activa}
              className="group -my-2 px-1 py-2"
            >
              <span
                className={`block h-2 rounded-full transition-all ${
                  i === activa ? "w-8 bg-verde" : "w-2 bg-navy/25 group-hover:bg-navy/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
