"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { brands } from "@/data/brands";

/* ─── Animation variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
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

export function BrandIndex() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-baseline justify-between mb-10"
      >
        <div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">
            Marcas que trabajamos
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Solo distribuimos recambio original y primeras marcas de confianza.
          </p>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {brands.map((brand) => (
          <motion.li key={brand.slug} variants={itemVariants}>
            <Link
              href={`/resultados?marca=${brand.slug}`}
              className="group relative flex h-24 flex-col items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface-1 transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/5"
            >
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-ink/70 transition-colors duration-300 group-hover:text-accent">
                {brand.name}
              </h3>
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-accent/5 to-transparent z-10" />
            </Link>
          </motion.li>
        ))}
      </motion.ul>
      
      <div className="mt-10 flex justify-center">
        <Link
          href="/resultados"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
        >
          Ver catálogo completo
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
