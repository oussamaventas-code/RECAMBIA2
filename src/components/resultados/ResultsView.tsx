"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product, Vehicle } from "@/types";
import { categories } from "@/data/categories";
import { ProductCard } from "./ProductCard";

interface ResultsViewProps {
  products: Product[];
  vehicle: Vehicle | null;
  initialCategory?: string;
}

const PRICE_RANGES = [
  { label: "Todos los precios", min: 0, max: Infinity },
  { label: "Hasta 25 €", min: 0, max: 25 },
  { label: "25 – 100 €", min: 25, max: 100 },
  { label: "Más de 100 €", min: 100, max: Infinity },
];

export function ResultsView({ products, vehicle, initialCategory }: ResultsViewProps) {
  const [category, setCategory] = useState(initialCategory ?? "");
  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState(0);
  const [onlyTomorrow, setOnlyTomorrow] = useState(false);
  const [sortBy, setSortBy] = useState("recommended"); // recommended, priceAsc, priceDesc

  const brands = useMemo(
    () => [...new Set(products.map((p) => p.brand))].sort(),
    [products],
  );

  const filtered = useMemo(() => {
    const range = PRICE_RANGES[priceRange];
    const result = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!brand || p.brand === brand) &&
        p.price >= range.min &&
        p.price < range.max &&
        (!onlyTomorrow || p.deliveryTomorrow),
    );

    if (sortBy === "priceAsc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      result.sort((a, b) => b.price - a.price);
    } else {
      // recommended (sort by reviewCount / rating logic could go here)
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [products, category, brand, priceRange, onlyTomorrow, sortBy]);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_1fr]">
      {/* Sidebar Filters */}
      <aside aria-label="Filtros" className="lg:sticky lg:top-24 lg:self-start">
        <div className="glass-card flex flex-col gap-6 rounded-2xl p-6">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h3 className="font-display text-lg text-ink">Filtros</h3>
            <button
              onClick={() => {
                setCategory("");
                setBrand("");
                setPriceRange(0);
                setOnlyTomorrow(false);
              }}
              className="text-xs font-medium text-accent hover:text-accent-light transition-colors"
            >
              Limpiar
            </button>
          </div>

          <fieldset>
            <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Categoría
            </legend>
            <div className="flex flex-col gap-1.5">
              <FilterButton active={category === ""} onClick={() => setCategory("")}>
                Todas las categorías
              </FilterButton>
              {categories.map((c) => (
                <FilterButton
                  key={c.slug}
                  active={category === c.slug}
                  onClick={() => setCategory(c.slug)}
                >
                  {c.name}
                </FilterButton>
              ))}
            </div>
          </fieldset>

          <fieldset className="border-t border-line/50 pt-6">
            <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Marca
            </legend>
            <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              <FilterButton active={brand === ""} onClick={() => setBrand("")}>
                Todas las marcas
              </FilterButton>
              {brands.map((b) => (
                <FilterButton key={b} active={brand === b} onClick={() => setBrand(b)}>
                  {b}
                </FilterButton>
              ))}
            </div>
          </fieldset>

          <fieldset className="border-t border-line/50 pt-6">
            <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Precio
            </legend>
            <div className="flex flex-col gap-1.5">
              {PRICE_RANGES.map((r, i) => (
                <FilterButton
                  key={r.label}
                  active={priceRange === i}
                  onClick={() => setPriceRange(i)}
                >
                  {r.label}
                </FilterButton>
              ))}
            </div>
          </fieldset>

          <div className="border-t border-line/50 pt-6">
            <label className="group flex cursor-pointer items-center gap-3 text-sm text-ink hover:text-accent transition-colors">
              <div className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                onlyTomorrow ? "border-accent bg-accent text-white" : "border-line-strong bg-surface-2"
              }`}>
                {onlyTomorrow && (
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={onlyTomorrow}
                onChange={(e) => setOnlyTomorrow(e.target.checked)}
                className="hidden"
              />
              <span className="flex items-center gap-1.5">
                <span className="text-accent">⚡</span> Entrega mañana
              </span>
            </label>
          </div>
        </div>
      </aside>

      {/* Main Results Area */}
      <div>
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-mono-num text-sm text-ink-muted" role="status">
            <span className="rounded-md bg-accent/15 px-2 py-1 text-accent font-bold border border-accent/20">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "pieza encontrada" : "piezas encontradas"}
          </p>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-xs text-ink-muted uppercase tracking-wider font-semibold">
              Ordenar por:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-sm text-ink outline-none hover:border-line-strong focus:border-accent focus:ring-1 focus:ring-accent"
            >
              <option value="recommended">Recomendados</option>
              <option value="priceAsc">Precio: menor a mayor</option>
              <option value="priceDesc">Precio: mayor a menor</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-line bg-surface-1/50 p-12 text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-3 text-3xl">
              🔧
            </div>
            <p className="font-display text-xl text-ink">
              No hemos encontrado piezas con estos filtros
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm text-ink-muted">
              Prueba a quitar algún filtro o consúltanos directamente por WhatsApp. Si existe, te lo conseguimos.
            </p>
            <button
              onClick={() => {
                setCategory("");
                setBrand("");
                setPriceRange(0);
                setOnlyTomorrow(false);
              }}
              className="mt-6 rounded-xl bg-surface-3 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-line-strong"
            >
              Limpiar todos los filtros
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProductCard product={product} vehicle={vehicle} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-lg px-3 py-2 text-left text-sm transition-all ${
        active
          ? "bg-accent/15 font-semibold text-accent border border-accent/20"
          : "text-ink-muted hover:bg-surface-2 hover:text-ink border border-transparent"
      }`}
    >
      {children}
    </button>
  );
}
