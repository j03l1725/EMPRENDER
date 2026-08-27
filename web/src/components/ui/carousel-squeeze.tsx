"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

export interface SqueezeSlide {
  id: string;
  /** Titular de la diapositiva. Se lee bajo el panel abierto. */
  title: string;
  description: string;
  /** Texto del botón. Si no hay `href`, no se pinta el botón. */
  action?: string;
  href?: string;
  /** Rótulo en la esquina del panel abierto. */
  overlay?: React.ReactNode;
  /** Rótulo corto, girado, que llevan los paneles cerrados. */
  slatLabel?: string;
  image: string;
  imageAlt?: string;
}

export interface SqueezeCarouselProps {
  slides: SqueezeSlide[];
  /** Nombre accesible del conjunto. */
  label: string;
  height?: number;
  gap?: number;
  /** Ancho de los paneles cerrados, en píxeles. */
  slatWidth?: number;
  radius?: number;
  /** Duración de la transición, en milisegundos. */
  duration?: number;
  hoverGrow?: boolean;
  autoplay?: boolean;
  interval?: number;
  controls?: boolean;
  className?: string;
}

/**
 * Carrusel de acordeón: un panel abierto y el resto plegados en tiras.
 *
 * Se construyó a partir de la demo del componente, no del componente en sí, así
 * que la API es la que la demo usaba: `slides`, `label` y las mismas opciones
 * (`height`, `gap`, `slatWidth`, `radius`, `duration`, `hoverGrow`, `autoplay`,
 * `interval`, `controls`).
 *
 * Tres cosas se apartan de la demo, y a propósito:
 *
 *   · **Es un patrón de pestañas de verdad** (`role="tablist"`), no un montón de
 *     divs. Así se recorre con las flechas del teclado y un lector de pantalla
 *     anuncia cuál está abierto.
 *   · **Los paneles cerrados llevan su rótulo girado.** En la demo son tiras de
 *     ocho píxeles sin nada: bonito con siete fotos, inútil con tres niveles
 *     que hay que poder distinguir sin abrirlos.
 *   · **Sin JavaScript se ve el primero abierto y los demás rotulados**, en vez
 *     de quedarse en blanco. Es la Trampa 4 de CLAUDE.md.
 */
