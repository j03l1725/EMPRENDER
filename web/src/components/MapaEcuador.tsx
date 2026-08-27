"use client";

import { useState } from "react";
import { PROVINCIAS } from "@/lib/contenido";

/**
 * Silueta continental del Ecuador con las siete provincias focalizadas.
 *
 * El trazado no está dibujado a mano ni copiado de un mapa: se generó desde los
 * datos de Natural Earth (world-atlas, 1:50m), quedándose con el polígono continental
 * —Galápagos queda fuera a propósito, si no la parte continental sale diminuta—,
 * simplificado con Douglas-Peucker y proyectado en equirrectangular, que sobre la
 * línea ecuatorial casi no distorsiona. Las provincias son sus capitales, proyectadas
 * con la misma transformación. El script está en docs/referencias/mapa-ecuador.md
 */
export function MapaEcuador() {
  const [activa, setActiva] = useState<string | null>(null);

  return (
    <div className="relative mx-auto w-full max-w-[31rem]">
      <svg viewBox="0 0 100 112.82" className="w-full overflow-visible" role="img"
           aria-label="Mapa del Ecuador con las siete provincias del territorio focalizado">
        <defs>
          <linearGradient id="relleno" x1="0" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
          </linearGradient>
        </defs>

        <path d="M99.37 27.35L96.03 28.23L93.38 27.62L93.32 28.23L95.78 29.81L96.91 32.63L99.75 35.19L99.81 35.79L99.43 37.86L100.00 42.14L98.30 42.39L97.23 41.66L94.39 52.26L85.32 62.81L74.98 70.34L54.32 77.67L48.65 84.11L49.09 86.11L47.89 86.54L46.88 84.96L45.81 84.93L44.49 91.58L42.22 95.26L39.95 101.18L40.45 103.49L39.82 105.32L35.98 107.99L35.79 110.51L34.78 110.79L33.77 112.46L33.02 112.82L28.54 111.73L25.58 107.23L25.33 104.92L23.19 103.46L20.42 103.83L14.43 100.67L10.14 103.61L8.51 103.01L8.32 102.37L10.65 99.15L8.88 99.09L8.32 98.39L8.25 95.65L9.20 95.11L11.53 95.56L13.74 93.34L12.85 90.91L12.98 88.73L12.10 85.41L11.15 84.78L14.05 83.65L17.52 80.73L21.61 70.62L19.97 66.73L19.60 61.65L18.71 63.02L18.97 67.88L18.15 70.07L17.08 70.62L16.32 70.22L16.76 66.67L11.85 72.86L8.95 71.44L4.85 67.43L2.14 66.57L0.57 65.18L0.00 63.78L3.40 61.83L3.53 59.34L3.53 57.37L2.27 54.06L2.84 49.68L1.07 44.36L2.14 42.54L7.18 40.32L8.88 35.73L11.91 36.34L10.14 35.70L8.44 31.90L11.22 28.38L14.49 25.58L16.07 22.76L16.45 18.29L15.31 11.73L16.26 10.88L18.53 10.42L21.36 8.33L23.63 8.48L26.21 6.93L36.11 4.38L37.37 2.80L36.80 0.00L39.95 3.01L48.71 8.51L54.82 11.03L57.09 10.82L58.03 12.82L61.18 14.34L62.44 18.57L67.36 19.26L72.34 21.15L74.10 20.72L78.20 21.36L79.40 20.91L80.09 18.38L82.10 17.78L85.70 19.42L88.97 22.82L90.80 23.91L93.57 24.37L96.22 26.13L99.37 27.35Z" fill="url(#relleno)" stroke="rgba(217,242,203,.6)" strokeWidth="0.6"
              strokeLinejoin="round" />

        {PROVINCIAS.map((p, i) => {
          const on = activa === p.nombre;
          return (
            <g key={p.nombre}
               onMouseEnter={() => setActiva(p.nombre)}
               onMouseLeave={() => setActiva(null)}
               className="cursor-default">
              <circle cx={p.x} cy={p.y} r="4.5" fill="#d9f2cb" opacity={on ? 0.28 : 0.14}
                      className="pulso" style={{ animationDelay: `${i * 0.55}s` }} />
              <circle cx={p.x} cy={p.y} r={on ? 2.4 : 1.8} fill="#d9f2cb"
                      className="transition-all duration-200" />
            </g>
          );
        })}
      </svg>

      {/* Nombre de la provincia bajo el mapa: aparece al pasar el ratón y no
          desplaza nada, para que el bloque no salte. */}
      <p className="mt-2 h-6 text-center text-sm font-medium text-verde-claro/90 transition-opacity duration-200"
         style={{ opacity: activa ? 1 : 0 }}>
        {activa ?? " "}
      </p>
    </div>
  );
}
