/**
 * Marca de borrador.
 *
 * Hasta el 2026-08-27 esto era el «modo revisión»: un botón flotante en la
 * esquina —y `Ctrl+Shift+R`— que resaltaba en amarillo todo el texto que
 * habíamos escrito nosotros y que faltaba confirmar con Estefy.
 *
 * El botón se retiró: la página ya se presenta, y un control de trabajo interno
 * flotando sobre una web del Ministerio no puede verlo el cliente.
 *
 * **La marca se queda, y no es decorativa.** `<Borrador>` sigue envolviendo en
 * el código lo que nadie ha confirmado, que es lo que pide la Regla 1. Ahora no
 * pinta nada: devuelve el texto tal cual. Si hace falta volver a ver qué está
 * sin confirmar, basta con darle color aquí; no hay que ir sección por sección
 * buscándolo, porque las marcas nunca se borraron.
 *
 * ▸ Para saber qué queda en borrador sin tocar la página:
 *   `grep -rn "<Borrador" src/`
 */
export function Borrador({
  children,
  className = "",
}: {
  children: React.ReactNode;
  /** Por qué está en borrador. No se pinta; queda como nota en el código. */
  nota?: string;
  className?: string;
}) {
  return <span className={className}>{children}</span>;
}
