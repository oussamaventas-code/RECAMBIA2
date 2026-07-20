"use client";

import { Reveal } from "@/components/shared/Reveal";

/* Solo cifras reales o promesas de servicio que RECAMBIA puede sostener.
   NADA de reseñas, ratings de Google ni pedidos inventados: eso llega cuando
   haya datos reales (y evita baneos de la cuenta de ads y problemas legales). */

const metrics = [
  {
    value: "15+",
    label: "Años de experiencia",
    description: "Del equipo en el recambio",
  },
  {
    value: "4",
    label: "Recambistas expertos",
    description: "Te atienden directamente",
  },
  {
    value: "24h",
    label: "Entrega en España",
    description: "Si pides antes de las 17:00",
  },
  {
    value: "0 €",
    label: "Si la pieza no encaja",
    description: "Solo pagas si es compatible",
  },
];

export function TrustMetrics() {
  return (
    <section className="bg-paper py-16 sm:py-24 border-t border-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:items-center">

          {/* Compromiso — reemplaza al rating de Google inventado */}
          <Reveal className="flex flex-col rounded-3xl bg-surface-1 p-8 sm:p-10 border border-line shadow-sm lg:col-span-2">
            <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </span>
            <h3 className="font-display text-2xl font-bold text-ink">Nuestro compromiso</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Confirmamos que la pieza es la correcta para tu coche{" "}
              <strong className="font-semibold text-ink">antes de que pagues</strong>. Si nos
              equivocamos nosotros, lo solucionamos nosotros. Sin letra pequeña.
            </p>
          </Reveal>

          {/* Cifras reales */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-3">
            {metrics.map((metric, i) => (
              <Reveal
                key={metric.label}
                delay={i * 0.1}
                className="flex flex-col justify-center rounded-3xl bg-surface-2 p-6 sm:p-8 text-center"
              >
                <span className="font-display text-4xl font-bold text-accent sm:text-5xl mb-2">
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
