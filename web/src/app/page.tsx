import { Falta } from "@/components/Falta";
import { TarjetaCurso, type Curso } from "@/components/TarjetaCurso";
import { ArrowRight, FileText, Play, Video, MapPin } from "lucide-react";

/**
 * Esqueleto de la landing en el orden que pidió Estefy (audio 1, 2026-08-26):
 *   1 hero · 2 qué es el programa · 3 convocatoria · 4 cursos por niveles · 5 recursos
 * Ver docs/BRIEF.md § 4.
 *
 * El hero interactivo (anillos orbitando, al estilo de fomento-digital) y los
 * componentes de 21st.dev entran encima de esta estructura.
 */

const PROVINCIAS = [
  "Esmeraldas", "Manabí", "Santo Domingo de los Tsáchilas",
  "Carchi", "Imbabura", "Sucumbíos", "Napo",
];

const NIVELES = [1, 2, 3];

const CURSOS_EJEMPLO: Curso[] = [];

export default function Home() {
  return (
    <>
      {/* ── Cabecera fija, molde SEAL ───────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-navy text-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
          <span className="text-sm font-semibold tracking-wide">
            <Falta>logos Gobierno del Ecuador — ¿izquierda o derecha? BRIEF § 6.4</Falta>
          </span>
          <nav className="ml-auto hidden gap-6 text-sm md:flex">
            <a href="#programa" className="hover:text-verde-claro">El programa</a>
            <a href="#convocatoria" className="hover:text-verde-claro">Convocatoria</a>
            <a href="#cursos" className="hover:text-verde-claro">Cursos</a>
            <a href="#recursos" className="hover:text-verde-claro">Recursos</a>
          </nav>
          <a
            href="#convocatoria"
            className="rounded-full bg-azul px-5 py-2 text-sm font-semibold hover:bg-azul/85"
          >
            Postular
          </a>
        </div>
      </header>

      <main>
        {/* ── 1 · Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-navy px-6 py-28 text-white">
          <div className="pointer-events-none absolute -left-32 -top-32 h-[45rem] w-[45rem] rounded-full bg-verde/20 blur-[150px]" />
          <div className="pointer-events-none absolute -bottom-40 -right-32 h-[45rem] w-[45rem] rounded-full bg-morado/40 blur-[150px]" />

          <div className="relative mx-auto max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-verde-claro">
              Ministerio de Producción, Comercio Exterior e Inversiones
            </p>
            <h1 className="text-6xl font-extrabold leading-[1.05] md:text-7xl">EMPRENDER</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              Fortalecimiento de las capacidades de las Unidades Productivas Rurales
              en el Territorio Focalizado.
            </p>
            <p className="mt-6 max-w-2xl text-white/70">
              <Falta>bajada del hero — la escribe Estefy</Falta>
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#convocatoria"
                className="inline-flex items-center gap-2 rounded bg-verde px-7 py-3.5 font-semibold hover:bg-verde/90"
              >
                Ver la convocatoria <ArrowRight size={18} aria-hidden />
              </a>
              <a
                href="#programa"
                className="inline-flex items-center gap-2 rounded px-2 py-3.5 font-semibold hover:text-verde-claro"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-white/70">
                  <Play size={16} fill="currentColor" aria-hidden />
                </span>
                Conoce el programa
              </a>
            </div>
          </div>
        </section>

        {/* ── 2 · Qué es el programa ───────────────────────────────── */}
        <section id="programa" className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-4xl font-bold">¿Qué es EMPRENDER?</h2>
            <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-navy/70">
              <Falta>descripción del programa — la escribe Estefy</Falta>
            </p>

            {/* Estos tres datos SÍ están verificados en la ficha del MPCEI */}
            <dl className="mt-14 grid gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-verde-claro p-7">
                <dt className="text-sm font-semibold uppercase tracking-wide text-verde">
                  Capital semilla
                </dt>
                <dd className="mt-2 text-3xl font-bold">USD 10.000 – 80.000</dd>
              </div>
              <div className="rounded-lg bg-verde-claro p-7">
                <dt className="text-sm font-semibold uppercase tracking-wide text-verde">
                  Dirigido a
                </dt>
                <dd className="mt-2 text-lg font-semibold leading-snug">
                  Asociaciones de productores, MiPymes, organizaciones de EPS y personas
                  naturales con actividad productiva
                </dd>
              </div>
              <div className="rounded-lg bg-verde-claro p-7">
                <dt className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-verde">
                  <MapPin size={15} aria-hidden /> Territorio focalizado
                </dt>
                <dd className="mt-2 text-lg font-semibold leading-snug">
                  {PROVINCIAS.join(" · ")}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ── 3 · Convocatoria ─────────────────────────────────────── */}
        <section id="convocatoria" className="bg-gris px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-4xl font-bold">La convocatoria</h2>
            <p className="mt-4 max-w-3xl text-lg text-navy/70">
              <Falta>
                convocatoria 2026 — fechas, requisitos, bases en PDF y formulario de registro.
                BRIEF § 6.2
              </Falta>
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded bg-verde px-7 py-3.5 font-semibold text-white hover:bg-verde/90"
              >
                Postular ahora <ArrowRight size={18} aria-hidden />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded border-2 border-navy px-7 py-3.5 font-semibold hover:bg-navy hover:text-white"
              >
                <FileText size={18} aria-hidden /> Bases de la convocatoria
              </a>
            </div>
          </div>
        </section>

        {/* ── 4 · Cursos por niveles ───────────────────────────────── */}
        <section id="cursos" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-4xl font-bold">Cursos por niveles</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-navy/70">
              Tres niveles de formación. Cada uno entra a la plataforma de cursos habilitada
              para el efecto.
            </p>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {NIVELES.map((n) => (
                <div key={n} className="rounded-lg border border-navy/10 p-8">
                  <span className="inline-grid h-12 w-12 place-items-center rounded-full bg-morado text-xl font-bold text-white">
                    {n}
                  </span>
                  <h3 className="mt-5 text-2xl font-bold">
                    <Falta>nombre nivel {n}</Falta>
                  </h3>
                  <p className="mt-3 text-navy/70">
                    <Falta>qué contiene el nivel {n}</Falta>
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-verde">
                    Entrar al nivel {n} <ArrowRight size={16} aria-hidden />
                  </span>
                  <p className="mt-2 text-xs text-navy/45">
                    <Falta>URL del nivel {n} en el SEAL</Falta>
                  </p>
                </div>
              ))}
            </div>

            {/* Molde de tarjeta del SEAL — audio 2. Espera los cursos reales. */}
            {CURSOS_EJEMPLO.length > 0 && (
              <div className="mt-16 grid gap-6 md:grid-cols-3">
                {CURSOS_EJEMPLO.map((c) => (
                  <TarjetaCurso key={c.titulo} curso={c} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── 5 · Recursos ─────────────────────────────────────────── */}
        <section id="recursos" className="bg-gris px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-4xl font-bold">Recursos</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="grid aspect-video place-items-center rounded-lg bg-navy/5 text-center">
                <span>
                  <Play className="mx-auto mb-3 text-navy/40" size={32} aria-hidden />
                  <Falta>video principal</Falta>
                </span>
              </div>
              <div className="grid aspect-video place-items-center rounded-lg bg-navy/5 text-center">
                <span>
                  <Video className="mx-auto mb-3 text-navy/40" size={32} aria-hidden />
                  <Falta>reel de Instagram</Falta>
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Pie, molde SEAL ─────────────────────────────────────────── */}
      <footer className="bg-morado px-6 py-14 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <nav className="flex flex-wrap justify-center gap-x-10 gap-y-3 font-semibold">
            <a href="#programa" className="hover:underline">El programa</a>
            <a href="#convocatoria" className="hover:underline">Convocatoria</a>
            <a href="#cursos" className="hover:underline">Cursos</a>
            <a href="mailto:pemprender@produccion.gob.ec" className="hover:underline">Contacto</a>
          </nav>
          <p className="mt-10 text-sm text-white/70">
            © 2026 · Ministerio de Producción, Comercio Exterior e Inversiones del Ecuador
          </p>
        </div>
      </footer>
    </>
  );
}