export function SqueezeCarousel({
  slides,
  label,
  height = 320,
  gap = 16,
  slatWidth = 8,
  radius = 6,
  duration = 1000,
  hoverGrow = true,
  autoplay = false,
  interval = 6000,
  controls = true,
  className = "",
}: SqueezeCarouselProps) {
  const [activa, setActiva] = useState(0);
  const [encima, setEncima] = useState<number | null>(null);
  const [pausa, setPausa] = useState(false);
  const n = slides.length;
  const idBase = useId();
  const tiras = useRef<(HTMLButtonElement | null)[]>([]);
  const pista = useRef<HTMLDivElement>(null);
  const [ancho, setAncho] = useState(0);

  // `slatWidth` en píxeles fijos se come la pantalla en móvil: dos tiras de 110
  // sobre 375 dejan el panel abierto en ochenta y pico, y ahí ya no cabe ni su
  // rótulo. Se limita a una parte del ancho real, de modo que el que está
  // abierto siempre se lleve la mayoría.
  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    const medir = () => setAncho(el.clientWidth);
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // En pantalla estrecha las tiras se hacen finas de verdad, como en la demo
  // original: con dos tiras anchas sobre 375 px el panel abierto se queda en
  // ciento y pico y ahí no cabe su rótulo. El nombre girado sigue entrando.
  const compacto = ancho > 0 && ancho < 640;
  const tira = !ancho
    ? slatWidth
    : compacto
      ? Math.min(slatWidth, 34)
      : Math.min(slatWidth, (ancho * 0.45) / Math.max(n - 1, 1));

  const mover = (dir: -1 | 1) => setActiva((a) => (a + dir + n) % n);

  useEffect(() => {
    if (!autoplay || pausa) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActiva((a) => (a + 1) % n), interval);
    return () => clearInterval(t);
  }, [autoplay, pausa, interval, n]);

  // Flechas del teclado, como manda el patrón de pestañas.
  const teclado = (e: React.KeyboardEvent, i: number) => {
    const salto = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!salto) return;
    e.preventDefault();
    const siguiente = (i + salto + n) % n;
    setActiva(siguiente);
    tiras.current[siguiente]?.focus();
  };

  const actual = slides[activa];

  return (
    <div className={className}>
      {controls && (
        <div className="mb-4 flex justify-end gap-2">
          <button
            onClick={() => mover(-1)}
            aria-label="Anterior"
            className="grid h-10 w-10 place-items-center rounded-full border border-current/20 text-current transition hover:bg-current/10"
          >
            <ArrowLeft size={17} />
          </button>
          <button
            onClick={() => mover(1)}
            aria-label="Siguiente"
            className="grid h-10 w-10 place-items-center rounded-full border border-current/20 text-current transition hover:bg-current/10"
          >
            <ArrowRight size={17} />
          </button>
        </div>
      )}

      {/* `contain: layout` por la Trampa 1: los paneles cambian de ancho y sin
          esto su caja puede ensanchar la ventana de composición en móvil. */}
      <div
        ref={pista}
        role="tablist"
        aria-label={label}
        style={{ gap, height, contain: "layout" }}
        className="flex overflow-hidden"
        onMouseLeave={() => {
          setEncima(null);
          setPausa(false);
        }}
        onMouseEnter={() => setPausa(true)}
      >
        {slides.map((s, i) => {
          const abierta = i === activa;
          // `hoverGrow`: una tira señalada se ensancha un poco, para que se note
          // que responde antes de pulsarla.
          const anchoTira = abierta ? undefined : hoverGrow && encima === i ? tira * 1.4 : tira;

          return (
            <button
              key={s.id}
              ref={(el) => {
                tiras.current[i] = el;
              }}
              role="tab"
              id={`${idBase}-tab-${i}`}
              aria-selected={abierta}
              aria-controls={`${idBase}-panel`}
              tabIndex={abierta ? 0 : -1}
              onClick={() => setActiva(i)}
              onKeyDown={(e) => teclado(e, i)}
              onMouseEnter={() => setEncima(i)}
              style={{
                borderRadius: radius,
                flex: abierta ? "1 1 auto" : `0 0 ${anchoTira}px`,
                transitionDuration: `${duration}ms`,
              }}
              className="group relative overflow-hidden bg-navy transition-[flex-basis,flex-grow] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none"
            >
              <Image
                src={s.image}
                alt={s.imageAlt ?? ""}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                quality={62}
                className={`object-cover transition-opacity duration-500 ${
                  abierta ? "opacity-100" : "opacity-70 group-hover:opacity-90"
                }`}
              />

              {/* Panel abierto: rótulo abajo a la izquierda.

                  Se pinta SOLO cuando está abierto. Dejarlo en los cerrados y
                  taparlo con `opacity: 0` parece inofensivo, pero su contenido
                  es más ancho que la tira y el arnés lo caza como texto
                  cortado: el desbordamiento es real aunque no se vea. */}
              {abierta && s.overlay && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden bg-gradient-to-t from-black/75 to-transparent p-4 text-left"
                >
                  {s.overlay}
                </span>
              )}

              {/* Panel cerrado: su nombre, girado. */}
              {s.slatLabel && (
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 flex items-end justify-center bg-black/45 pb-5 transition-opacity duration-300 ${
                    abierta ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-white [writing-mode:vertical-rl] [transform:rotate(180deg)]">
                    {s.slatLabel}
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        id={`${idBase}-panel`}
        role="tabpanel"
        aria-labelledby={`${idBase}-tab-${activa}`}
        className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-10"
      >
        <p className="max-w-2xl leading-relaxed">
          <strong className="font-semibold">{actual.title}</strong>{" "}
          <span className="opacity-70">{actual.description}</span>
        </p>

        {actual.action && actual.href && (
          <a
            href={actual.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-verde px-6 py-3 text-sm font-semibold text-white transition hover:bg-verde/85"
          >
            {actual.action}
            <ChevronRight size={16} className="transition group-hover:translate-x-0.5" />
          </a>
        )}
      </div>
    </div>
  );
}
