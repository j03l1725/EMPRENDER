"use client";

import { useState } from "react";
import { Check, ExternalLink, Download, XCircle } from "lucide-react";
import {
  REQUISITOS_COMUNES,
  REQUISITOS_NATURAL,
  REQUISITOS_JURIDICA,
  CAUSALES_RECHAZO,
  FINANCIABLE,
} from "@/lib/contenido";
import { Reveal } from "./Reveal";

type Tipo = "natural" | "juridica";

/**
 * Todo lo que las bases mandan a buscar a un Google Drive, aquí mismo.
 *
 * Es el pedido concreto de Estefy: que nadie tenga que salir a un Drive a buscar
 * un formato. Los formatos de carta se descargan desde esta misma página; los
 * certificados llevan al sistema oficial que los emite, que sí es obligatorio.
 */
export function Requisitos() {
  const [tipo, setTipo] = useState<Tipo>("natural");
  const especificos = tipo === "natural" ? REQUISITOS_NATURAL : REQUISITOS_JURIDICA;
  const lista = [...especificos, ...REQUISITOS_COMUNES];

  return (
    <section id="requisitos" className="bg-gris px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-verde">
              Requisitos y documentos
            </p>
            <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
              Todo lo que necesitas, aquí
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy/70">
              Los formatos de carta se descargan desde esta página. Los certificados se obtienen
              en el sistema oficial de cada institución, que es el único que los emite válidamente.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 inline-flex rounded-full bg-white p-1.5 ring-1 ring-navy/8">
            {(["natural", "juridica"] as Tipo[]).map((t) => (
              <button
                key={t}
                onClick={() => setTipo(t)}
                className={`rounded-full px-7 py-3 text-sm font-semibold transition ${
                  tipo === t ? "bg-navy text-white" : "text-navy/60 hover:text-navy"
                }`}
              >
                {t === "natural" ? "Persona natural" : "Persona jurídica"}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-navy/8 md:grid-cols-2">
            {lista.map((r, i) => (
              <li
                key={r.titulo}
                className={`flex gap-4 bg-white p-7 ${
                  i === lista.length - 1 && lista.length % 2 === 1 ? "md:col-span-2" : ""
                }`}
              >
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-verde/10 text-xs font-bold text-verde">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold leading-snug">{r.titulo}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy/65">{r.como}</p>

                  {r.enlace && (
                    <a
                      href={r.enlace}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="-mx-2 mt-2 inline-flex items-center gap-1.5 rounded px-2 py-2 text-sm font-semibold text-azul hover:underline"
                    >
                      {r.enlaceTexto ?? "Abrir"}
                      <ExternalLink size={14} />
                    </a>
                  )}

                  {r.formato && (
                    <a
                      href={r.formato}
                      download
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-verde-claro px-4 py-2 text-sm font-semibold text-verde transition hover:bg-verde hover:text-white"
                    >
                      <Download size={14} />
                      Descargar el formato
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl bg-white p-9 ring-1 ring-navy/8">
              <h3 className="flex items-center gap-2.5 text-lg font-bold">
                <Check size={19} strokeWidth={3} className="text-verde" />
                Qué puedes financiar
              </h3>
              <ul className="mt-6 space-y-3">
                {FINANCIABLE.map((f) => (
                  <li key={f} className="flex gap-3 text-sm leading-relaxed text-navy/75">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-verde" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl bg-white p-9 ring-1 ring-navy/8">
              <h3 className="flex items-center gap-2.5 text-lg font-bold">
                <XCircle size={19} className="text-gob-red" />
                Qué te deja fuera
              </h3>
              <p className="mt-2 text-sm text-navy/55">
                Excluye automáticamente, en cualquier etapa del proceso.
              </p>
              <ul className="mt-6 space-y-3">
                {CAUSALES_RECHAZO.map((c) => (
                  <li key={c} className="flex gap-3 text-sm leading-relaxed text-navy/75">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gob-red" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
