import { Play, Video, Mail } from "lucide-react";
import { RECURSOS, PROGRAMA } from "@/lib/contenido";
import { Borrador } from "./revision";
import { Reveal } from "./Reveal";

export function Recursos() {
  return (
    <section id="recursos" className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-verde">
            Recursos
          </p>
          <h2 className="max-w-2xl text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
            Míralo en dos minutos
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {RECURSOS.map((r, i) => (
            <Reveal key={r.titulo} delay={i * 0.08}>
              <div className="group cursor-pointer overflow-hidden rounded-2xl bg-navy">
                <div className="relative grid aspect-video place-items-center">
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background:
                        i === 0
                          ? "radial-gradient(ellipse at 30% 30%, #1c6d0e 0%, transparent 65%)"
                          : "radial-gradient(ellipse at 70% 40%, #3f377b 0%, transparent 65%)",
                    }}
                  />
                  <span className="relative grid h-20 w-20 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition group-hover:scale-110 group-hover:bg-white/20">
                    {r.tipo === "video" ? (
                      <Play size={26} fill="currentColor" />
                    ) : (
                      <Video size={26} />
                    )}
                  </span>
                </div>
                <div className="px-8 pb-8 pt-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-verde-claro">
                    {r.tipo === "video" ? "Video" : "Reel de Instagram"}
                  </p>
                  <h3 className="mt-3 text-xl font-bold">
                    <Borrador nota="Título del recurso — falta la URL real, la da Estefy">
                      {r.titulo}
                    </Borrador>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    <Borrador>{r.detalle}</Borrador>
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl bg-verde-claro px-7 py-9 sm:px-10 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">¿Tienes dudas?</h3>
              <p className="mt-1.5 text-navy/65">
                Escríbenos y el equipo del proyecto te responde.
              </p>
            </div>
            <a
              href={`mailto:${PROGRAMA.correo}`}
              className="inline-flex w-full items-center justify-center gap-2.5 break-all rounded-full bg-verde px-6 py-4 text-sm font-semibold text-white transition hover:bg-verde/85 sm:w-auto sm:px-8 sm:text-base"
            >
              <Mail size={18} className="shrink-0" />
              {PROGRAMA.correo}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
