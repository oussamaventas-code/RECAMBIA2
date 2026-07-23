"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlateSearch } from "@/components/matricula/PlateSearch";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site-config";
import { whatsappGenericUrl } from "@/lib/whatsapp";

const LINKS = [
  { href: "/diagnostico", label: "Diagnóstico" },
  { href: "/talleres-asociados", label: "Talleres" },
];

export function Nav({ showPlate = false }: { showPlate?: boolean }) {
  const [scrolled, setScrolled] = useState(showPlate);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <span className="text-accent">✓</span> Solo pagas si la pieza encaja
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-accent">🇪🇸</span> Stock real en España
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${PHONE_TEL}`} className="hover:text-ink transition-colors">
              📞 {PHONE_DISPLAY}
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
              <li key={link.href} className="flex h-full items-center">
                <Link
                  href={link.href}
                  className="flex h-full items-center text-ink-muted hover:text-ink transition-colors font-semibold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-4">
            {scrolled && (
              <div className="hidden w-64 lg:block">
                <PlateSearch variant="compact" />
              </div>
            )}

            {/* WhatsApp CTA */}
            <a
              href={whatsappGenericUrl("Hola, quiero información sobre una pieza.")}
              target="_blank"
              rel="noopener noreferrer"
              data-origen="nav"
              className="hidden items-center gap-2 rounded-xl bg-success px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-success-glow sm:flex"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              WhatsApp
            </a>

            {/* Mobile WhatsApp CTA */}
            <a
              href={whatsappGenericUrl("¡Hola! Vengo de la web y necesito ayuda para encontrar un recambio.")}
              target="_blank"
              rel="noopener noreferrer"
              data-origen="nav-mobile"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-success hover:bg-success/10 transition-colors md:hidden"
              aria-label="Contactar por WhatsApp"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
            </a>

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
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="fixed inset-x-0 bottom-0 top-16 flex flex-col overflow-y-auto border-t border-line bg-surface-1/95 px-6 py-4 backdrop-blur-xl md:hidden"
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
                    href={`tel:${PHONE_TEL}`}
                    className="flex items-center gap-2 font-mono-num text-lg font-bold text-ink"
                  >
                    <span className="text-accent">📞</span> {PHONE_DISPLAY}
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
