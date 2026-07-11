import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/resultados/ProductCard";
import { products } from "@/data/products";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ marca: string, modelo: string, categoria: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const categoriaCapitalized = resolvedParams.categoria.charAt(0).toUpperCase() + resolvedParams.categoria.slice(1);
  return {
    title: `Recambios de ${categoriaCapitalized} para ${resolvedParams.marca} ${resolvedParams.modelo} - RECAMBIA`,
    description: `Catálogo de ${categoriaCapitalized} para ${resolvedParams.marca} ${resolvedParams.modelo}. Los mejores precios con envío en 24h y montaje en red de talleres.`,
  };
}

export default async function SEOCategoryPage({ params }: { params: Promise<{ marca: string, modelo: string, categoria: string }> }) {
  const resolvedParams = await params;
  
  // Simular búsqueda en DB: filtramos por categoría (exacta)
  // En un caso real, también filtraríamos por marca y modelo (compatibleWith).
  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === resolvedParams.categoria.toLowerCase()
  );

  const categoriaCapitalized = resolvedParams.categoria.charAt(0).toUpperCase() + resolvedParams.categoria.slice(1);

  return (
    <>
      <Nav />
      <main className="flex-1 bg-paper">
        {/* SEO Header */}
        <div className="bg-surface-1 border-b border-line py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            {/* Breadcrumbs */}
            <nav className="mb-4 flex items-center text-xs text-ink-muted">
              <Link href="/" className="hover:text-accent">Inicio</Link>
              <span className="mx-2">/</span>
              <span className="capitalize">Recambios {resolvedParams.marca}</span>
              <span className="mx-2">/</span>
              <span className="capitalize">{resolvedParams.modelo}</span>
              <span className="mx-2">/</span>
              <span className="text-ink font-semibold">{categoriaCapitalized}</span>
            </nav>
            
            <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight capitalize">
              Recambios de {resolvedParams.categoria} para {resolvedParams.marca} {resolvedParams.modelo}
            </h1>
            <p className="mt-4 text-ink-muted max-w-2xl text-sm">
              Encuentra los mejores repuestos de {resolvedParams.categoria} compatibles con {resolvedParams.marca} {resolvedParams.modelo}. Todas nuestras piezas están garantizadas y verificadas por expertos.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters (Mocked) */}
            <aside className="w-full lg:w-64 shrink-0 space-y-6">
              <div className="rounded-xl border border-line bg-surface-1 p-5 shadow-sm">
                <h3 className="font-semibold text-ink mb-4">Vehículo seleccionado</h3>
                <div className="flex items-center gap-3 rounded-lg bg-surface-2 p-3">
                  <svg className="h-8 w-8 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <div>
                    <p className="text-sm font-bold text-ink uppercase">{resolvedParams.marca}</p>
                    <p className="text-xs text-ink-muted">{resolvedParams.modelo}</p>
                  </div>
                </div>
                <button className="mt-3 w-full text-center text-xs font-semibold text-accent hover:underline">
                  Cambiar vehículo
                </button>
              </div>

              <div className="rounded-xl border border-line bg-surface-1 p-5 shadow-sm">
                <h3 className="font-semibold text-ink mb-4">Filtrar por marca</h3>
                <div className="space-y-2">
                  {["Bosch", "Brembo", "Mann Filter", "Sachs", "NGK"].map((brand) => (
                    <label key={brand} className="flex items-center gap-2 text-sm text-ink-muted cursor-pointer hover:text-ink">
                      <input type="checkbox" className="rounded border-line text-accent focus:ring-accent" />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-ink-muted">
                  Mostrando <strong className="text-ink">{filteredProducts.length}</strong> resultados para {categoriaCapitalized}
                </p>
                <select className="rounded-lg border border-line bg-surface-1 px-3 py-1.5 text-sm text-ink outline-none focus:border-accent">
                  <option>Recomendados</option>
                  <option>Precio: Menor a Mayor</option>
                  <option>Precio: Mayor a Menor</option>
                </select>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-line bg-surface-1 p-12 text-center shadow-sm">
                  <svg className="mx-auto mb-4 h-12 w-12 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-ink mb-2">No se encontraron productos</h3>
                  <p className="text-ink-muted max-w-sm mx-auto">
                    No tenemos stock de {resolvedParams.categoria} para este vehículo en este momento. Vuelve a intentarlo más tarde o contacta con nosotros.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
