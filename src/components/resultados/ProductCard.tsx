"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product, Vehicle } from "@/types";

const STOCK_LABEL: Record<Product["stock"], { text: string; color: string; glow: string }> = {
  alto: { text: "En stock", color: "bg-success", glow: "shadow-success/30" },
  bajo: { text: "Últimas unidades", color: "bg-warning", glow: "shadow-warning/30" },
  agotado: { text: "Bajo pedido", color: "bg-danger", glow: "shadow-danger/30" },
};

export function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "xs" }) {
  const px = size === "sm" ? "h-3.5 w-3.5" : "h-3 w-3";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${px} ${star <= Math.round(rating) ? "text-accent" : "text-line-strong"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  vehicle?: Vehicle | null;
}

export function ProductCard({ product, vehicle }: ProductCardProps) {
  const stock = STOCK_LABEL[product.stock];

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-1 transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5"
    >
      {/* Image / Brand Placeholder */}
      <Link
        href={`/producto/${product.slug}`}
        className="relative flex h-52 items-center justify-center bg-gradient-to-br from-surface-2 via-surface-1 to-surface-2 overflow-hidden"
      >
        {/* Brand initial with glow */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-2 border border-line group-hover:border-accent/30 transition-all"
        >
          <span className="font-display text-4xl text-ink-faint/50 group-hover:text-accent/40 transition-colors">
            {product.brand.charAt(0)}
          </span>
        </motion.div>

        {/* Delivery badge */}
        {product.deliveryTomorrow && (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1.5 text-xs font-semibold text-success border border-success/20 backdrop-blur-sm">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            24h
          </span>
        )}

        {/* Discount badge */}
        {product.compareAtPrice && (
          <span className="absolute right-3 top-3 rounded-full bg-danger/15 px-3 py-1.5 font-mono-num text-xs font-bold text-danger border border-danger/20 backdrop-blur-sm">
            −{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
          </span>
        )}

        {/* Shimmer on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-accent/5 to-transparent" />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Brand */}
        <p className="text-[11px] uppercase tracking-wider text-ink-faint font-semibold">
          {product.brand}
        </p>

        {/* Name */}
        <Link href={`/producto/${product.slug}`} className="mt-2">
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

        {/* Compatibility badge */}
        {vehicle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 flex items-center gap-1.5 text-xs text-success bg-success/10 px-2.5 py-1.5 rounded-lg border border-success/20"
          >
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Compatible con tu {vehicle.make} {vehicle.model}
          </motion.div>
        )}

        {/* Price + Stock + Rating */}
        <div className="mt-auto pt-4">
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-mono-num text-2xl font-extrabold text-ink">
              {product.price.toFixed(2).replace(".", ",")}
              <span className="text-base ml-0.5">€</span>
            </span>
            {product.compareAtPrice && (
              <span className="font-mono-num text-xs text-ink-faint line-through">
                {product.compareAtPrice.toFixed(2).replace(".", ",")} €
              </span>
            )}
          </div>

          {/* Stock + Rating row */}
          <div className="mb-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${stock.color} ${
                  product.stock !== "agotado" ? "animate-pulse-led" : ""
                }`}
              />
              <span className="text-ink-muted">{stock.text}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <StarRating rating={product.rating} size="xs" />
              <span className="font-mono-num text-ink-faint">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Installation Badge */}
          <Link href={`/producto/${product.slug}`} className="mb-4 flex items-center gap-2 rounded-lg bg-surface-2 p-2 border border-line hover:border-accent transition-colors">
            <svg className="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-[11px] text-ink-muted">
              Montaje disponible desde <strong className="text-ink">30€</strong>
            </span>
          </Link>

          {/* CTA Button */}
          <Link
            href={`/producto/${product.slug}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-dark active:scale-[0.98]"
          >
            Ver Ficha Técnica
          </Link>
          <p className="mt-2 text-center text-[10px] text-ink-faint">
            Confirmación en &lt;2h por WhatsApp
          </p>
        </div>
      </div>
    </motion.article>
  );
}
