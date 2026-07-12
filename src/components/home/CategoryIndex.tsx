"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";

/* ─── Premium category images (PNG for categories with photos, SVG fallback) ─── */
const categoryImages: Record<string, { src: string; isPng: boolean }> = {
  frenos: { src: "/images/categorias/frenos.png", isPng: true },
  filtros: { src: "/images/categorias/filtros.png", isPng: true },
  suspension: { src: "/images/categorias/suspension.png", isPng: true },
  motor: { src: "/images/categorias/motor.png", isPng: true },
  electrico: { src: "/images/categorias/electrico.png", isPng: true },
  transmision: { src: "/images/categorias/transmision.png", isPng: true },
  carroceria: { src: "/images/categorias/carroceria.png", isPng: true },
  climatizacion: { src: "/images/categorias/climatizacion.png", isPng: true },
  aceites: { src: "/images/categorias/aceites.png", isPng: true },
};

/* ─── Fallback SVG icon for categories without image ─── */
function FallbackIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-ink-faint"
    >
      <rect x="6" y="6" width="20" height="20" rx="3" />
      <line x1="6" y1="16" x2="26" y2="16" />
      <line x1="16" y1="6" x2="16" y2="26" />
    </svg>
  );
}

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
        <div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">
            Piezas destacadas
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Filtros, aceites, frenos y todo lo que tu coche necesite.
          </p>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {categories.map((category) => {
          const image = categoryImages[category.slug];
          return (
            <motion.li key={category.slug} variants={itemVariants}>
              <Link
                href={`/resultados?categoria=${category.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-1 transition-all duration-300 hover:glow-border hover:shadow-lg hover:shadow-accent/5"
              >
                {/* Image area */}
                <div className="relative h-44 w-full overflow-hidden bg-surface-2">
                  {image?.isPng ? (
                    <Image
                      src={image.src}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : image ? (
                    <div className="flex h-full w-full items-center justify-center">
                      <Image
                        src={image.src}
                        alt={category.name}
                        width={80}
                        height={80}
                        className="h-20 w-20 opacity-40"
                      />
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <FallbackIcon />
                    </div>
                  )}

                  {/* Dark gradient overlay for text readability on PNG */}
                  {image?.isPng && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  )}

                  {/* Category name overlay on image */}
                  {image?.isPng && (
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-display text-xl text-white drop-shadow-lg">
                        {category.name}
                      </h3>
                    </div>
                  )}
                </div>

                {/* Text area */}
                <div className="p-5">
                  {!image?.isPng && (
                    <h3 className="font-display text-lg text-ink mb-1 transition-colors group-hover:text-accent">
                      {category.name}
                    </h3>
                  )}

                  {/* Description */}
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {category.description}
                  </p>

                  {/* CTA hint */}
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Ver piezas
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
