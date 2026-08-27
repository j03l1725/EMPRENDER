import { RevisionProvider } from "@/components/revision";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Programa } from "@/components/Programa";
import { Beneficiarios } from "@/components/Beneficiarios";
import { Convocatoria } from "@/components/Convocatoria";
import { Niveles } from "@/components/Niveles";
import { CursosAbiertos } from "@/components/CursosAbiertos";
import { Recursos } from "@/components/Recursos";
import { Footer } from "@/components/Footer";

/**
 * Orden pedido por Estefy en el audio del 2026-08-26:
 *   hero · qué es el programa · convocatoria · cursos por niveles · recursos
 *
 * Beneficiarios y el carrusel de cursos abiertos los añadimos nosotros porque
 * la ficha oficial los respalda y la página quedaba coja sin ellos. Si sobran,
 * se quitan mañana.
 */
export default function Home() {
  return (
    <RevisionProvider>
      <Header />
      <main>
        <Hero />
        <Programa />
        <Beneficiarios />
        <Convocatoria />
        <Niveles />
        <CursosAbiertos />
        <Recursos />
      </main>
      <Footer />
    </RevisionProvider>
  );
}
