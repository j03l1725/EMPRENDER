import { CRONOGRAMA } from "@/lib/contenido";
import { Reveal } from "./Reveal";

export function Cronograma() {
  return (
    <section id="cronograma" className="bg-navy px-6 py-28 text-white md:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-verde-claro">
              El proceso
            </p>
            <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
              De la postulación al desembolso
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/65">
              El capital semilla no se entrega al postular. Primero te capacitas, después
              construyes tu Plan de Mejora de Agronegocios con acompañamiento, y ese plan es
              el que se evalúa.
            </p>
          </div>
        </Reveal>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {CRONOGRAMA.map((f, i) => (
            <Reveal key={f.n} delay={i * 0.05}>
              <li
                className={`flex h-full flex-col bg-navy p-8 ${
                  i === CRONOGRAMA.length - 1 && CRONOGRAMA.length % 2 === 1
                    ? "md:col-span-2"
                    : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-3xl font-bold tracking-tight text-white/25">
                    {String(f.n).padStart(2, "0")}
                  </span>
                  <span className="text-right text-xs font-semibold uppercase tracking-wide text-verde-claro">
                    {f.plazo}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold leading-snug">{f.titulo}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/60">{f.detalle}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <p className="mt-10 text-sm text-white/45">
            Plazos en días hábiles, tomados de las bases § 3.13. El cronograma puede ajustarse
            operativamente según el número de postulaciones recibidas.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
