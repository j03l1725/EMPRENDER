"use client";

import React, { useState, useEffect, useRef, HTMLAttributes } from "react";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

export interface GalleryItem {
  titulo: string;
  texto: string;
  imagen: string;
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Cuánto se separan las tarjetas del centro. */
  radius?: number;
  /**
   * Grados entre tarjeta y tarjeta. El componente original repartía las suyas
   * en el círculo completo (360/n), pero eso son diez tarjetas. Con cuatro
   * salen a 90°: una de frente, dos de canto y la cuarta de espaldas, o sea
   * el escenario vacío. Repartidas en un arco se ven siempre tres o cuatro.
   */
  anglePerItem?: number;
  /** Vaivén suave cuando nadie hace scroll, en grados. */
  autoRotateSpeed?: number;
  /** Elemento cuyo recorrido manda el giro. Si no, manda el de la página. */
  scrollRef?: React.RefObject<HTMLElement | null>;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    {
      items,
      className,
      radius = 430,
      anglePerItem = 52,
      autoRotateSpeed = 3,
      scrollRef,
      ...props
    },
    ref,
  ) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [animar, setAnimar] = useState(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const caja = useRef<HTMLDivElement>(null);
    const [ancho, setAncho] = useState(0);

    // El radio en píxeles fijos proyecta las tarjetas fuera de una pantalla de
    // 390 px. Se ata al ancho real del contenedor: la de delante queda siempre
    // centrada y entera, y las de al lado asoman lo que quepa.
    useEffect(() => {
      const el = caja.current;
      if (!el) return;
      const medir = () => setAncho(el.clientWidth);
      medir();
      const ro = new ResizeObserver(medir);
      ro.observe(el);
      return () => ro.disconnect();
    }, []);

    const compacto = ancho > 0 && ancho < 640;
    // En pantalla estrecha hace falta MÁS radio en proporción, o las vecinas se
    // montan encima de la de delante en vez de acompañarla.
    const radioReal = ancho ? Math.min(radius, ancho * (compacto ? 0.62 : 0.46)) : radius;

    // El giro no arranca hasta que el JS confirma que montó y que no se pidió
    // menos movimiento. Sin esto, quien tenga el JS caído se queda con las
    // tarjetas apiladas en el centro (Trampa 4 de CLAUDE.md).
    useEffect(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setAnimar(true);
    }, []);

    // Giro por scroll: lo manda el recorrido del contenedor pegajoso, no el de
    // toda la página, para que una vuelta ocurra mientras la sección se ve.
    useEffect(() => {
      if (!animar) return;
      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        const caja = scrollRef?.current;
        let progreso: number;
        if (caja) {
          const r = caja.getBoundingClientRect();
          const recorrido = r.height - window.innerHeight;
          progreso = recorrido > 0 ? Math.min(Math.max(-r.top / recorrido, 0), 1) : 0;
        } else {
          const alto = document.documentElement.scrollHeight - window.innerHeight;
          progreso = alto > 0 ? window.scrollY / alto : 0;
        }
        setRotation(-progreso * (items.length - 1) * anglePerItem);

        scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    }, [animar, scrollRef, items.length, anglePerItem]);

    // Giro suave cuando nadie está haciendo scroll.
    useEffect(() => {
      if (!animar) return;
      const autoRotate = () => {
        if (!isScrolling) {
          setRotation((prev) => prev + Math.sin(Date.now() / 1400) * autoRotateSpeed * 0.02);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };
      animationFrameRef.current = requestAnimationFrame(autoRotate);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, [animar, isScrolling, autoRotateSpeed]);

    return (
      <div
        ref={(nodo) => {
          caja.current = nodo;
          if (typeof ref === "function") ref(nodo);
          else if (ref) ref.current = nodo;
        }}
        role="region"
        aria-label="Los pasos del programa"
        className={cn("relative flex h-full w-full items-center justify-center", className)}
        // `contain: layout` por la Trampa 1: las tarjetas se colocan con
        // translateZ y sin esto su caja ensancha la ventana de composición en
        // móvil, tirando fuera de pantalla todo lo `position: fixed`.
        style={{ perspective: "1800px", contain: "layout" }}
        {...props}
      >
        <div
          className="relative h-full w-full"
          style={{
            transform: animar ? `rotateY(${rotation}deg)` : undefined,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const relativeAngle = (itemAngle + (rotation % 360) + 360) % 360;
            const normalizado = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = animar ? Math.max(0.35, 1 - normalizado / 180) : 1;

            return (
              <div
                key={item.titulo}
                role="group"
                aria-label={item.titulo}
                // Sin JS las tarjetas se apilan; a partir de `sm` se reparten en
                // rejilla, que es lectura legible aunque el giro no arranque.
                className={cn(
                  compacto ? "w-[13.5rem]" : "w-[17rem]",
                  animar
                    ? cn("absolute", compacto ? "h-[19rem]" : "h-[23rem]")
                    : "relative mx-auto mb-6 inline-block h-auto align-top sm:mx-3",
                )}
                style={
                  animar
                    ? {
                        transform: `rotateY(${itemAngle}deg) translateZ(${radioReal}px)`,
                        left: "50%",
                        top: "50%",
                        marginLeft: compacto ? "-6.75rem" : "-8.5rem",
                        marginTop: compacto ? "-9.5rem" : "-11.5rem",
                        opacity,
                        transition: "opacity .3s linear",
                        // Sin esto, las tarjetas que miran hacia atrás se ven
                        // con el texto en espejo. Es el defecto más visible del
                        // componente original.
                        backfaceVisibility: "hidden",
                      }
                    : undefined
                }
              >
                <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-navy shadow-2xl">
                  <div className={animar ? "absolute inset-0" : "relative aspect-[3/4]"}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imagen}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/80 to-transparent p-6 pt-16 text-white">
                    <span className="text-xs font-bold text-verde-claro">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 text-lg font-bold leading-snug">{item.titulo}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{item.texto}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };
