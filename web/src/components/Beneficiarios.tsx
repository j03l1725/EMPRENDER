import { Factory, Handshake } from "lucide-react";
import { BENEFICIARIOS, TERRITORIO } from "@/lib/contenido";
import { Reveal } from "./Reveal";
import { Territorio } from "./Territorio";

const ICONOS = { factory: Factory, handshake: Handshake };

export function Beneficiarios() {
  return (
    <section className="bg-navy px-6 py-28 text-white md:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
              {TERRITORIO.titulo}
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-white/60">{TERRITORIO.bajada}</p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5">
            {BENEFICIARIOS.map((b, i) => {
              const Icono = ICONOS[b.icono];
              return (
                <Reveal key={b.titulo} delay={i * 0.07}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition hover:bg-white/[0.06]">
                    <Icono size={30} className="text-verde-claro" strokeWidth={1.5} />
                    <h3 className="mt-6 text-xl font-bold leading-snug">{b.titulo}</h3>
                    <p className="mt-3 leading-relaxed text-white/60">{b.detalle}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <Territorio />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
