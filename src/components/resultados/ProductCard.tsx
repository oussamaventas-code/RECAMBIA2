"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { categoryImage } from "@/lib/category-image";

interface ProductCardProps {
  product: Product;
  plate?: string | null;
}

export function ProductCard({ product, plate }: ProductCardProps) {
  const productHref = plate
    ? `/producto/${product.slug}?matricula=${encodeURIComponent(plate)}`
    : `/producto/${product.slug}`;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-1 transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5"
    >
      {/* Image */}
      <Link
        href={productHref}
        className="relative flex h-52 items-center justify-center bg-gradient-to-br from-surface-2 via-surface-1 to-surface-2 overflow-hidden"
      >
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
            className="object-contain p-4 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          />
        ) : categoryImage(product.category) ? (
          <Image
            src={categoryImage(product.category)!}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
            className="object-contain p-6 opacity-80 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-2 border border-line group-hover:border-accent/30 transition-all"
          >
            <span className="font-display text-4xl text-ink-faint/50 group-hover:text-accent/40 transition-colors">
              {product.brand.charAt(0)}
            </span>
          </motion.div>
        )}

        {/* Shimmer on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-accent/5 to-transparent z-10" />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Brand + pack badge */}
        <div className="flex items-center gap-2">
          <p className="text-[11px] uppercase tracking-wider text-ink-faint font-semibold">
            {product.brand}
          </p>
          {product.isPack && (
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
              Pack genérico
            </span>
          )}
        </div>

        {/* Name */}
        <Link href={productHref} className="mt-2">
          <h3 className="text-sm font-semibold text-ink transition-colors group-hover:text-accent line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* OEM Ref chip */}
        <div className="mt-2 flex items-center gap-1.5">
          <span className="inline-flex items-center rounded-md bg-surface-2 px-2 py-0.5 font-mono-num text-[11px] text-ink-muted border border-line/50">
            {product.oemRef}
          </span>
        </div>

        {/* Plate-aware nudge */}
        {plate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 flex items-center gap-1.5 text-xs text-accent bg-accent/10 px-2.5 py-1.5 rounded-lg border border-accent/20"
          >
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            ¿Encaja en tu {plate}? Confírmalo por WhatsApp
          </motion.div>
        )}

        <div className="mt-auto pt-4">
          {/* Installation Badge */}
          <Link href={productHref} className="mb-4 flex items-center gap-2 rounded-lg bg-surface-2 p-2 border border-line hover:border-accent transition-colors">
            <svg className="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-[11px] text-ink-muted">
              Montaje en taller disponible — <strong className="text-ink">pregúntanos</strong>
            </span>
          </Link>

          {/* CTA Button */}
          <Link
            href={productHref}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-dark active:scale-[0.98]"
          >
            Ver Ficha Técnica
          </Link>
          <p className="mt-2 text-center text-[10px] text-ink-faint">
            Precio y disponibilidad, en &lt;2h por WhatsApp
          </p>
        </div>
      </div>
    </motion.article>
  );
}
