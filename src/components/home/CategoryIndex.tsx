import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import { categories } from "@/data/categories";

/* Iconos de categoría (line-art propio, coherente y sin fotos de IA). Cuando
   haya foto REAL de estudio por categoría, se puede volver a mostrar aquí. */
const ICONS: Record<string, React.ReactNode> = {
  frenos: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M18 6l-1.4 1.4M6 18l1.4-1.4M18 18l-1.4-1.4" />
    </>
  ),
  filtros: (
    <>
      <rect x="7" y="4" width="10" height="16" rx="2" />
      <path d="M7 8.5h10M7 12h10M7 15.5h10" />
    </>
  ),
  suspension: (
    <>
      <path d="M8 4h8M8 20h8" />
      <path d="M15 4v1l-6 2 6 2-6 2 6 2-6 2 6 2v1" />
    </>
  ),
  motor: (
    <>
      <path d="M4 13.5v-3h2l1.5-2H11l1.5-1.5H16v3h2.5L21 12v3a1 1 0 0 1-1 1h-1v1.5h-2V16H9v1.5H7V16H6a2 2 0 0 1-2-2z" />
      <path d="M16 5.5h3" />
    </>
  ),
  electrico: (
    <>
      <rect x="3" y="7" width="18" height="11" rx="2" />
      <path d="M7 7V5M17 7V5" />
      <path d="M12.5 9.5L10 13h2l-1 3 3.2-4H12z" />
    </>
  ),
  transmision: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.4l1.2 2 2.4-.4.4 2.4 2.2.9-.8 2.3 1.6 1.8-1.6 1.8.8 2.3-2.2.9-.4 2.4-2.4-.4L12 21.6l-1.2-2-2.4.4-.4-2.4-2.2-.9.8-2.3L3.8 12l1.6-1.8-.8-2.3 2.2-.9.4-2.4 2.4.4z" />
    </>
  ),
  carroceria: (
    <>
      <path d="M4 16v-3.2l1.6-4A2 2 0 0 1 7.5 7.5h9a2 2 0 0 1 1.9 1.3l1.6 4V16" />
      <path d="M3.5 16h17" />
      <circle cx="8" cy="16.5" r="1.6" />
      <circle cx="16" cy="16.5" r="1.6" />
    </>
  ),
  climatizacion: (
    <>
      <path d="M12 2.5v19M3.8 7.2l16.4 9.6M20.2 7.2L3.8 16.8" />
      <path d="M9.5 4l2.5 1.6L14.5 4M9.5 20l2.5-1.6 2.5 1.6" />
    </>
  ),
  aceites: (
    <path d="M12 3.5s6 6.5 6 10.5a6 6 0 0 1-12 0c0-4 6-10.5 6-10.5z" />
  ),
};

function CategoryIcon({ slug }: { slug: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-12 w-12"
      aria-hidden="true"
    >
      {ICONS[slug] ?? <rect x="5" y="5" width="14" height="14" rx="3" />}
    </svg>
  );
}

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
        {categories.map((category, i) => (
          <li key={category.slug}>
            <Reveal delay={(i % 3) * 0.05}>
              <Link
                href={`/resultados?categoria=${category.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-1 transition-all duration-300 hover:glow-border hover:shadow-lg hover:shadow-accent/5"
              >
                {/* Panel con icono (sustituye a la foto de IA) */}
                <div className="relative flex h-36 items-center justify-center overflow-hidden border-b border-line bg-gradient-to-br from-surface-2 to-surface-1">
                  <div
                    className="pointer-events-none absolute h-24 w-24 rounded-full bg-accent/10 blur-2xl transition-transform duration-500 group-hover:scale-125"
                    aria-hidden="true"
                  />
                  <span className="relative text-accent transition-transform duration-500 group-hover:scale-110">
                    <CategoryIcon slug={category.slug} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg text-ink transition-colors group-hover:text-accent">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    {category.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Ver piezas
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
