"use client";

import { motion } from "framer-motion";
import { whatsappGenericUrl } from "@/lib/whatsapp";

const benefits = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    text: "Te decimos qué pieza necesitas según los síntomas",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    text: "Consejos de montaje y precauciones para tu modelo",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    text: "Resolvemos dudas después de la compra si surge algún problema",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    text: "Si no puedes montarlo tú, te conectamos con un taller de confianza",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function MechanicAdvisory() {
  return (
    <section className="relative overflow-hidden bg-ink py-20">
      {/* Subtle gradient accent */}
      <div
        className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full opacity-[0.07] blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -left-40 -bottom-40 h-[400px] w-[400px] rounded-full opacity-[0.05] blur-[100px]"
        style={{
          background: "radial-gradient(circle, var(--color-success) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-success mb-6">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Exclusivo para clientes
            </span>

            <h2 className="font-display text-3xl sm:text-4xl text-white leading-tight mb-4">
              Compra tu pieza y llévate{" "}
              <span className="text-success">asesoramiento mecánico gratis</span>
            </h2>

            <p className="text-base text-white/60 leading-relaxed mb-8 max-w-lg">
              Nuestro mecánico te asesora por WhatsApp sin coste extra. 
              No solo te vendemos el recambio: te ayudamos a que todo salga bien.
              <span className="block mt-2 text-white/40 text-sm italic">
                Ningún gigante online puede ofrecerte esto.
              </span>
            </p>

            {/* Benefits list */}
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-3.5 mb-10"
            >
              {benefits.map((benefit, idx) => (
                <motion.li
                  key={idx}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success/20 text-success mt-0.5">
                    {benefit.icon}
                  </span>
                  <span className="text-sm text-white/80 leading-relaxed">
                    {benefit.text}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA */}
            <a
              href={whatsappGenericUrl(
                "Hola, tengo una duda mecánica sobre una pieza que quiero comprar."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-success px-7 py-4 font-semibold text-white shadow-lg shadow-success/25 transition-all hover:shadow-xl hover:shadow-success/30 active:scale-[0.98]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              Consulta a nuestro mecánico
            </a>
          </motion.div>

          {/* Right: Visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 sm:p-10">
              {/* Team composition */}
              <div className="mb-8">
                <h3 className="font-display text-xl text-white mb-6">
                  Nuestro equipo
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { role: "Recambistas", count: "2", desc: "Expertos en piezas", color: "accent" },
                    { role: "Mecánico", count: "1", desc: "Asesor técnico", color: "success" },
                    { role: "Logística", count: "1", desc: "Entregas en 24h", color: "warning" },
                    { role: "Digital", count: "1", desc: "Web y soporte", color: "accent-light" },
                  ].map((member) => (
                    <div
                      key={member.role}
                      className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
                    >
                      <span
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-${member.color}/20 font-mono-num text-lg font-bold text-${member.color} mb-2`}
                        style={{
                          backgroundColor: `color-mix(in srgb, var(--color-${member.color}, #2563eb) 20%, transparent)`,
                          color: `var(--color-${member.color}, #2563eb)`,
                        }}
                      >
                        {member.count}
                      </span>
                      <p className="text-sm font-semibold text-white">{member.role}</p>
                      <p className="text-xs text-white/50">{member.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="rounded-xl border border-success/20 bg-success/10 p-5">
                <p className="text-sm text-white/80 leading-relaxed italic">
                  &ldquo;No somos un almacén con un formulario web. Somos 4 personas que conocen 
                  el sector y te atienden como en el mostrador de toda la vida, 
                  pero sin que tengas que salir de casa.&rdquo;
                </p>
                <p className="mt-3 text-xs text-success font-semibold">
                  — Equipo RECAMBIA
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
