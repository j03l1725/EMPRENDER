import { ArrowRight, Play } from "lucide-react";
import { PROGRAMA, HERO_BAJADA, CONVOCATORIA } from "@/lib/contenido";
import { Borrador } from "./revision";
import { MapaEcuador } from "./MapaEcuador";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-navy pt-[72px] text-white">
      {/*
        Los resplandores eran tres divs de 960 px con `blur-[160px]` y animados con
        `scale`. En un móvil eso obliga a la GPU a rasterizar tres capas enormes
        desenfocadas en cada fotograma, y es la causa más probable de que la página
        tardara en aparecer en un teléfono. Aquí son degradados radiales pintados
        directamente en el fondo: mismo aspecto, sin filtro y sin animación.
      */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60rem 48rem at 6% -8%, rgba(28,109,14,.40), transparent 62%)," +
            "radial-gradient(56rem 46rem at 104% 108%, rgba(63,55,123,.62), transparent 62%)," +
            "radial-gradient(34rem 30rem at 76% 20%, rgba(0,94,184,.32), transparent 66%)",
        }}
      />

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

      <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="entrada text-sm font-medium uppercase tracking-[0.14em] text-white/45">
            {PROGRAMA.ejecutor}
          </p>

          <h1
            className="entrada mt-5 text-[clamp(3.5rem,9vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.045em]"
            style={{ animationDelay: "0.08s" }}
          >
            EMPRENDER
          </h1>

          <p
            className="entrada mt-5 max-w-xl text-[clamp(1.05rem,1.5vw,1.25rem)] font-medium leading-snug text-verde-claro/85"
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
            className="entrada mt-11 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.28s" }}
          >
            <a
              href="#convocatoria"
              className="group inline-flex items-center gap-2.5 rounded-full bg-verde px-8 py-4 font-semibold shadow-[0_10px_40px_-12px_rgba(28,109,14,1)] transition hover:bg-verde/85"
            >
              Postular al capital semilla
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

          {/* Un solo dato, el que decide si sigues leyendo: si está abierta y hasta cuándo. */}
          <p
            className="entrada mt-12 flex items-center gap-2.5 text-sm text-white/55"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verde-claro opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-verde-claro" />
            </span>
            Convocatoria abierta hasta el {CONVOCATORIA.cierra}
          </p>
        </div>

        <div className="hidden lg:block">
          <MapaEcuador />
        </div>
      </div>
    </section>
  );
}
