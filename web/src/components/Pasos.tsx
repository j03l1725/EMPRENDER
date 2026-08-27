"use client";

import { useRef } from "react";
import { PASOS, PASOS_CABECERA } from "@/lib/contenido";
import { CircularGallery } from "./ui/circular-gallery";

/**
 * Los cuatro pasos, en la galería circular que gira con el scroll.
 *
 * El molde es el del componente pedido: un contenedor alto con el interior
 * `sticky`, de modo que la sección se queda quieta mientras el recorrido de
 * scroll hace girar el carrusel. Aquí son 300vh y no 500: con cuatro tarjetas
 * basta para dar la vuelta entera, y cada pantalla de más es scroll que el
 * visitante tiene que gastar para pasar de sección.
 *
 * El giro lo manda el recorrido de ESTE bloque, no el de la página entera, para
 * que la vuelta ocurra justo mientras se está mirando.
 */
export function Pasos() {
  const caja = useRef<HTMLElement>(null);

  return (
    <section ref={caja} className="relative bg-gris" style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-20 z-20 px-6 text-center sm:top-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {PASOS_CABECERA.antetitulo}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-navy/55">{PASOS_CABECERA.bajada}</p>
        </div>

        {/* El padding deja sitio al titular, que va encima en `absolute`. */}
        <div className="h-full w-full pt-40 sm:pt-32">
          <CircularGallery items={[...PASOS]} scrollRef={caja} />
        </div>
      </div>
    </section>
  );
}
