"use client";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

// Mock user's garage
const MOCK_GARAGE = [
  {
    id: "car1",
    plate: "8472 KZM",
    make: "Seat",
    model: "Leon",
    engine: "1.5 TSI",
    year: 2020,
    color: "Blanco",
    lastService: "02/05/2026",
    alerts: 1, // Ej: Pastillas desgastadas
    slug: "seat/leon",
  },
  {
    id: "car2",
    plate: "1033 FLX",
    make: "Audi",
    model: "A3",
    engine: "2.0 TDI",
    year: 2007,
    color: "Negro",
    lastService: "15/11/2025",
    alerts: 0,
    slug: "audi/a3",
  },
];

export default function MiGarajePage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-paper py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <header className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-4xl font-bold text-ink">Mi Garaje</h1>
              <p className="mt-2 text-ink-muted">
                Gestiona tus vehículos para encontrar recambios compatibles al instante.
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 font-semibold text-white transition-all hover:bg-accent-dark shadow-lg shadow-accent/20 active:scale-[0.98] shrink-0">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Añadir vehículo
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_GARAGE.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-1 shadow-sm transition-all hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5"
              >
                {/* Decorative header */}
                <div className="h-24 bg-gradient-to-r from-surface-3 to-surface-2 p-5 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 opacity-10">
                    <svg className="h-32 w-32" fill="currentColor" viewBox="0 0 24 24">
                      {/* Generic car icon path */}
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                    </svg>
                  </div>
                  {/* Plate */}
                  <div className="inline-flex items-center gap-2 rounded bg-white px-3 py-1 border-2 border-blue-600 shadow-sm">
                    <div className="flex flex-col items-center justify-center bg-blue-600 px-1.5 py-0.5 text-white">
                      <span className="text-[8px] font-bold leading-none">E</span>
                    </div>
                    <span className="font-mono text-lg font-bold tracking-widest text-black">
                      {car.plate}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4">
                    <h3 className="font-display text-2xl font-bold text-ink leading-tight">
                      {car.make} {car.model}
                    </h3>
                    <p className="text-sm font-semibold text-ink-muted mt-1">
                      {car.engine} • {car.year}
                    </p>
                  </div>

                  {/* Status badges */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 text-xs text-ink-muted border border-line">
                       <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                       </svg>
                       Última rev: {car.lastService}
                    </span>
                    {car.alerts > 0 && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-danger/10 px-2.5 py-1 text-xs font-semibold text-danger border border-danger/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-danger animate-pulse" />
                        Revisión recomendada
                      </span>
                    )}
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <Link
                      href={`/resultados?plate=${car.plate.replace(/\s/g, "")}`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-accent hover:shadow-lg hover:shadow-accent/20 active:scale-[0.98]"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Buscar recambios
                    </Link>
                    
                    <Link
                      href="/talleres-asociados"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface-1 px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:bg-surface-2"
                    >
                      <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Pedir cita en taller
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Empty Add Car Slot */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <button className="flex h-full min-h-[320px] w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-line bg-surface-1/50 transition-colors hover:border-accent/50 hover:bg-surface-2 group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 text-ink-faint group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="font-semibold text-ink-muted group-hover:text-ink">Registrar nuevo vehículo</span>
              </button>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
