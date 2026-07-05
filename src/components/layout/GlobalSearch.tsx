"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { searchProducts } from "@/data/products";
import type { Product } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 1) {
      const found = searchProducts(query);
      setResults(found);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-lg hidden md:block" ref={wrapperRef}>
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por referencia OEM, nombre o coche..."
          className="w-full rounded-full border border-line bg-surface-2 py-2 pl-10 pr-4 text-sm text-ink outline-none transition-all focus:border-accent focus:bg-surface-1 focus:ring-2 focus:ring-accent/20 placeholder:text-ink-faint"
          onFocus={() => {
            if (query.length > 1) setIsOpen(true);
          }}
        />
        <svg
          className="absolute left-3.5 h-4 w-4 text-ink-faint"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        
        {query && (
          <button
            onClick={() => { setQuery(""); setIsOpen(false); }}
            className="absolute right-3.5 text-ink-faint hover:text-ink"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border border-line bg-surface-1 shadow-2xl shadow-ink/10 overflow-hidden"
          >
            {results.length > 0 ? (
              <ul className="max-h-96 overflow-y-auto p-2">
                {results.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/producto/${product.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 rounded-xl p-3 hover:bg-surface-2 transition-colors"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface-2 p-1 border border-line">
                        {product.images[0] ? (
                          <img src={product.images[0]} alt={product.name} className="h-full w-full object-contain mix-blend-multiply" />
                        ) : (
                          <span className="font-display text-lg text-ink-faint/60" aria-hidden="true">
                            {product.brand.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="truncate text-sm font-semibold text-ink">{product.name} - {product.brand}</h4>
                        <div className="flex items-center gap-2 text-xs text-ink-muted">
                          {product.oemRef && <span className="rounded bg-surface-3 px-1.5 py-0.5 font-mono">OEM: {product.oemRef}</span>}
                          <span className="truncate">{product.category}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="block text-sm font-bold text-accent">{product.price.toFixed(2)}€</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-sm text-ink-muted">
                No hemos encontrado piezas para &ldquo;{query}&rdquo;. Prueba con otra referencia OEM.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
