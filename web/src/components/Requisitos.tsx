"use client";

import { useState } from "react";
import { ExternalLink, Download, Check, ArrowRight } from "lucide-react";
import {
  REQUISITOS_CABECERA,
  REQUISITOS_COMUNES,
  REQUISITOS_NATURAL,
  REQUISITOS_JURIDICA,
  VERIFICA_ANTES,
  CONVOCATORIA,
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
              {REQUISITOS_CABECERA.antetitulo}
            </p>
            <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
              {REQUISITOS_CABECERA.titulo}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy/70">
              {REQUISITOS_CABECERA.bajada}
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

        {/* Cierra la sección. Antes había aquí una tarjeta roja, «Qué te deja
            fuera», con siete causales de rechazo de las bases § 3.6. Estefy la
            cambió el 2026-08-27 por esta lista en positivo; las causales
            completas se consultan en el PDF, que es la fuente. */}
        <Reveal>
          <div className="mt-8 rounded-2xl bg-white p-9 ring-1 ring-navy/8 md:p-11">
            <h3 className="text-xl font-bold">{VERIFICA_ANTES.titulo}</h3>
            <ul className="mt-7 grid gap-4 md:grid-cols-2 md:gap-x-12">
              {VERIFICA_ANTES.items.map((v) => (
                <li key={v} className="flex gap-3.5 leading-relaxed text-navy/75">
                  <Check
                    size={18}
                    strokeWidth={3}
                    aria-hidden
                    className="mt-1 shrink-0 text-verde"
                  />
                  {v}
                </li>
              ))}
            </ul>

            <a
              href={CONVOCATORIA.urlBases}
              target="_blank"
              rel="noopener noreferrer"
              className="group -mx-2 mt-9 inline-flex items-center gap-2 rounded px-2 py-2 font-semibold text-azul hover:underline"
            >
              {VERIFICA_ANTES.enlaceTexto}
              <ArrowRight size={17} className="transition group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
