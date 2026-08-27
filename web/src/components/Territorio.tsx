"use client";

import Image from "next/image";
import { useState } from "react";
import { PROVINCIAS, TERRITORIO } from "@/lib/contenido";

/**
 * Las siete provincias, en pila de fotos.
 *
 * Se pidió a partir de un componente que arrastra las tarjetas con
 * `framer-motion`. No se usó, por dos motivos:
 *
 *   · `framer-motion` se quitó de este proyecto a propósito (Trampa 4): una
 *     caída del JS con él dejó la página en blanco. Volver a meterlo por un
 *     efecto decorativo no compensa.
 *   · Ahí la única forma de ver las demás fotos es arrastrar. En una página de
 *     gobierno, la lista de provincias donde opera el programa es información,
 *     no adorno: no puede depender de un gesto que no todo el mundo descubre,
 *     ni desaparecer si el JS no llega.
 *
 * Así que la pila es un adorno que se mueve solo con CSS, y debajo van los
 * siete nombres como botones. Sin JS se leen igual, se navegan con el teclado,
 * y quien quiera jugar con las fotos puede pulsarlas.
 */
const REGIONES = ["Costa", "Sierra", "Amazonía"] as const;

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

      <div className="mt-10 grid gap-7 sm:grid-cols-3">
        {REGIONES.map((region) => (
          <div key={region}>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-verde-claro">
              {region}
            </h3>
            <ul className="mt-3 space-y-1">
              {PROVINCIAS.map((p, i) =>
                p.region !== region ? null : (
                  <li key={p.nombre}>
                    <button
                      type="button"
                      onClick={() => setActiva(i)}
                      aria-current={i === activa}
                      className={`text-left text-sm leading-snug transition ${
                        i === activa ? "font-semibold text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {p.nombre}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
