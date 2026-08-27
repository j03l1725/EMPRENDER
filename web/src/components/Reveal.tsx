"use client";

import { useEffect, useRef } from "react";

/**
 * Aparición al hacer scroll.
 *
 * Empieza VISIBLE en el HTML del servidor y solo se esconde una vez que el JS
 * confirmó que está montado. Así, si el JS no llega, la página se lee igual —
 * que es lo que importa en una página de gobierno.
 *
 * El esconder y el mostrar se hacen sobre el nodo, no con estado de React: el
 * estado obligaría a un setState síncrono dentro del efecto —cascada de
 * renders, y lo que marca `react-hooks/set-state-in-effect`— para conseguir
 * exactamente el mismo píxel. Aquí el efecto sincroniza con el DOM, que es
 * para lo que está.
 */
const SALIDA = "translateY(16px)";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Quien pidió menos movimiento no recibe apariciones: se queda como vino
    // del servidor, visible y sin animar.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    // Esconder sin transición: si no, lo que se ve es un fundido de salida
    // antes del de entrada. El reflow entre medias es lo que separa las dos.
    const transicion = el.style.transition;
    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = SALIDA;
    void el.offsetHeight;
    el.style.transition = transicion;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "none";
          obs.disconnect();
        }
      },
      { rootMargin: "-60px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 1,
        transform: "none",
        transition: `opacity .55s cubic-bezier(.22,1,.36,1) ${delay}s, transform .55s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
