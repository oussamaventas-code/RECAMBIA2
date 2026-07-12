import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { VehicleBanner } from "@/components/resultados/VehicleBanner";
import { ResultsView } from "@/components/resultados/ResultsView";
import { ProcessStrip } from "@/components/shared/ProcessStrip";
import { products } from "@/data/products";
import { brands } from "@/data/brands";

export const metadata: Metadata = {
  title: "Resultados de búsqueda",
  description:
    "Busca piezas por categoría, marca o precio. Confirma compatibilidad con tu matrícula por WhatsApp.",
};

interface ResultadosPageProps {
  searchParams: Promise<{ matricula?: string; categoria?: string; marca?: string }>;
}

export default async function ResultadosPage({ searchParams }: ResultadosPageProps) {
  const { matricula, categoria, marca } = await searchParams;
  const plate = matricula ?? null;
  // El enlace de marca llega como slug (BrandIndex); el filtro de la lista
  // compara por el nombre real que llevan los productos (product.brand).
  const initialBrand = marca ? brands.find((b) => b.slug === marca)?.name : undefined;

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
          initialBrand={initialBrand}
        />
      </main>
      <Footer />
    </>
  );
}
