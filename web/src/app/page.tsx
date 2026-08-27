import { RevisionProvider } from "@/components/revision";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Programa } from "@/components/Programa";
import { Beneficiarios } from "@/components/Beneficiarios";
import { Convocatoria } from "@/components/Convocatoria";
import { Requisitos } from "@/components/Requisitos";
import { Cronograma } from "@/components/Cronograma";
import { Niveles } from "@/components/Niveles";
import { CursosAbiertos } from "@/components/CursosAbiertos";
import { Recursos } from "@/components/Recursos";
import { Footer } from "@/components/Footer";

/**
 * Orden pedido por Estefy (audio del 2026-08-26):
 *   hero · qué es el programa · convocatoria · cursos por niveles · recursos
 *
 * Se añadieron cuatro secciones que las bases de la convocatoria respaldan:
 * a quién va dirigido, requisitos y documentos, cronograma y cursos abiertos.
 * «Requisitos y documentos» es el pedido explícito de que nada obligue a salir
 * a un Google Drive. Si alguna sobra, se quita.
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
        <Requisitos />
        <Cronograma />
        <Niveles />
        <CursosAbiertos />
        <Recursos />
      </main>
      <Footer />
    </RevisionProvider>
  );
}
