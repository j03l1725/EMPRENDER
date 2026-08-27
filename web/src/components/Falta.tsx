/**
 * Marca visible de contenido que todavía no entregó Estefy.
 * Regla del proyecto: ningún texto institucional se inventa (ver README).
 */
export function Falta({ children }: { children: React.ReactNode }) {
  return <span className="falta">[[FALTA: {children}]]</span>;
}
