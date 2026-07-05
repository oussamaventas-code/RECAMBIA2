"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";

/* ─── SVG icons (32×32, stroke-based, currentColor) ─── */
const categoryIcons: Record<string, React.ReactNode> = {
  frenos: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="12" />
      <circle cx="16" cy="16" r="5" />
      <circle cx="16" cy="16" r="2" />
      <line x1="16" y1="4" x2="16" y2="8" />
      <line x1="16" y1="24" x2="16" y2="28" />
      <line x1="4" y1="16" x2="8" y2="16" />
      <line x1="24" y1="16" x2="28" y2="16" />
    </svg>
  ),
  filtros: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="4,5 28,5 18,18 18,27 14,27 14,18" />
    </svg>
  ),
  suspension: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 4 L10 8 L6 11 L10 14 L6 17 L10 20 L6 23 L10 26 L10 28" />
      <line x1="22" y1="4" x2="22" y2="12" />
      <rect x="18" y="12" width="8" height="12" rx="1" />
      <line x1="22" y1="24" x2="22" y2="28" />
    </svg>
  ),
  motor: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="10" />
      <circle cx="16" cy="16" r="4" />
      <path d="M16 2 L16 6" />
      <path d="M16 26 L16 30" />
      <path d="M2 16 L6 16" />
      <path d="M26 16 L30 16" />
      <path d="M5.9 5.9 L8.7 8.7" />
      <path d="M23.3 23.3 L26.1 26.1" />
      <path d="M26.1 5.9 L23.3 8.7" />
      <path d="M8.7 23.3 L5.9 26.1" />
    </svg>
  ),
  electrico: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18,3 10,17 16,17 14,29 22,15 16,15 18,3" />
    </svg>
  ),
  transmision: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <circle cx="11" cy="11" r="2.5" />
      <circle cx="23" cy="21" r="5" />
      <circle cx="23" cy="21" r="2" />
      <path d="M11 4 L11 7" />
      <path d="M11 15 L11 18" />
      <path d="M4 11 L7 11" />
      <path d="M15 11 L18 11" />
    </svg>
  ),
  carroceria: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20 L6 12 L12 8 L22 8 L27 12 L29 20" />
      <line x1="2" y1="20" x2="30" y2="20" />
      <circle cx="9" cy="23" r="3" />
      <circle cx="23" cy="23" r="3" />
      <line x1="12" y1="20" x2="12" y2="23" />
      <line x1="20" y1="20" x2="20" y2="23" />
    </svg>
  ),
  climatizacion: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16" y1="3" x2="16" y2="29" />
      <polyline points="10,9 16,3 22,9" />
      <path d="M16 9 L22 12" />
      <path d="M16 15 L10 12" />
      <path d="M16 15 L22 18" />
      <path d="M16 21 L10 18" />
      <path d="M16 21 L22 24" />
      <path d="M16 27 L10 24" />
    </svg>
  ),
};

/* ─── Animation variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/* ─── Component ─── */
export function CategoryIndex() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-baseline justify-between mb-10"
      >
        <h2 className="font-display text-3xl sm:text-4xl text-ink">
          Catálogo
        </h2>
        <span className="font-mono-num text-sm text-accent font-semibold">
          +500.000 referencias
        </span>
      </motion.div>

      {/* Grid */}
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {categories.map((category) => (
          <motion.li key={category.slug} variants={itemVariants}>
            <Link
              href={`/resultados?categoria=${category.slug}`}
              className="group relative flex flex-col gap-3 rounded-xl border border-line bg-surface-1 p-5 transition-all duration-300 hover:glow-border hover:shadow-lg hover:shadow-accent/5"
            >
              {/* Icon */}
              <span className="text-accent transition-transform duration-300 group-hover:scale-110 origin-top-left">
                {categoryIcons[category.slug] ?? (
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="6" y="6" width="20" height="20" rx="3" />
                    <line x1="6" y1="16" x2="26" y2="16" />
                    <line x1="16" y1="6" x2="16" y2="26" />
                  </svg>
                )}
              </span>

              {/* Category name */}
              <h3 className="font-display text-lg text-ink transition-colors group-hover:text-accent">
                {category.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-ink-muted leading-relaxed line-clamp-2">
                {category.description}
              </p>

              {/* Ref count badge */}
              <span className="mt-auto self-end font-mono-num text-xs text-accent font-semibold">
                {category.refCount.toLocaleString("es-ES")} refs
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
