import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { VehicleBanner } from "@/components/resultados/VehicleBanner";
import { ResultsView } from "@/components/resultados/ResultsView";
import { ProcessStrip } from "@/components/shared/ProcessStrip";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Resultados de búsqueda",
  description:
    "Busca piezas por categoría, marca o precio. Confirma compatibilidad con tu matrícula por WhatsApp.",
};

interface ResultadosPageProps {
  searchParams: Promise<{ matricula?: string; categoria?: string }>;
}

export default async function ResultadosPage({ searchParams }: ResultadosPageProps) {
  const { matricula, categoria } = await searchParams;
  const plate = matricula ?? null;

  return (
    <>
      <Nav showPlate />
      <main className="flex-1">
        <VehicleBanner plate={plate} />
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
          <ProcessStrip />
        </div>
        <ResultsView
          products={products}
          plate={plate}
          initialCategory={categoria}
        />
      </main>
      <Footer />
    </>
  );
}
