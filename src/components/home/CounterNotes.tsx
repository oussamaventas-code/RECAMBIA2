"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { whatsappGenericUrl } from "@/lib/whatsapp";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TRUST_POINTS = [
  {
    title: "Somos profesionales del recambio",
    text: "No es un dropshipping: llevamos años en el sector y conocemos la pieza que vendemos.",
  },
  {
    title: "Te atiende una persona, siempre",
    text: "Escribes por WhatsApp y te responde un recambista real. Sin bots, sin respuestas automáticas.",
  },
  {
    title: "Asesoramiento mecánico incluido",
    text: "Nuestro mecánico te orienta con el montaje, te avisa de precauciones y resuelve tus dudas post-compra.",
  },
  {
    title: "Reparto propio en 24h",
    text: "El equipo que entrega es el mismo que confirma tu pedido. Sin mensajería externa de por medio.",
  },
];

export function CounterNotes() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {/* B2B Card */}
        <motion.div
          variants={itemVariants}
          className="group relative overflow-hidden rounded-2xl border border-line bg-surface-1"
        >
          {/* Background image overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 transition-opacity group-hover:opacity-20"
            style={{ backgroundImage: "url(/images/b2b-workshop.png)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-surface-1/90 to-transparent" />

          <div className="relative p-6 sm:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-glow px-3 py-1">
              <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-xs font-semibold text-accent">Profesionales</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-3">
              ¿Tienes taller?
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed max-w-md">
              Tarifa profesional desde el primer pedido y entrega{" "}
              <span className="font-semibold text-ink">antes de las 9h</span>.
              Pides por WhatsApp, confirmas por WhatsApp. Sin plataformas raras.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/talleres-asociados"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/20 active:scale-95"
              >
                Tarifa profesional
              </Link>
              <a
                href={whatsappGenericUrl(
                  "Hola, tengo un taller y quiero información de la tarifa profesional."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-all hover:border-accent hover:text-accent hover:bg-accent-glow"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        {/* Trust Card */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-line bg-surface-1 p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-ink">¿Por qué RECAMBIA?</h2>
          </div>

          <ul className="flex flex-col gap-4">
            {TRUST_POINTS.map((point, idx) => (
              <motion.li
                key={point.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="flex items-start gap-3 rounded-xl bg-surface-2 p-4 border border-line/50"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink">{point.title}</p>
                  <p className="text-sm text-ink-muted leading-relaxed">{point.text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
