"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { whatsappPlateUrl } from "@/lib/whatsapp";

interface VehicleBannerProps {
  plate: string | null;
}

export function VehicleBanner({ plate }: VehicleBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border-b border-line overflow-hidden relative ${
        plate ? "bg-surface-2" : "bg-surface-1"
      }`}
    >
      {plate && (
        <div className="absolute inset-0 bg-gradient-to-r from-success-glow via-transparent to-transparent pointer-events-none" />
      )}

      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-4 sm:px-6 relative">
        {plate ? (
          <>
            <span className="flex items-center gap-3 text-sm text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent shadow-sm shadow-accent/20">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </span>
              <span className="font-semibold text-base">Buscando piezas para tu matrícula</span>
            </span>
            <span className="rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1.5 font-mono-num text-xs font-bold tracking-[0.15em] text-accent">
              {plate}
            </span>
            <span className="hidden text-sm text-ink-muted sm:inline ml-2 border-l border-line pl-4">
              Confírmanos la pieza por WhatsApp y te decimos si encaja
            </span>
            <a
              href={whatsappPlateUrl(plate)}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-2 rounded-lg bg-success px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-success-glow"
            >
              Confirmar por WhatsApp
            </a>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg bg-surface-3 px-3 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-ink hover:bg-line-strong"
            >
              Cambiar matrícula
            </Link>
          </>
        ) : (
          <>
            <span className="flex items-center gap-2 text-sm text-ink-muted">
              <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Estás viendo nuestro escaparate de piezas. Sin matrícula indicada.
            </span>
            <Link
              href="/"
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-accent bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent hover:bg-accent/20 transition-colors"
            >
              Buscar con mi matrícula →
            </Link>
          </>
        )}
      </div>
    </motion.div>
  );
}
