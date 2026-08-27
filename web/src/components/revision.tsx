"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/**
 * «Modo revisión»: apagado, la página se ve limpia y se puede enseñar.
 * Encendido, resalta todo lo que escribimos nosotros y que Estefy tiene que corregir.
 *
 * Nace de una tensión real: Joel necesita algo presentable mañana, pero una landing
 * de gobierno con texto inventado que nadie distingue del oficial es un problema.
 * Esto resuelve las dos.
 */

const Ctx = createContext(false);
export const useRevision = () => useContext(Ctx);

export function RevisionProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "r" && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        setOn((v) => !v);
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  return (
    <Ctx.Provider value={on}>
      {children}
      <button
        onClick={() => setOn((v) => !v)}
        title="Resalta el texto de borrador que falta confirmar · Ctrl+Shift+R"
        className={`fixed bottom-5 right-5 z-[100] flex items-center gap-2 rounded-full p-3.5 text-sm font-semibold shadow-lg ring-1 transition sm:px-4 sm:py-3 ${
          on
            ? "bg-amber-400 text-amber-950 ring-amber-500"
            : "bg-white/95 text-navy ring-black/10 hover:bg-white"
        }`}
      >
        {on ? <Eye size={16} /> : <EyeOff size={16} />}
        <span className="hidden sm:inline">{on ? "Viendo borradores" : "Revisión"}</span>
      </button>
    </Ctx.Provider>
  );
}

/** Envuelve texto que escribimos nosotros y que hay que confirmar con Estefy. */
export function Borrador({
  children,
  nota,
  className = "",
}: {
  children: React.ReactNode;
  nota?: string;
  className?: string;
}) {
  const on = useRevision();
  if (!on) return <span className={className}>{children}</span>;
  return (
    <span
      className={`relative rounded bg-amber-200/70 decoration-amber-600/60 decoration-dotted underline-offset-4 [box-shadow:0_0_0_2px_rgb(251_191_36)] ${className}`}
      title={nota ?? "Borrador nuestro — confirmar con Estefy"}
    >
      {children}
    </span>
  );
}
