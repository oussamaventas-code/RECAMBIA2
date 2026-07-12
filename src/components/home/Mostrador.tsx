"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { PlateSearch } from "@/components/matricula/PlateSearch";
import { brands } from "@/data/brands";
import { whatsappGenericUrl } from "@/lib/whatsapp";

gsap.registerPlugin(SplitText, useGSAP);

/* ── animation orchestration ── */
const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.25 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── animated counter hook ── */
function useCountUp(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);

  return count;
}

/* ── feature pills ── */
const features = [
  { icon: "💬", label: "Atención 1 a 1" },
  { icon: "🔧", label: "Asesoramiento mecánico" },
  { icon: "⚡", label: "Entrega 24h" },
];

/* ══════════════════════════════════════════════ */
/*  MOSTRADOR — Hero Section                     */
/* ══════════════════════════════════════════════ */
export function Mostrador() {
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // Valores clave del servicio humano (no del catálogo)
  const refYears = useCountUp(15, 1400, isInView);
  const refTeam = useCountUp(4, 1200, isInView);
  const ref24 = useCountUp(24, 1400, isInView);

  // Reveal del titular palabra a palabra, en vez de un fundido en bloque
  useGSAP(
    () => {
      if (!isInView || !h1Ref.current) return;
      const split = new SplitText(h1Ref.current, { type: "words", wordsClass: "inline-block" });
      gsap.fromTo(
        split.words,
        { opacity: 0, y: 28, rotateX: -35 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.045,
          ease: "power3.out",
          delay: 0.15,
        },
      );
      return () => split.revert();
    },
    { scope: h1Ref, dependencies: [isInView] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-paper"
    >
      {/* ── Background Video ── */}
      <div className="absolute inset-0 z-0 bg-paper">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero/hero-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
        >
          <source src="/hero/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay: light overlay to ensure text is readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.2) 100%)",
          }}
        />

        {/* Subtle accent glow in top-left */}
        <div
          className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full opacity-10 blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
        />

        {/* Bottom vignette for smooth transition to next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="max-w-2xl"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-dark">
                <span className="inline-block h-1.5 w-1.5 animate-pulse-led rounded-full bg-accent" />
                Equipo de 4 expertos · Asesoramiento incluido
              </span>
            </motion.div>

            {/* H1 */}
            <h1
              ref={h1Ref}
              style={{ perspective: 500 }}
              className="mt-6 font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="block text-ink">Tu pieza,</span>
              <span className="block text-accent">
                mañana en tu puerta.
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              Escribe tu matrícula y un recambista te confirma pieza,
              precio y disponibilidad al momento.
              <br className="hidden sm:block" />{" "}
              Te atiende una persona, no un bot.
            </motion.p>

            {/* PlateSearch */}
            <motion.div variants={fadeUp} className="mt-8 max-w-md">
              <PlateSearch variant="hero" />
              <div className="mt-4 flex flex-col gap-2 text-sm">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  <a href="/resultados" className="text-ink-muted underline decoration-line transition-colors hover:text-ink hover:decoration-ink-faint">
                    ¿No te sabes la matrícula?
                  </a>
                  <a
                    href={whatsappGenericUrl(
                      "Hola, no sé cómo se llama la pieza que necesito. Os mando una foto:",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-muted underline decoration-line transition-colors hover:text-ink hover:decoration-ink-faint"
                  >
                    ¿No sabes cómo se llama? Mándanos una foto
                  </a>
                </div>
                <span className="flex items-center gap-1.5 font-medium text-accent-dark">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
                  </span>
                  Pide antes de las 17:00h para envío hoy
                </span>
              </div>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-wrap gap-2.5"
            >
              {features.map((f) => (
                <motion.span
                  key={f.label}
                  variants={scaleIn}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-1/80 px-4 py-2 text-sm text-ink-muted backdrop-blur-sm transition-colors hover:border-line-strong hover:text-ink"
                >
                  <span aria-hidden="true">{f.icon}</span>
                  {f.label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom Bar: Stats + Brands ── */}
      <div className="relative z-10 border-t border-line/50">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Stats Row */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:gap-0 sm:divide-x sm:divide-line/50"
          >
            {/* Stat: años de experiencia */}
            <motion.div
              variants={fadeIn}
              className="flex items-baseline gap-2 sm:pr-8"
            >
              <span className="font-mono-num text-2xl font-bold text-ink sm:text-3xl">
                {refYears}
                <span className="text-accent">+</span>
              </span>
              <span className="text-sm text-ink-muted">años de experiencia</span>
            </motion.div>

            {/* Stat: personas en el equipo */}
            <motion.div
              variants={fadeIn}
              className="flex items-baseline gap-2 sm:px-8"
            >
              <span className="font-mono-num text-2xl font-bold text-ink sm:text-3xl">
                {refTeam}
                <span className="text-accent"> </span>
              </span>
              <span className="text-sm text-ink-muted">expertos a tu servicio</span>
            </motion.div>

            {/* Stat: 24h */}
            <motion.div
              variants={fadeIn}
              className="flex items-baseline gap-2 sm:px-8"
            >
              <span className="font-mono-num text-2xl font-bold text-ink sm:text-3xl">
                {ref24}
                <span className="text-accent">h</span>
              </span>
              <span className="text-sm text-ink-muted">entrega en España</span>
            </motion.div>
          </motion.div>

          {/* Brands Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap items-center gap-2 border-t border-line/30 py-5"
          >
            <span className="mr-2 text-xs font-medium uppercase tracking-wider text-ink-faint">
              Trabajamos con:
            </span>
            {brands.map((brand, i) => (
              <motion.span
                key={brand.slug}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{
                  duration: 0.35,
                  delay: 1.3 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs text-ink-faint transition-colors hover:border-line-strong hover:text-ink-muted"
              >
                {brand.name}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
