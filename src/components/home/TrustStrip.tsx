"use client";

import { motion } from "framer-motion";

/* ─── Trust items data ─── */
const trustItems = [
  {
    label: "Envío 24h",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Pago 100% seguro",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Devolución 30 días",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
    ),
  },
  {
    label: "Stock en España",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "+500.000 referencias",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

/* ─── Animation variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

/* ─── TrustItem component ─── */
function TrustItem({
  icon,
  label,
  isLast,
}: {
  icon: React.ReactNode;
  label: string;
  isLast: boolean;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex items-center gap-2.5 shrink-0"
    >
      <span className="text-accent">{icon}</span>
      <span className="text-sm text-ink whitespace-nowrap">{label}</span>

      {/* Separator */}
      {!isLast && (
        <span
          aria-hidden
          className="hidden lg:block ml-5 h-4 w-px bg-line"
        />
      )}
    </motion.div>
  );
}

/* ─── Main component ─── */
export function TrustStrip() {
  return (
    <section className="bg-surface-1 border-y border-line">
      {/* ── Desktop: centered row ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="hidden lg:flex items-center justify-center gap-8 py-3.5"
      >
        {trustItems.map((item, i) => (
          <TrustItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isLast={i === trustItems.length - 1}
          />
        ))}
      </motion.div>

      {/* ── Mobile / Tablet: infinite marquee scroll ── */}
      <div className="lg:hidden overflow-hidden py-3.5">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex w-max animate-marquee"
        >
          {/* Duplicate the set for seamless loop */}
          {[...trustItems, ...trustItems].map((item, i) => (
            <div key={`${item.label}-${i}`} className="flex items-center gap-2.5 mx-5 shrink-0">
              <span className="text-accent">{item.icon}</span>
              <span className="text-sm text-ink whitespace-nowrap">
                {item.label}
              </span>

              {/* Separator dot */}
              <span
                aria-hidden
                className="ml-4 h-1 w-1 rounded-full bg-line-strong"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
