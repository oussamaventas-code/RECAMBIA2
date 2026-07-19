"use client";

import { Reveal } from "@/components/shared/Reveal";

const metrics = [
  {
    value: "+10k",
    label: "Pedidos entregados",
    description: "En toda la península",
  },
  {
    value: "98%",
    label: "Clientes satisfechos",
    description: "Según encuestas posventa",
  },
  {
    value: "+500k",
    label: "Referencias",
    description: "De primeros equipos",
  },
  {
    value: "15+",
    label: "Años de experiencia",
    description: "En el sector del recambio",
  },
];

export function TrustMetrics() {
  return (
    <section className="bg-paper py-16 sm:py-24 border-t border-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-center">
          
          {/* Main Google Rating Card */}
          <Reveal className="lg:col-span-2 flex flex-col rounded-3xl bg-surface-1 p-8 sm:p-10 border border-line shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <svg className="h-8 w-8 text-ink" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <h3 className="font-display text-2xl font-bold text-ink">Reseñas de clientes</h3>
            </div>
            
            <div className="flex items-end gap-3 mb-2">
              <span className="font-display text-5xl text-ink">4.9</span>
              <div className="flex items-center gap-1 text-warning mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">
              Basado en cientos de compras verificadas. No fallamos.
            </p>
          </Reveal>

          {/* Grid of stats */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4 sm:gap-6">
            {metrics.map((metric, i) => (
              <Reveal
                key={metric.label}
                delay={i * 0.1}
                className="flex flex-col justify-center rounded-3xl bg-surface-2 p-6 sm:p-8 text-center"
              >
                <span className="font-display text-4xl sm:text-5xl font-bold text-accent mb-2">
                  {metric.value}
                </span>
                <span className="font-semibold text-ink mb-1">{metric.label}</span>
                <span className="text-xs text-ink-muted">{metric.description}</span>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
