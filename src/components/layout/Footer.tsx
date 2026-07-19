"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BUSINESS_HOURS, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site-config";
import { whatsappGenericUrl } from "@/lib/whatsapp";

const COLUMNS = [
  {
    title: "Piezas",
    links: [
      { href: "/resultados?categoria=frenos", label: "Frenos" },
      { href: "/resultados?categoria=filtros", label: "Filtros" },
      { href: "/resultados?categoria=motor", label: "Motor" },
      { href: "/resultados?categoria=suspension", label: "Suspensión" },
      { href: "/resultados", label: "Ver todas las piezas" },
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
                  <p className="text-xs">{BUSINESS_HOURS}</p>
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
            <div className="flex h-8 w-12 items-center justify-center rounded bg-white px-2 border border-line shadow-sm">
              <svg viewBox="0 0 256 83" fill="none" className="h-3 w-auto">
                <path d="M112.56 80.892l-14.792-78.69H74.32l-14.774 78.69h23.498l2.955-16.155h28.618l2.81 16.155h28.163zM89.702 46.852l7.466-39.774 10.366 39.774H89.702zM151.763 80.892l14.774-78.69h-23.497l-14.775 78.69h23.498z" fill="#1434CB"/>
                <path d="M205.82 2.202c-15.656 0-26.657 8.358-26.749 20.323-.11 8.847 7.915 13.782 13.974 16.732 6.223 3.033 8.318 4.975 8.298 7.697-.035 4.15-5.011 6.064-9.645 6.064-6.425 0-9.883-.993-15.228-3.376l-2.128-.992-3.34 20.785c3.81 1.764 10.871 3.284 18.281 3.378 16.634 0 27.468-8.232 27.596-20.947.129-7.037-3.957-12.39-13.348-16.936-5.525-2.83-8.908-4.72-8.89-7.587.018-2.61 2.923-5.385 9.167-5.385 5.16 0 8.946.993 11.905 2.372l1.636.75 3.19-20.088c-3.14-1.12-8.083-2.793-14.93-2.793zM67.31 2.202h-18.06c-4.485 0-7.896 1.25-9.697 5.753L.2 80.892H24.81l4.89-13.438h30.298l14.72-65.253H67.31zm-24.81 48.77l10.33-28.536 5.86 28.536H42.5z" fill="#1434CB"/>
              </svg>
            </div>
            {/* Mastercard */}
            <div className="flex h-8 w-12 items-center justify-center rounded bg-white px-2 border border-line shadow-sm">
              <svg viewBox="0 0 44 26" className="h-4 w-auto">
                <circle cx="13" cy="13" r="13" fill="#EB001B"/>
                <circle cx="31" cy="13" r="13" fill="#F79E1B"/>
                <path d="M22 24.3a12.9 12.9 0 000-22.6 12.9 12.9 0 000 22.6z" fill="#FF5F00"/>
              </svg>
            </div>
            {/* Apple Pay */}
            <div className="flex h-8 w-12 items-center justify-center rounded bg-black px-2 shadow-sm">
              <svg viewBox="0 0 100 40" className="h-3 w-auto" fill="white">
                <path d="M42.7 18.5v11.7h-3V11.2h4.5c2 0 3.7.6 5 1.7 1.3 1.1 2 2.6 2 4.4 0 1.8-.7 3.3-2 4.4-1.3 1.1-3 1.7-5 1.7h-1.5zm0-2.3h1.7c1.2 0 2.1-.3 2.8-1 .7-.7 1-1.5 1-2.6 0-1-.3-1.9-1-2.6-.7-.7-1.6-1-2.8-1h-1.7v7.2zM63.7 26.6c-1.2 1.3-2.8 2-4.7 2-2.1 0-3.8-.7-4.9-2.2-1.2-1.5-1.8-3.4-1.8-5.8 0-2.3.6-4.2 1.8-5.8 1.2-1.5 2.9-2.3 4.9-2.3 2.1 0 3.7.7 4.8 2 1.1 1.3 1.7 3.1 1.7 5.4v.9h-10c.1 1.4.5 2.5 1.3 3.3.8.8 1.8 1.2 2.9 1.2 1.5 0 2.7-.6 3.4-1.9l2.6.9c-.6.9-1.2 1.5-2 2.3zm-6.5-7.5h7c-.1-1.1-.4-2-1-2.6-.7-.6-1.5-.9-2.5-.9-1.1 0-1.9.3-2.6.9-.6.7-1 1.6-1 2.6zM77.2 36.4c-1.3.9-2.8 1.4-4.5 1.4-1.6 0-3-.5-4.1-1.4l1-2.5c1 .7 2.1 1.1 3.2 1.1 1.5 0 2.2-.6 2.2-1.7v-1.1l-5.7-14.7h3.3l3.9 11 3.8-11h3.1l-6.2 17v1.9z"/>
                <path d="M23.1 23.3c0-3.7 3.1-5.5 8.6-5.5v-.5c0-1.4-.4-2.5-1.1-3.2-.8-.7-2-.1-3.5-.1-1.3 0-2.7.3-4.1.9l-1.3-3c1.6-.7 3.5-1.1 5.8-1.1 2.5 0 4.4.7 5.6 2s1.8 3.3 1.8 5.8v11.7h-2.9v-2c-.9 1.6-2.5 2.5-4.7 2.5-1.9 0-3.5-.6-4.6-1.8-1.1-1.3-1.6-2.8-1.6-4.5zm11.3 1.4v-2c-4 0-6 .9-6 2.8 0 .8.3 1.5.8 2 .5.5 1.2.7 2.1.7 1 .0 1.9-.3 2.7-.9.8-.6 1.3-1.5 1.4-2.6z"/>
                <path d="M12.9 19.4c0-.3 0-.6.1-.8-1.1 1.6-2.9 2.5-5 2.5-1.6 0-2.8-.5-3.8-1.4C3.1 18.7 2.6 17.5 2.6 16c0-1.6.5-3 1.6-3.9 1.1-.9 2.7-1.4 4.8-1.4 2 0 3.7.4 5.1 1.3v-1.2C14.1 8 11.2 5.6 7 5.6c-2.3 0-4.6.6-6.6 1.8V4.3C2.8 3 5.4 2.3 7.8 2.3c6 0 10 3.6 10 9.8v16.1h-4.9v-8.8zM12.9 15c-1.3-1-3-1.4-4.8-1.4-2.7 0-4.1 1-4.1 2.9 0 .8.3 1.5 1 2 1.3.9 3.2.9 4.8.4 2-.5 3-2 3.1-3.9z"/>
                <path d="M17.4.2C17.4.2 16.3.1 15 1c-1.1.7-1.9 1.9-2 3.2 0 0 1.2.1 2.3-.6.9-.6 1.5-1.5 1.6-2.6.1-.1.4-.7.5-.8z"/>
              </svg>
            </div>
            {/* Google Pay */}
            <div className="flex h-8 w-12 items-center justify-center rounded bg-white px-2 border border-line shadow-sm">
              <svg viewBox="0 0 100 40" className="h-3 w-auto">
                <path fill="#5F6368" d="M37.8 23.3V11.2h3.2v12.1h-3.2zm6.6-9.6c-.6-.7-1.1-1-1.9-1-1.1 0-2.1.5-2.8 1.4-.7.9-1 2-1 3.2s.3 2.3 1 3.2c.7.9 1.6 1.4 2.8 1.4 1 0 1.8-.4 2.4-1.2v.9c0 1.1-.4 2-1 2.6-.7.6-1.5.9-2.5.9-1.2 0-2.2-.6-2.7-1.7l-2.8 1.1c.8 1.9 2.7 2.9 5.5 2.9 1.8 0 3.3-.6 4.4-1.7 1.1-1.2 1.7-2.6 1.7-4.5v-7.8h-3v1zm-1.8 8c-.6 0-1.1-.2-1.5-.6-.4-.4-.7-.9-.7-1.6s.2-1.2.7-1.6c.4-.4.9-.6 1.5-.6.6 0 1.1.2 1.5.6.4.4.7.9.7 1.6s-.2 1.2-.7 1.6c-.4.4-.9.6-1.5.6zm10.7-10.5c-2 0-3.6.7-4.8 2-1.1 1.3-1.7 3-1.7 5.1s.6 3.8 1.7 5.1c1.2 1.3 2.7 2 4.8 2 2.1 0 3.7-.7 4.8-2 1.1-1.3 1.7-3 1.7-5.1s-.6-3.8-1.7-5.1c-1.2-1.3-2.8-2-4.8-2zm0 11.5c-.9 0-1.7-.3-2.3-1-.6-.7-.9-1.6-.9-2.7 0-1.1.3-2.1.9-2.8.6-.7 1.4-1 2.3-1s1.7.3 2.3 1c.6.7.9 1.6.9 2.8s-.3 2.1-.9 2.8c-.6.7-1.4 1-2.3 1zm11.2-11.5c-2 0-3.6.7-4.8 2-1.1 1.3-1.7 3-1.7 5.1s.6 3.8 1.7 5.1c1.2 1.3 2.7 2 4.8 2 2.1 0 3.7-.7 4.8-2 1.1-1.3 1.7-3 1.7-5.1s-.6-3.8-1.7-5.1c-1.2-1.3-2.8-2-4.8-2zm0 11.5c-.9 0-1.7-.3-2.3-1-.6-.7-.9-1.6-.9-2.7 0-1.1.3-2.1.9-2.8.6-.7 1.4-1 2.3-1s1.7.3 2.3 1c.6.7.9 1.6.9 2.8s-.3 2.1-.9 2.8c-.6.7-1.4 1-2.3 1zM79.5 11.2h-3.9v16.7h3.2v-5.2h.7c2 0 3.6-.6 4.7-1.9 1.2-1.2 1.8-2.8 1.8-4.7 0-1.8-.6-3.4-1.8-4.7-1.2-1.4-2.8-2.1-4.7-2.1zm.4 9.1h-1.1v-6.3h1.1c1.1 0 1.9.3 2.6.9.6.6 1 1.4 1 2.3 0 1-.3 1.7-1 2.3-.7.5-1.5.8-2.6.8zm11.6-4.5c-.9-1.1-2.1-1.6-3.6-1.6-1.5 0-2.8.6-3.7 1.7-1 1.1-1.5 2.5-1.5 4.3 0 1.7.5 3 1.4 4s2.2 1.5 3.8 1.5c2 0 3.5-.8 4.6-2.4l-2.4-1.6c-.6.9-1.4 1.3-2.2 1.3-.7 0-1.3-.2-1.7-.7l7-2.9-.3-.8c-.3-1.1-.8-2-1.4-2.8zm-3.6 7c-1 0-1.7-.5-2.1-1.5l5.2-2.1c-.2-.7-.5-1.2-1-1.6-.4-.4-1-.7-1.6-.7-.8 0-1.5.3-2.1 1s-.9 1.5-.9 2.6c0 1.6 1.1 2.4 3.2 2.4 1.4 0 2.5-.5 3.1-1.4l-2.3-1.5c-.3.5-.8.8-1.5.8zM99.6 11.5l-3.5 9-1.2 3.1c-.5 1.3-1.1 2.2-1.7 2.8-.7.6-1.5.9-2.5.9-.3 0-.6 0-.8-.1l-.4-.1v-3c.2.1.5.2.8.2.7 0 1.2-.2 1.6-.6.4-.4.7-1.1.9-1.9l.3-.8-3.6-9.5h3.4l2.1 6.5 2-6.5h3.4z"/>
                <path fill="#4285F4" d="M19 16c0-.8-.1-1.6-.2-2.3H9.8v4.5h5.3c-.2 1.1-.9 2.5-2.1 3.4v2.7h3.3c2-1.8 3.1-4.5 3.1-7.5z"/>
                <path fill="#34A853" d="M9.8 25.5c2.6 0 4.8-.8 6.4-2.2l-3.3-2.7c-.9.6-2 1-3.2 1-2.4 0-4.5-1.6-5.2-3.8H1v2.8c1.6 3.2 4.9 5.3 8.8 5.3z"/>
                <path fill="#FBBC04" d="M4.5 17.7c-.2-.6-.3-1.2-.3-1.8 0-.6.1-1.2.3-1.8v-2.8H1c-.7 1.4-1 2.9-1 4.6 0 1.6.4 3.2 1 4.6l3.5-2.8z"/>
                <path fill="#EA4335" d="M9.8 10.3c1.6 0 2.8.5 3.7 1.3l2.8-2.8c-1.7-1.5-3.9-2.5-6.5-2.5-3.9 0-7.2 2.1-8.8 5.3l3.5 2.8c.8-2.3 2.9-4.1 5.3-4.1z"/>
              </svg>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
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
