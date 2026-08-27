import { Users, Building2, Handshake, User } from "lucide-react";
import { BENEFICIARIOS, PROVINCIAS } from "@/lib/contenido";
import { Reveal } from "./Reveal";

const ICONOS = { users: Users, building: Building2, handshake: Handshake, user: User };

export function Beneficiarios() {
  return (
    <section className="bg-navy px-6 py-28 text-white md:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-verde-claro">
              A quién va dirigido
            </p>
            <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
              Cuatro perfiles pueden postular
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFICIARIOS.map((b, i) => {
            const Icono = ICONOS[b.icono];
            return (
              <Reveal key={b.titulo} delay={i * 0.07}>
                <div className="group h-full bg-navy p-8 transition hover:bg-white/[0.04]">
                  <Icono size={30} className="text-verde-claro" strokeWidth={1.5} />
                  <h3 className="mt-6 text-xl font-bold">{b.titulo}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{b.detalle}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-16 flex flex-wrap items-center gap-x-3 gap-y-3 border-t border-white/10 pt-10">
            <span className="mr-2 text-sm font-semibold uppercase tracking-[0.14em] text-white/40">
              Solo en
            </span>
            {PROVINCIAS.map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/85"
              >
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
