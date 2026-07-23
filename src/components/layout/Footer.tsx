"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, LEGAL } from "@/lib/site-config";
import { whatsappGenericUrl } from "@/lib/whatsapp";
import { horarioTexto, promesaRespuesta } from "@/config/contacto";

const COLUMNS = [
  {
    title: "Recambia",
    links: [
      { href: "/quienes-somos", label: "Quiénes somos" },
      { href: "/talleres-asociados", label: "Profesionales y talleres" },
      { href: "/diagnostico", label: "Diagnóstico online" },
      { href: "/contacto", label: "Contacto" },
    ],
  },
  {
    title: "Legal y Ayuda",
    links: [
      { href: "/ayuda", label: "Centro de ayuda" },
      { href: "/envios", label: "Envíos y devoluciones" },
      { href: "/legal/privacidad", label: "Política de privacidad" },
      { href: "/legal/condiciones", label: "Condiciones de compra" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface-1">
      {/* WhatsApp CTA Section */}
      <div className="border-b border-line bg-surface-2/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between">
          <div className="mb-6 lg:mb-0">
            <h3 className="font-display text-xl text-ink">
              ¿No encuentras tu pieza?
            </h3>
            <p className="mt-2 text-sm text-ink-muted max-w-md">
              La web es solo nuestro escaparate. Si tu pieza se vende en el
              mercado de recambio, la conseguimos: mándanos tu matrícula y te
              la buscamos.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 lg:items-end">
            <a
              href={whatsappGenericUrl("Hola, busco una pieza que no encuentro en la web. Mi matrícula es: ")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-success px-6 py-3 font-semibold text-white transition-all hover:bg-success-glow hover:shadow-lg hover:shadow-success/20 active:scale-95"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              Escríbenos por WhatsApp &rarr;
            </a>
            <p className="text-xs text-ink-faint">{promesaRespuesta()}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Logo & Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link
              href="/"
              className="font-display text-2xl font-bold text-ink hover:text-accent transition-colors"
            >
              Recambia<span className="text-accent">.</span>
            </Link>
            <p className="mt-4 text-sm text-ink-muted leading-relaxed max-w-sm">
              Tu tienda online de recambios de coche con stock real en España.
              Expertos en automoción al otro lado del WhatsApp para que no
              falles al pedir tu pieza.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`tel:${PHONE_TEL}`}
                className="group flex items-center gap-3 text-sm text-ink-muted hover:text-ink transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 group-hover:bg-accent/15 group-hover:text-accent transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-ink">{PHONE_DISPLAY}</p>
                  <p className="text-xs">{horarioTexto()}</p>
                </div>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-3 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 transition-colors group-hover:bg-accent/15 group-hover:text-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-ink">{EMAIL}</p>
                  <p className="text-xs">Contacto general</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Links */}
          {COLUMNS.map((col) => (
            <motion.div key={col.title} variants={itemVariants}>
              <p className="font-display font-semibold text-ink mb-6">
                {col.title}
              </p>
              <ul className="flex flex-col gap-4">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 flex flex-col gap-8 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between"
        >
          {/* Payment Methods */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-faint">
              <svg className="h-3.5 w-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Pago 100% seguro
            </span>

            {/* Visa */}
            <div className="flex h-8 items-center justify-center rounded-md border border-line bg-white px-2.5 shadow-sm">
              <span className="font-sans text-[15px] font-bold italic leading-none tracking-tight text-[#1434CB]" aria-label="Visa">
                VISA
              </span>
            </div>

            {/* Mastercard */}
            <div className="flex h-8 items-center justify-center rounded-md border border-line bg-white px-2.5 shadow-sm">
              <svg viewBox="0 0 48 30" className="h-5 w-auto" role="img" aria-label="Mastercard">
                <circle cx="19" cy="15" r="11" fill="#EB001B" />
                <circle cx="29" cy="15" r="11" fill="#F79E1B" />
                <path d="M24 6.8a11 11 0 010 16.4 11 11 0 010-16.4z" fill="#FF5F00" />
              </svg>
            </div>

            {/* Bizum */}
            <div className="flex h-8 items-center justify-center rounded-md border border-line bg-white px-2.5 shadow-sm">
              <span className="font-sans text-sm font-extrabold leading-none tracking-tight text-[#0a8f9c]" aria-label="Bizum">
                Bizum
              </span>
            </div>

            {/* Tarjeta / enlace seguro */}
            <div className="flex h-8 items-center justify-center rounded-md border border-line bg-white px-2.5 shadow-sm">
              <span className="text-xs font-semibold text-ink-muted">Tarjeta</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            {/* Copyright */}
            <div className="flex flex-col gap-1 text-xs text-ink-faint text-left lg:text-right">
              <p className="font-mono-num">
                © {new Date().getFullYear()} RECAMBIA. Todos los derechos reservados.
              </p>
              <p>{LEGAL.businessName} · NIF {LEGAL.nif}</p>
              <p>
                Diseñado para profesionales y apasionados del motor en España 🇪🇸
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
