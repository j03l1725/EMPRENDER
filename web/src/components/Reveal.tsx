"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Aparición al hacer scroll.
 *
 * Empieza VISIBLE en el HTML del servidor y solo se esconde una vez que el JS
 * confirmó que está montado. Así, si el JS no llega, la página se lee igual —
 * que es lo que importa en una página de gobierno.
 */
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
  const [montado, setMontado] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Quien pidió menos movimiento no recibe apariciones: se muestra y ya.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    setMontado(true);
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "-60px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const oculto = montado && !visible;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: oculto ? 0 : 1,
        transform: oculto ? "translateY(16px)" : "none",
        transition: `opacity .55s cubic-bezier(.22,1,.36,1) ${delay}s, transform .55s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
