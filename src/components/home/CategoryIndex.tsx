import Image from "next/image";
import { Reveal } from "@/components/shared/Reveal";
import { categories } from "@/data/categories";
import { whatsappGenericUrl } from "@/lib/whatsapp";

/* Fotos reales de categoría (sustituyen a los placeholders de IA). */
const CATEGORY_PHOTOS: Record<string, string> = {
  frenos: "/images/categorias/frenos.jpeg",
  filtros: "/images/categorias/filtros.jpeg",
  suspension: "/images/categorias/suspension.jpeg",
  motor: "/images/categorias/motor.jpeg",
  electrico: "/images/categorias/electrico.jpeg",
  transmision: "/images/categorias/transmision.jpeg",
  carroceria: "/images/categorias/carroceria.jpeg",
  climatizacion: "/images/categorias/climatizacion.jpeg",
  aceites: "/images/categorias/aceites.jpeg",
};

// Escaparate visual de categorías: no lleva a un catálogo navegable (no
// existe), cada tarjeta abre WhatsApp directamente con el tipo de pieza ya
// escrito para el recambista.
export function CategoryIndex() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal className="mb-10 flex items-baseline justify-between">
        <div>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Piezas destacadas</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Filtros, aceites, frenos y todo lo que tu coche necesite.
          </p>
        </div>
      </Reveal>

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, i) => {
          const photo = CATEGORY_PHOTOS[category.slug];
          return (
            <li key={category.slug}>
              <Reveal delay={(i % 3) * 0.05}>
                <a
                  href={whatsappGenericUrl(
                    `Hola, busco un recambio de ${category.name.toLowerCase()} para mi coche. ¿Me ayudáis?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-origen="categorias"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-1 transition-all duration-300 hover:glow-border hover:shadow-lg hover:shadow-accent/5"
                >
                  {/* Foto de categoría */}
                  <div className="relative h-44 w-full overflow-hidden bg-surface-2">
                    {photo && (
                      <Image
                        src={photo}
                        alt={category.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="font-display text-xl text-white drop-shadow-sm">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-sm leading-relaxed text-ink-muted">
                      {category.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      Consultar por WhatsApp
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </a>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
