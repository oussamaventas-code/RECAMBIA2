"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Vehicle } from "@/types";
import { vehicleLabel } from "@/data/vehicles";

interface VehicleBannerProps {
  vehicle: Vehicle | null;
}

export function VehicleBanner({ vehicle }: VehicleBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border-b border-line overflow-hidden relative ${
        vehicle
          ? "bg-surface-2"
          : "bg-surface-1"
      }`}
    >
      {vehicle && (
        <div className="absolute inset-0 bg-gradient-to-r from-success-glow via-transparent to-transparent pointer-events-none" />
      )}
      
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-4 sm:px-6 relative">
        {vehicle ? (
          <>
            <span className="flex items-center gap-3 text-sm text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success/20 text-success shadow-sm shadow-success/30">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="font-semibold text-base">{vehicleLabel(vehicle)}</span>
            </span>
            <span className="rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1.5 font-mono-num text-xs font-bold tracking-[0.15em] text-accent">
              {vehicle.plate}
            </span>
            <span className="hidden text-sm text-ink-muted sm:inline ml-2 border-l border-line pl-4">
              ✅ Piezas 100% compatibles verificadas
            </span>
            <Link
              href="/"
              className="ml-auto flex items-center gap-2 rounded-lg bg-surface-3 px-3 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-ink hover:bg-line-strong"
            >
              Cambiar vehículo
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </Link>
          </>
        ) : (
          <>
            <span className="flex items-center gap-2 text-sm text-ink-muted">
              <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Estás viendo el catálogo completo. Sin vehículo seleccionado.
            </span>
            <Link
              href="/"
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-accent bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent hover:bg-accent/20 transition-colors"
            >
              Identificar mi coche →
            </Link>
          </>
        )}
      </div>
    </motion.div>
  );
}
