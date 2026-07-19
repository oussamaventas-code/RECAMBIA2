import Link from "next/link";
import { brands } from "@/data/brands";

// Cinta fina de marcas en marquee CSS puro (--animate-marquee en globals.css:
// translateX 0 → -50%, por eso el track lleva dos mitades idénticas).
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
              <Link
                href={`/resultados?marca=${brand.slug}`}
                className="whitespace-nowrap rounded-full border border-line bg-surface-2 px-4 py-1.5 text-sm text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                {brand.name}
              </Link>
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
        <Link
          href="/resultados"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
        >
          Ver todas las piezas
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
