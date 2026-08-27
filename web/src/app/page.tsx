import { RevisionProvider } from "@/components/revision";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Programa } from "@/components/Programa";
import { Pasos } from "@/components/Pasos";
import { Beneficiarios } from "@/components/Beneficiarios";
import { Convocatoria } from "@/components/Convocatoria";
import { Requisitos } from "@/components/Requisitos";
import { Cronograma } from "@/components/Cronograma";
import { Niveles } from "@/components/Niveles";
import { Recursos } from "@/components/Recursos";
import { Cierre } from "@/components/Cierre";
import { Footer } from "@/components/Footer";

/**
 * Orden pedido por Estefy (audio del 2026-08-26):
 *   hero · qué es el programa · convocatoria · cursos por niveles · recursos
 *
 * Se añadieron cuatro secciones que las bases de la convocatoria respaldan:
 * a quién va dirigido, requisitos y documentos, cronograma y cursos abiertos.
 * «Requisitos y documentos» es el pedido explícito de que nada obligue a salir
 * a un Google Drive. Si alguna sobra, se quita.
 *
 * El 2026-08-27 entraron dos más, las dos pedidas por Estefy: «El proceso», con
 * las siete etapas, justo después de la convocatoria; y la franja de cierre, al
 * final, que recoge los tres pasos para postular.
 */
export default function Home() {
  return (
    <RevisionProvider>
      <Header />
      <main>
        <Hero />
        <Programa />
        <Pasos />
        <Beneficiarios />
        <Convocatoria />
        <Requisitos />
        <Cronograma />
        <Niveles />
        <Cierre />
        <Recursos />
      </main>
      <Footer />
    </RevisionProvider>
  );
}
