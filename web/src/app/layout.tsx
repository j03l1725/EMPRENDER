import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "EMPRENDER — Fortalecimiento de Unidades Productivas Rurales",
  description:
    "Programa del Ministerio de Producción, Comercio Exterior e Inversiones del Ecuador. " +
    "Capital semilla de USD 10.000 a 80.000 para unidades productivas agroindustriales " +
    "de Esmeraldas, Manabí, Santo Domingo, Carchi, Imbabura, Sucumbíos y Napo.",
  /**
   * Sin indexar mientras sea un borrador de trabajo.
   * Lleva 20 fragmentos de texto que aún no confirma el Ministerio; que Google los
   * recoja y los muestre como información oficial sería el peor resultado posible.
   * Se quita este bloque el día que el contenido esté aprobado.
   */
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
