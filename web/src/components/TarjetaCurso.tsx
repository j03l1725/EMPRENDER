import Image from "next/image";
import { GraduationCap, RefreshCw } from "lucide-react";

/**
 * Molde de tarjeta del SEAL — pedido explícitamente en el audio 2 de Estefy:
 * «ese es el formato que tenemos que tener para los cursos […] la imagen de
 * arriba, la fotito del curso».
 * Referencia: docs/referencias/capturas/seal-03-cursos-abiertos-y-pie.png
 */
export type Curso = {
  titulo: string;
  imagen: string;
  inscritos: number;
  actualizado: string;
  href: string;
  nuevo?: boolean;
};

export function TarjetaCurso({ curso }: { curso: Curso }) {
  return (
    <a
      href={curso.href}
      className="group block overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
    >
      <div className="relative aspect-video bg-gris">
        <Image src={curso.imagen} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        {curso.nuevo && (
          <span className="absolute right-3 top-3 rounded bg-verde-claro px-2 py-0.5 text-xs font-semibold text-verde">
            Nuevo
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-navy group-hover:text-verde">
          {curso.titulo}
        </h3>

        <div className="mt-3 flex items-center gap-4 text-sm text-navy/55">
          <span className="flex items-center gap-1.5">
            <GraduationCap size={16} aria-hidden />
            {curso.inscritos}
            <span className="sr-only">inscritos</span>
          </span>
          <span className="flex items-center gap-1.5">
            <RefreshCw size={14} aria-hidden />
            {curso.actualizado}
            <span className="sr-only">última actualización</span>
          </span>
        </div>
      </div>

      {/* Barra de acento inferior, parcial — igual que en el SEAL */}
      <div className="h-1 w-1/3 bg-verde/70 transition-all group-hover:w-full" />
    </a>
  );
}
