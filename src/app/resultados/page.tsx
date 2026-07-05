import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { VehicleBanner } from "@/components/resultados/VehicleBanner";
import { ResultsView } from "@/components/resultados/ResultsView";
import { products } from "@/data/products";
import { identifyVehicle } from "@/data/vehicles";

export const metadata: Metadata = {
  title: "Resultados de búsqueda",
  description:
    "Piezas compatibles con tu coche, verificadas por matrícula. Stock en España, entrega mañana.",
};

interface ResultadosPageProps {
  searchParams: Promise<{ matricula?: string; categoria?: string }>;
}

export default async function ResultadosPage({ searchParams }: ResultadosPageProps) {
  const { matricula, categoria } = await searchParams;
  const vehicle = matricula ? identifyVehicle(matricula) : null;

  return (
    <>
      <Nav showPlate />
      <main className="flex-1">
        <VehicleBanner vehicle={vehicle} />
        <ResultsView
          products={products}
          vehicle={vehicle}
          initialCategory={categoria}
        />
      </main>
      <Footer />
    </>
  );
}
