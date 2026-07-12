"use client";

import { motion } from "framer-motion";
import { whatsappGenericUrl } from "@/lib/whatsapp";

const steps = [
  {
    number: "01",
    title: "Dinos qué necesitas",
    description:
      "Escríbenos tu matrícula y la pieza que buscas. Sin formularios, sin registro.",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Te confirmamos todo",
    description:
      "Un recambista verifica compatibilidad con tu vehículo, precio final y plazo de entrega.",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Recíbelo en 24h",
    description:
      "Pagas de forma segura con Stripe y te llega a casa o al taller. Sin sorpresas.",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-dark mb-4">
          Así de fácil
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-ink">
          Cómo funciona
        </h2>
        <p className="mt-3 text-ink-muted max-w-lg mx-auto">
          Sin carritos, sin registro, sin complicaciones. 
          Hablas con un experto y te lo resolvemos todo.
        </p>
      </motion.div>

      {/* Steps */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            variants={itemVariants}
            className="group relative rounded-2xl border border-line bg-surface-1 p-8 transition-all duration-300 hover:glow-border hover:shadow-lg hover:shadow-accent/5"
          >
            {/* Step number */}
            <span className="absolute -top-4 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-lg shadow-accent/30">
              {step.number}
            </span>

            {/* Connector line (not on last) */}
            {i < steps.length - 1 && (
              <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-line-strong md:block" />
            )}

            {/* Icon */}
            <div className="mb-5 mt-2 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
              {step.icon}
            </div>

            {/* Text */}
            <h3 className="font-display text-xl text-ink mb-2">{step.title}</h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <a
          href={whatsappGenericUrl("¡Hola! Vengo de la web y necesito ayuda para encontrar un recambio.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-xl bg-success px-8 py-4 font-semibold text-white shadow-lg shadow-success/20 transition-all hover:bg-success-glow hover:shadow-xl active:scale-[0.98]"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          </svg>
          Hablar con un experto en recambios ahora
        </a>
      </motion.div>
    </section>
  );
}
