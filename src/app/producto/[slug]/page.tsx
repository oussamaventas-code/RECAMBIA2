import { getProductBySlug } from "@/data/products";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { whatsappOrderUrl } from "@/lib/whatsapp";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  if (!product) return { title: "No encontrado" };
  return {
    title: `${product.name} ${product.brand} - RECAMBIA`,
    description: `Compra ${product.name} de ${product.brand} al mejor precio. Compatible con: ${product.compatibleWith?.join(", ")}`,
  };
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ matricula?: string }>;
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const resolvedParams = await params;
  const { matricula } = await searchParams;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const stockBadge =
    product.stock === "alto"
      ? { color: "bg-success", text: "En stock", bg: "bg-success/10", border: "border-success/20" }
      : product.stock === "bajo"
      ? { color: "bg-warning", text: "Últimas unidades", bg: "bg-warning/10", border: "border-warning/20" }
      : { color: "bg-danger", text: "Agotado", bg: "bg-danger/10", border: "border-danger/20" };

  // Datos estructurados para Google (rich results / Shopping).
  // Sin aggregateRating a propósito: no enviamos valoraciones a Google
  // hasta tener reseñas reales.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.oemRef,
    brand: { "@type": "Brand", name: product.brand },
    description: `${product.name} de ${product.brand}. Compatible con: ${product.compatibleWith?.join(", ")}`,
    offers: {
      "@type": "Offer",
      url: `https://recambia.es/producto/${product.slug}`,
      priceCurrency: "EUR",
      price: product.price.toFixed(2),
      availability:
        product.stock === "agotado"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="flex-1 bg-paper py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          
          {/* Breadcrumbs */}
          <nav className="mb-6 flex items-center text-sm text-ink-muted">
            <Link href="/" className="hover:text-accent">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href={`/resultados?categoria=${product.category}`} className="hover:text-accent capitalize">{product.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Images */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-line bg-surface-1 p-8 sticky top-24 shadow-sm flex items-center justify-center min-h-[400px]">
                {product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-auto object-contain mix-blend-multiply"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-surface-2 border border-line">
                      <span className="font-display text-6xl text-ink-faint/50">
                        {product.brand.charAt(0)}
                      </span>
                    </div>
                    <p className="text-xs text-ink-faint">
                      Foto del fabricante próximamente
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Info */}
            <div className="lg:col-span-7">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded bg-surface-3 px-2 py-1 text-xs font-bold text-ink-muted tracking-wide uppercase">
                  {product.brand}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight mb-4">
                {product.name}
              </h1>

              {/* Price & Stock card */}
              <div className="rounded-2xl border border-line bg-surface-1 p-6 mb-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-6">
                  <div>
                    {product.compareAtPrice && (
                      <span className="block text-sm text-ink-faint line-through mb-1">
                        {product.compareAtPrice.toFixed(2)} €
                      </span>
                    )}
                    <span className="font-mono-num text-4xl font-extrabold text-ink tracking-tight">
                      {product.price.toFixed(2)} <span className="text-xl font-normal text-ink-muted">€</span>
                    </span>
                    <p className="text-xs text-ink-muted mt-1">IVA incluido. Envío gratis +60€</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                     <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold text-ink border ${stockBadge.bg} ${stockBadge.border}`}>
                        <span className={`h-2.5 w-2.5 rounded-full ${stockBadge.color} ${product.stock !== "agotado" ? "animate-pulse-led" : ""}`} />
                        {stockBadge.text}
                     </span>
                     {product.deliveryTomorrow && (
                       <span className="text-sm font-medium text-success flex items-center gap-1.5">
                         <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                         </svg>
                         Recíbelo mañana
                       </span>
                     )}
                  </div>
                </div>

                {/* Installation Badge */}
                <div className="mb-6 flex items-center gap-3 rounded-xl bg-surface-2 p-4 border border-line">
                  <svg className="h-6 w-6 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink">Instalación en taller asociado desde 30€</p>
                    <p className="text-xs text-ink-muted mt-0.5">Te enviamos la pieza al taller y solo pagas el montaje. <Link href="/talleres-asociados" className="text-accent hover:underline">Saber más</Link></p>
                  </div>
                </div>

                <a
                  href={whatsappOrderUrl(product, matricula)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-success px-6 py-4 font-semibold text-white shadow-lg shadow-success/20 transition-all hover:bg-success-glow hover:shadow-xl active:scale-[0.98]"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  Comprar por WhatsApp
                </a>
                <p className="text-center text-xs text-ink-faint mt-4">Nuestros expertos revisarán tu bastidor para confirmar 100% de compatibilidad antes del cobro.</p>
              </div>

              {/* Tecnical Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Atributos técnicos */}
                <div>
                  <h3 className="font-display text-xl text-ink mb-4 flex items-center gap-2">
                    <svg className="h-5 w-5 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Especificaciones
                  </h3>
                  <div className="rounded-xl border border-line bg-surface-1 overflow-hidden">
                    <table className="w-full text-sm">
                      <tbody>
                        {product.specs?.map((spec, idx) => (
                          <tr key={idx} className="border-b border-line last:border-0 even:bg-surface-2/50">
                            <td className="py-2.5 px-4 font-medium text-ink-muted">{spec.label}</td>
                            <td className="py-2.5 px-4 text-ink text-right">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Referencias OEM */}
                <div>
                  <h3 className="font-display text-xl text-ink mb-4 flex items-center gap-2">
                    <svg className="h-5 w-5 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Referencias Originales (OE)
                  </h3>
                  <div className="rounded-xl border border-line bg-surface-1 p-4">
                    {product.oemRef && (
                      <div className="mb-4">
                         <span className="block text-xs font-semibold uppercase text-ink-faint mb-1">Referencia Principal OEN</span>
                         <span className="inline-block rounded bg-accent/10 px-2.5 py-1 text-sm font-mono-num font-bold text-accent-dark">
                           {product.oemRef}
                         </span>
                      </div>
                    )}
                    
                    {product.equivalentRefs && product.equivalentRefs.length > 0 && (
                      <div>
                        <span className="block text-xs font-semibold uppercase text-ink-faint mb-2">Equivalencias (Cross-Refs)</span>
                        <div className="flex flex-wrap gap-2">
                          {product.equivalentRefs.map((ref) => (
                            <span key={ref} className="rounded border border-line bg-surface-2 px-2 py-0.5 font-mono-num text-xs text-ink">
                              {ref}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Compatibilidad de vehículos */}
              <div className="mt-8">
                  <h3 className="font-display text-xl text-ink mb-4 flex items-center gap-2">
                    <svg className="h-5 w-5 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    Vehículos Compatibles
                  </h3>
                  <div className="rounded-xl border border-line bg-surface-1 p-5">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.compatibleWith?.map((car) => (
                        <li key={car} className="flex items-start gap-2 text-sm text-ink">
                          <svg className="h-4 w-4 shrink-0 text-success mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {car}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs text-ink-muted flex items-center gap-1.5 p-3 rounded-lg bg-surface-2">
                      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Esta es una lista resumida. Consulta a nuestros expertos por WhatsApp con tu bastidor para confirmar al 100%.
                    </p>
                  </div>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
