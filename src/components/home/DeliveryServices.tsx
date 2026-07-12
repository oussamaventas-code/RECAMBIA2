import React from "react";

export function DeliveryServices() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-surface-2 py-24">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface-1 via-surface-2 to-surface-2" />
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Llegamos a ti, estés donde estés
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Opciones de envío flexibles para que tengas tus recambios en el taller o en casa justo cuando los necesitas.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Nacional */}
          <div className="group relative overflow-hidden rounded-3xl bg-surface-1 border border-line p-8 transition-all hover:border-accent hover:shadow-2xl hover:shadow-accent/10 flex flex-col">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent group-hover:scale-110 transition-transform duration-300">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-ink mb-3">Envíos a toda España</h3>
            <p className="text-ink-muted leading-relaxed mb-6 flex-1">
              Trabajamos con las mejores agencias de paquetería para llegar a cualquier punto de la península en tiempo récord.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-md bg-surface-2 border border-line px-3 py-1.5 text-sm font-semibold text-ink">
                24h si está en stock
              </span>
              <span className="inline-flex items-center rounded-md bg-surface-2 border border-line px-3 py-1.5 text-sm font-semibold text-ink">
                48h si la traemos del proveedor
              </span>
            </div>
          </div>

          {/* Premium */}
          <div className="group relative overflow-hidden rounded-3xl bg-surface-1 border border-line p-8 transition-all hover:border-accent hover:shadow-2xl hover:shadow-accent/10 flex flex-col">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-warning/10 text-warning group-hover:scale-110 transition-transform duration-300">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-ink mb-3">Servicio Urgente</h3>
            <p className="text-ink-muted leading-relaxed mb-6 flex-1">
              ¿El coche está ocupando el elevador y necesitas la pieza ya? Pide el servicio premium para ser el primero en recibirlo.
            </p>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-warning px-4 py-2 text-sm font-bold text-white shadow-sm shadow-warning/20">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Antes de las 10:00
              </span>
            </div>
          </div>

          {/* Murcia */}
          <div className="group relative overflow-hidden rounded-3xl bg-surface-1 border border-line p-8 transition-all hover:border-accent hover:shadow-2xl hover:shadow-accent/10 flex flex-col">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-success/10 text-success group-hover:scale-110 transition-transform duration-300">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-ink mb-3">Reparto propio en Murcia</h3>
            <p className="text-ink-muted leading-relaxed flex-1">
              Si tu taller o domicilio está en la Región de Murcia, te lo llevamos nosotros mismos con nuestra flota. Trato directo, rápido y de confianza.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
