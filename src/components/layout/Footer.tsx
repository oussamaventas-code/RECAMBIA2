"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const COLUMNS = [
  {
    title: "Catálogo",
    links: [
      { href: "/resultados?categoria=frenos", label: "Frenos" },
      { href: "/resultados?categoria=filtros", label: "Filtros" },
      { href: "/resultados?categoria=motor", label: "Motor" },
      { href: "/resultados?categoria=suspension", label: "Suspensión" },
      { href: "/resultados", label: "Ver todo el catálogo" },
    ],
  },
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
      {/* Newsletter Section */}
      <div className="border-b border-line bg-surface-2/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between">
          <div className="mb-6 lg:mb-0">
            <h3 className="font-display text-xl text-ink">
              Únete a nuestra newsletter
            </h3>
            <p className="mt-2 text-sm text-ink-muted max-w-md">
              Recibe ofertas exclusivas, consejos de mantenimiento y novedades
              directamente en tu correo. Sin spam, prometido.
            </p>
          </div>
          <form
            className="flex w-full max-w-md items-center gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Tu email..."
              className="w-full rounded-xl border border-line bg-surface-1 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent placeholder:text-ink-faint"
              required
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-all hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/20 active:scale-95"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5"
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
                href="tel:+34600000000"
                className="group flex items-center gap-3 text-sm text-ink-muted hover:text-ink transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 group-hover:bg-accent/15 group-hover:text-accent transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-ink">600 00 00 00</p>
                  <p className="text-xs">Lunes a Viernes (9:00 - 18:30)</p>
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
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-xs text-ink-faint font-semibold uppercase tracking-wider mr-2">
              Pago 100% Seguro
            </span>
            {/* Visa */}
            <div className="flex h-8 w-12 items-center justify-center rounded bg-white px-2">
              <svg viewBox="0 0 38 12" className="w-full text-[#1A1F71]" fill="currentColor">
                <path d="M14.3 11.5l2.2-11.2H13l-1.7 7.7-2-7.7H6L3 7.8 2.2.3H0l1.1 11.2h3.4l2.8-8 2 8h5zm8.9-11.1c-1.8-.4-3.6-.3-5 .4l.9 3.2c1.2-.5 2.5-.7 3.5-.3.6.2.8.6.7 1.2-.2 1.4-3.3 1.5-3.6 4-.2 1.8 1.4 3 3.6 3 1.9 0 3.7-.5 4.6-1.1l-.9-3.2c-1.3.7-2.7 1-3.6.8-.7-.2-.9-.7-.8-1.3.1-1.4 3.4-1.5 3.6-4.1.2-1.9-1.3-3.1-3-3.1zm11.2 7.7c-.1-1.1-1.1-1.8-2.6-1.9-1.7-.2-2-.8-1.9-1.4.1-.7 1.1-1.2 2.7-1 .9.1 1.9.4 2.5.7l.6-2.9c-1.2-.5-2.6-.7-4.1-.6-3.1.2-4.9 2-4.6 4.2.3 2 2.1 2.8 4 3 1.4.2 1.7.9 1.6 1.6-.1.8-1.2 1.4-3 1.1-1.2-.2-2.5-.6-3.3-1.1l-.6 3c1.3.7 3.1 1 4.7.9 3.3-.2 5-2.1 4.7-4.5zm-5-7.6h-3l-4.5 11.2h3.5l.7-2h4.3l.4 2h3.4L29.4.5zm-2.4 6.7l1.3-3.8.7 3.8h-2z"/>
              </svg>
            </div>
            {/* Mastercard */}
            <div className="flex h-8 w-12 items-center justify-center rounded bg-white px-2">
              <svg viewBox="0 0 36 22" className="w-full">
                <circle cx="11" cy="11" r="11" fill="#EB001B"/>
                <circle cx="25" cy="11" r="11" fill="#F79E1B"/>
                <path d="M18 20.3a11 11 0 000-18.6 11 11 0 000 18.6z" fill="#FF5F00"/>
              </svg>
            </div>
            {/* PayPal */}
            <div className="flex h-8 w-12 items-center justify-center rounded bg-white px-2">
              <svg viewBox="0 0 100 26" className="w-full text-[#003087]" fill="currentColor">
                <path d="M12.9 0H3.8c-.5 0-.9.4-1 .9l-2.6 16.4c-.1.5.3 1 .8 1h3.6c.4 0 .7-.3.8-.7l.9-5.4h3c4 0 6.1-2 6.7-5.9.3-1.9 0-3.6-1.1-4.8C13.8.4 12 0 12.9 0zm.4 7.6c-.2 1.3-1.2 1.3-2.6 1.3H8.3l.5-3h1.9c1 0 1.7 0 2 .4.3.3.4.8.2 1.3z"/>
                <path d="M29.5 7h-2.5c-.3 0-.6.2-.7.4l-4.2 6-1.8-5.6c-.1-.4-.5-.7-.9-.7h-2.7c-.5 0-.8.5-.7 1l2.8 8-3.1 4.5c-.3.4.1 1 .6 1h2.5c.3 0 .6-.2.7-.4l8.3-11.8c.2-.6-.2-1.4-.8-1.4z" fill="#0079C1"/>
              </svg>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            {/* Socials */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-ink-muted hover:text-accent transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-ink-muted hover:text-accent transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
            
            {/* Copyright */}
            <div className="flex flex-col gap-1 text-xs text-ink-faint text-left lg:text-right">
              <p className="font-mono-num">
                © {new Date().getFullYear()} RECAMBIA. Todos los derechos reservados.
              </p>
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
