"use client";

import Image from "next/image";
import { useState } from "react";
import { PROVINCIAS, TERRITORIO } from "@/lib/contenido";

/**
 * Las siete provincias, en pila de fotos que se recorre pulsándola.
 *
 * Cada tarjeta lleva encima su provincia y su región, así que la lista de los
 * siete nombres que había debajo repetía la misma información y dejaba un
 * hueco; se quitó.
 *
 * La pila se mueve solo con CSS. No usa `framer-motion` a propósito: se quitó
 * de este proyecto porque una caída del JS con él dejó la página en blanco
 * (Trampa 4), y no compensa reintroducirlo por un efecto decorativo.
 */
export function Territorio() {
  const [activa, setActiva] = useState(0);
  const n = PROVINCIAS.length;

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-verde-claro">
        {TERRITORIO.etiquetaMapa}
      </p>

      {/* `contain: layout` por la Trampa 1: las tarjetas van rotadas y desplazadas,
          y sin esto su caja ensancha la ventana de composición en móvil. */}
      <div
        style={{ contain: "layout" }}
        className="relative mx-auto mt-8 h-[22rem] w-full max-w-[17rem] sm:h-[26rem] sm:max-w-[19rem]"
      >
        {PROVINCIAS.map((p, i) => {
          const fondo = (i - activa + n) % n; // 0 = al frente
          const visible = fondo < 4;
          return (
            <button
              key={p.nombre}
              type="button"
              onClick={() => setActiva((a) => (a + 1) % n)}
              aria-hidden={fondo !== 0}
              tabIndex={fondo === 0 ? 0 : -1}
              aria-label={`${p.nombre}, ${p.region}. Ver la siguiente provincia`}
              className="absolute inset-0 overflow-hidden rounded-2xl border border-white/15 bg-navy shadow-2xl transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none"
              style={{
                zIndex: n - fondo,
                opacity: visible ? 1 : 0,
                pointerEvents: fondo === 0 ? "auto" : "none",
                transform: `translate(${fondo * -13}px, ${fondo * -9}px) rotate(${fondo === 0 ? 0 : -(2 + fondo * 3)}deg) scale(${1 - fondo * 0.02})`,
                transformOrigin: "bottom center",
              }}
            >
              <Image
                src={p.foto}
                alt=""
                fill
                className="object-cover"
                quality={62}
                sizes="(max-width: 640px) 17rem, 19rem"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-5 text-left">
                <span className="block text-xs font-bold uppercase tracking-[0.14em] text-verde-claro">
                  {p.region}
                </span>
                <span className="mt-1 block text-xl font-bold leading-tight text-white">
                  {p.nombre}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* La provincia y su región van sobre la propia foto: repetirlas debajo
          en una lista era decir dos veces lo mismo y dejar un hueco. Se pasa de
          foto pulsando la tarjeta. */}
      <p className="mt-6 text-center text-sm text-white/45">
        Pulsa la foto para recorrer las siete provincias
      </p>
    </div>
  );
}
