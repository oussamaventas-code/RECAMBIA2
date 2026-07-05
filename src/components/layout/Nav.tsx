"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlateSearch } from "@/components/matricula/PlateSearch";
import { categories } from "@/data/categories";
import { GlobalSearch } from "./GlobalSearch";

const LINKS = [
  { href: "/resultados", label: "Catálogo", isMegaMenu: true },
  { href: "/diagnostico", label: "Diagnóstico", isMegaMenu: false },
  { href: "/talleres-asociados", label: "Talleres", isMegaMenu: false },
];

export function Nav({ showPlate = false }: { showPlate?: boolean }) {
  const [scrolled, setScrolled] = useState(showPlate);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  useEffect(() => {
    if (showPlate) return;
    function onScroll() {
      setScrolled(window.scrollY > 320);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showPlate]);

  return (
    <>
      {/* Top bar (hidden on mobile) */}
      <div className="hidden bg-header py-1.5 text-xs text-ink-faint md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="text-accent">⚡</span> Envío GRATIS en pedidos +60€
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-accent">↩</span> Devolución 30 días
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-accent">🇪🇸</span> Stock real en España
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+34600000000" className="hover:text-ink transition-colors">
              📞 600 00 00 00
            </a>
            <Link href="/ayuda" className="hover:text-ink transition-colors">
              Ayuda
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header className="sticky top-0 z-50 border-b border-line bg-header/95 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6">
          <Link
            href="/"
            className="shrink-0 font-display text-2xl font-bold text-ink hover:text-accent transition-colors"
          >
            Recambia<span className="text-accent">.</span>
          </Link>

          <ul className="hidden h-full gap-8 text-sm md:flex">
            {LINKS.map((link) => (
              <li
                key={link.href}
                className="flex h-full items-center"
                onMouseEnter={() => link.isMegaMenu && setMegaMenuOpen(true)}
                onMouseLeave={() => link.isMegaMenu && setMegaMenuOpen(false)}
              >
                <Link
                  href={link.href}
                  className="flex h-full items-center text-ink-muted hover:text-ink transition-colors font-semibold"
                >
                  {link.label}
                  {link.isMegaMenu && (
                    <svg
                      className={`ml-1 h-3 w-3 transition-transform ${
                        megaMenuOpen ? "rotate-180 text-accent" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Mega Menu Dropdown */}
                {link.isMegaMenu && (
                  <AnimatePresence>
                    {megaMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 right-0 top-full border-b border-line bg-surface-1/95 backdrop-blur-xl shadow-2xl"
                      >
                        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                          <div className="grid grid-cols-4 gap-6">
                            {categories.map((cat) => (
                              <Link
                                key={cat.slug}
                                href={`/resultados?categoria=${cat.slug}`}
                                className="group flex flex-col gap-2 rounded-xl border border-transparent p-4 hover:border-line hover:bg-surface-2 transition-colors"
                                onClick={() => setMegaMenuOpen(false)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-3 text-accent group-hover:bg-accent/15 group-hover:shadow-lg group-hover:shadow-accent/20 transition-all">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                  </div>
                                  <span className="font-display font-semibold text-ink group-hover:text-accent transition-colors">
                                    {cat.name}
                                  </span>
                                </div>
                                <p className="text-xs text-ink-muted">
                                  {cat.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          <div className="flex-1 px-8 hidden md:block">
            <GlobalSearch />
          </div>

          <div className="ml-auto flex items-center gap-4">
            {scrolled && (
              <div className="hidden w-64 lg:block">
                <PlateSearch variant="compact" />
              </div>
            )}

            {/* Icons */}
            <div className="flex items-center gap-2">
              {/* User */}
              <Link href="/mi-garaje" className="flex h-10 w-10 items-center justify-center rounded-full text-ink-muted hover:bg-surface-2 hover:text-ink transition-colors">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              {/* Cart */}
              <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-muted hover:bg-surface-2 hover:text-ink transition-colors">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent font-mono-num text-[10px] font-bold text-white">
                  0
                </span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-2 hover:text-ink transition-colors md:hidden"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              className="fixed inset-x-0 top-[64px] flex flex-col border-t border-line bg-surface-1/95 backdrop-blur-xl px-6 py-4 md:hidden overflow-y-auto"
            >
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-line py-4 text-lg font-semibold text-ink transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-8 flex flex-col gap-4">
                <div className="rounded-xl border border-line bg-surface-2 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">
                    ¿Necesitas ayuda?
                  </p>
                  <a
                    href="tel:+34600000000"
                    className="flex items-center gap-2 font-mono-num text-lg font-bold text-ink"
                  >
                    <span className="text-accent">📞</span> 600 00 00 00
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
