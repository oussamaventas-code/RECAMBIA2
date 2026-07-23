import { brands } from "@/data/brands";
import { whatsappGenericUrl } from "@/lib/whatsapp";

// Cinta fina de marcas en marquee CSS puro (--animate-marquee en globals.css:
// translateX 0 → -50%, por eso el track lleva dos mitades idénticas). Cada
// marca abre WhatsApp con el mensaje ya escrito en vez de enlazar a un
// catálogo navegable (no existe).
export function BrandIndex() {
  return (
    <section className="overflow-hidden border-b border-line bg-surface-1 py-5">
      <p className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-ink-faint">
        Marcas que trabajamos
      </p>

      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <ul className="flex shrink-0 items-center gap-3 pr-3">
          {brands.map((brand) => (
            <li key={brand.slug}>
              <a
                href={whatsappGenericUrl(
                  `Hola, busco una pieza de la marca ${brand.name}. ¿Me ayudáis?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-origen="marcas"
                className="whitespace-nowrap rounded-full border border-line bg-surface-2 px-4 py-1.5 text-sm text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                {brand.name}
              </a>
            </li>
          ))}
        </ul>
        {/* Clon para el bucle continuo: sin links duplicados para el teclado */}
        <ul aria-hidden="true" className="flex shrink-0 items-center gap-3 pr-3 motion-reduce:hidden">
          {brands.map((brand) => (
            <li key={brand.slug}>
              <span className="whitespace-nowrap rounded-full border border-line bg-surface-2 px-4 py-1.5 text-sm text-ink-muted">
                {brand.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex justify-center">
        <a
          href={whatsappGenericUrl("Hola, quiero información sobre una pieza.")}
          target="_blank"
          rel="noopener noreferrer"
          data-origen="marcas"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
        >
          Pregúntanos por WhatsApp
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
