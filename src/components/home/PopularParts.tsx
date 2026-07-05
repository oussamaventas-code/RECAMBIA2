"use client";

import Link from "next/link";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import { ProductCard } from "@/components/resultados/ProductCard";

/* ─── Chevron SVG icons ─── */
function ChevronLeft() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="13 4 7 10 13 16" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="7 4 13 10 7 16" />
    </svg>
  );
}

/* ─── Component ─── */
export function PopularParts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const popular = [...products]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 8);

  /* ── Update arrow visibility based on scroll position ── */
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  /* ── Scroll by one card width ── */
  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 300;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-baseline justify-between mb-8"
      >
        <h2 className="font-display text-3xl sm:text-4xl text-ink">
          Lo más pedido
        </h2>
        <Link
          href="/resultados"
          className="text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
        >
          Ver todo →
        </Link>
      </motion.div>

      {/* Carousel wrapper */}
      <div className="group/carousel relative">
        {/* Left arrow */}
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              key="arrow-left"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={() => scroll("left")}
              aria-label="Desplazar a la izquierda"
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-3 hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface-2/90 backdrop-blur text-ink-muted transition-all hover:text-ink hover:border-accent hover:shadow-lg hover:shadow-accent/10 opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
            >
              <ChevronLeft />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Right arrow */}
        <AnimatePresence>
          {canScrollRight && (
            <motion.button
              key="arrow-right"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={() => scroll("right")}
              aria-label="Desplazar a la derecha"
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-3 hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface-2/90 backdrop-blur text-ink-muted transition-all hover:text-ink hover:border-accent hover:shadow-lg hover:shadow-accent/10 opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
            >
              <ChevronRight />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {popular.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="min-w-[280px] max-w-[300px] flex-shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Fade edges */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-paper to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-paper to-transparent"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
