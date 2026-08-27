"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, Play } from "lucide-react";
import { PROGRAMA, HERO_BAJADA, PROVINCIAS } from "@/lib/contenido";
import { Borrador } from "./revision";

/** Posición de cada provincia flotando a la derecha. Aproxima su geografía:
 *  costa a la izquierda, sierra al centro, amazonía abajo a la derecha. */
const NUBE = [
  { top: "4%",  left: "8%",  d: 0.0 },
  { top: "23%", left: "0%",  d: 0.9 },
  { top: "45%", left: "4%",  d: 1.8 },
  { top: "13%", left: "54%", d: 0.4 },
  { top: "34%", left: "46%", d: 1.3 },
  { top: "60%", left: "58%", d: 0.6 },
  { top: "76%", left: "30%", d: 2.2 },
];

/**
 * Cuenta de 0 al valor. Si el JS no corre, el HTML ya trae el número final,
 * así que nunca se ve un cero suelto.
 */
function Contador({ a, prefijo = "" }: { a: number; prefijo?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(a);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setN(0);
    const t0 = performance.now();
    const dur = 1400;
    let raf = 0;

    const paso = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setN(a * e);
      if (p < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [a]);

  return (
    <span ref={ref}>
      {prefijo}
      {Math.round(n).toLocaleString("es-EC")}
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-navy pt-[72px] text-white">
      {/* Resplandores — decorativos, se pueden perder sin consecuencia */}
      <div className="latir pointer-events-none absolute -left-[15%] -top-[20%] h-[60rem] w-[60rem] rounded-full bg-verde/25 blur-[160px]" />
      <div
        className="latir pointer-events-none absolute -bottom-[30%] -right-[10%] h-[55rem] w-[55rem] rounded-full bg-morado/50 blur-[160px]"
        style={{ animationDelay: "-6s", animationDuration: "20s" }}
      />
      <div
        className="latir pointer-events-none absolute right-[26%] top-[16%] h-[32rem] w-[32rem] rounded-full bg-azul/30 blur-[140px]"
        style={{ animationDelay: "-11s", animationDuration: "24s" }}
      />

      {/* Rejilla */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 90% 60% at 50% 40%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 60% at 50% 40%, #000 40%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="entrada mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-verde-claro backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-verde-claro" />
            {PROGRAMA.ejecutor}
          </p>

          <h1
            className="entrada text-[clamp(3.25rem,8.5vw,7rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
            style={{ animationDelay: "0.08s" }}
          >
            EMPRENDER
          </h1>

          <p
            className="entrada mt-4 max-w-xl text-[clamp(1rem,1.4vw,1.15rem)] font-medium leading-snug text-verde-claro/85"
            style={{ animationDelay: "0.14s" }}
          >
            {PROGRAMA.nombreLargo}
          </p>

          <p
            className="entrada mt-7 max-w-xl text-lg leading-relaxed text-white/70"
            style={{ animationDelay: "0.2s" }}
          >
            <Borrador nota="Bajada del hero — la escribe Estefy">{HERO_BAJADA}</Borrador>
          </p>

          <div
            className="entrada mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.28s" }}
          >
            <a
              href="#convocatoria"
              className="group inline-flex items-center gap-2.5 rounded-full bg-verde px-8 py-4 font-semibold shadow-[0_10px_40px_-12px_rgba(28,109,14,1)] transition hover:bg-verde/85"
            >
              Ver la convocatoria
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </a>
            <a
              href="#recursos"
              className="group inline-flex items-center gap-3 py-4 font-semibold text-white/85 transition hover:text-white"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-white/25 transition group-hover:border-white/60 group-hover:bg-white/5">
                <Play size={15} fill="currentColor" />
              </span>
              Conoce el programa
            </a>
          </div>

          <dl
            className="entrada mt-16 flex flex-wrap gap-x-14 gap-y-8 border-t border-white/10 pt-8"
            style={{ animationDelay: "0.4s" }}
          >
            <div>
              <dd className="text-[2.5rem] font-bold leading-none tracking-tight">
                <Contador a={7} />
              </dd>
              <dt className="mt-2.5 text-sm text-white/55">provincias focalizadas</dt>
            </div>
            <div>
              <dd className="text-[2.5rem] font-bold leading-none tracking-tight">
                <Contador a={80000} prefijo="USD " />
              </dd>
              <dt className="mt-2.5 text-sm text-white/55">de capital semilla, hasta</dt>
            </div>
            <div>
              <dd className="text-[2.5rem] font-bold leading-none tracking-tight">2027</dd>
              <dt className="mt-2.5 text-sm text-white/55">vigencia del proyecto</dt>
            </div>
          </dl>
        </div>

        {/* Nube de provincias */}
        <div className="relative hidden h-[34rem] lg:block">
          {PROVINCIAS.map((p, i) => (
            <div
              key={p}
              className="entrada absolute"
              style={{
                top: NUBE[i].top,
                left: NUBE[i].left,
                animationDelay: `${0.5 + i * 0.09}s`,
              }}
            >
              <span
                className="flotar flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.07] px-4 py-2.5 text-sm font-medium text-white/90 shadow-xl backdrop-blur-md"
                style={{
                  animationDelay: `${NUBE[i].d}s`,
                  animationDuration: `${6 + NUBE[i].d}s`,
                }}
              >
                <MapPin size={14} className="text-verde-claro" />
                {p}
              </span>
            </div>
          ))}

          <div className="absolute bottom-2 right-2 text-xs uppercase tracking-[0.18em] text-white/30">
            Territorio focalizado
          </div>
        </div>
      </div>
    </section>
  );
}
