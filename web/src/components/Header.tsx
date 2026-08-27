"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { PROGRAMA } from "@/lib/contenido";

const ENLACES = [
  { href: "#programa", texto: "El programa" },
  { href: "#convocatoria", texto: "Convocatoria" },
  { href: "#requisitos", texto: "Requisitos" },
  { href: "#niveles", texto: "Formación" },
  { href: "#recursos", texto: "Recursos" },
];

/** Las tres barras diagonales del logo «EL NUEVO ECUADOR», mientras llega el logo real. */
function Tricolor({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-[3px] ${className}`} aria-hidden>
      {["#FFD700", "#0255ba", "#EF3E42"].map((c) => (
        <span
          key={c}
          className="block h-5 w-[5px] skew-x-[-20deg] rounded-[1px]"
          style={{ background: c }}
        />
      ))}
    </span>
  );
}

export function Header() {
  const [compacto, setCompacto] = useState(false);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const s = () => setCompacto(window.scrollY > 24);
    s();
    window.addEventListener("scroll", s, { passive: true });
    return () => window.removeEventListener("scroll", s);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        compacto ? "bg-navy/95 shadow-lg backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-8 px-6">
        <a href="#" className="flex items-center gap-3 text-white">
          <Tricolor />
          <span className="leading-none">
            <span className="block text-lg font-extrabold tracking-tight">EMPRENDER</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              {PROGRAMA.ejecutorSiglas}
            </span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-8 md:flex">
          {ENLACES.map((e) => (
            <a
              key={e.href}
              href={e.href}
              className="text-sm font-medium text-white/80 transition hover:text-white"
            >
              {e.texto}
            </a>
          ))}
        </nav>

        <a
          href="#convocatoria"
          className="hidden rounded-full bg-verde px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-verde/85 md:inline-block"
        >
          Postular
        </a>

        <button
          className="ml-auto text-white md:hidden"
          onClick={() => setAbierto((v) => !v)}
          aria-label="Menú"
        >
          {abierto ? <X /> : <Menu />}
        </button>
      </div>

      {abierto && (
        <nav className="border-t border-white/10 bg-navy px-6 pb-6 pt-2 md:hidden">
          {ENLACES.map((e) => (
            <a
              key={e.href}
              href={e.href}
              onClick={() => setAbierto(false)}
              className="block py-3 font-medium text-white/85"
            >
              {e.texto}
            </a>
          ))}
          <a
            href="#convocatoria"
            onClick={() => setAbierto(false)}
            className="mt-3 block rounded-full bg-verde px-6 py-3 text-center font-semibold text-white"
          >
            Postular
          </a>
        </nav>
      )}
    </header>
  );
}
