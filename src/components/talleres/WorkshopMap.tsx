"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { whatsappGenericUrl } from "@/lib/whatsapp";

export function WorkshopMap() {
  const [zipCode, setZipCode] = useState("");
  const zipReady = zipCode.length === 5;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-surface-1 border border-line shadow-sm">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--color-ink) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-12 p-8 sm:p-12 lg:p-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1">
              <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs font-bold text-accent-dark tracking-wide uppercase">Montaje en taller</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl text-ink leading-tight mb-4">
              Tú compras la pieza.<br/>Te decimos dónde montarla.
            </h2>
            <p className="text-ink-muted leading-relaxed mb-8 max-w-md">
              ¿No quieres ensuciarte las manos? Trabajamos con talleres de
              confianza. Dinos tu código postal por WhatsApp y te decimos el
              más cercano — y si lo prefieres, le enviamos la pieza directamente.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="text"
                placeholder="Tu código postal (ej. 28001)"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                className="flex-1 rounded-xl border border-line bg-surface-2 px-4 py-3.5 text-sm font-mono-num text-ink outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 placeholder:font-sans placeholder:text-ink-faint"
              />
              <a
                href={whatsappGenericUrl(
                  zipReady
                    ? `Hola, estoy en el código postal ${zipCode}. ¿Qué taller me queda cerca para montar una pieza?`
                    : "Hola, ¿qué taller me queda cerca para montar una pieza?",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-xl bg-success px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-success-glow active:scale-95 flex items-center justify-center gap-2 min-w-[160px]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
                Escríbenos por WhatsApp &rarr;
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-line">
              <p className="text-xs text-ink-muted max-w-sm">
                Compra la pieza al precio de la web y paga solo el montaje en
                el taller. Sin sobrecostes ocultos.
              </p>
            </div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden md:block relative h-full min-h-[400px] w-full rounded-2xl bg-surface-2 border border-line p-6 flex flex-col justify-center items-center overflow-hidden"
          >
            {/* Map visual mock */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(var(--color-line-strong) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />

            {/* Location pin */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="relative z-10 flex flex-col items-center justify-center h-full"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-xl shadow-accent/30">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="mt-4 rounded-lg bg-surface-1/90 backdrop-blur px-4 py-2 text-sm font-semibold text-ink shadow-lg border border-line">
                Tu taller más cercano
                <p className="text-xs font-normal text-ink-muted">Te lo decimos por WhatsApp</p>
              </div>
            </motion.div>

            {/* Abstract connected lines */}
            <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M50 50 L20 20 M50 50 L80 30 M50 50 L30 80 M50 50 L80 80" stroke="var(--color-accent)" strokeWidth="0.5" strokeDasharray="2,2" />
               <circle cx="20" cy="20" r="1.5" fill="var(--color-accent)" />
               <circle cx="80" cy="30" r="1.5" fill="var(--color-accent)" />
               <circle cx="30" cy="80" r="1.5" fill="var(--color-accent)" />
               <circle cx="80" cy="80" r="1.5" fill="var(--color-accent)" />
            </svg>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
