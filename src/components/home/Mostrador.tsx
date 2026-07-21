"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PlateSearch } from "@/components/matricula/PlateSearch";
import { whatsappGenericUrl } from "@/lib/whatsapp";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

/* ══════════════════════════════════════════════ */
/*  MOSTRADOR — Hero Section                     */
/* ══════════════════════════════════════════════ */
export function Mostrador() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  // El vídeo de fondo solo se monta (y descarga) en escritorio; en móvil el
  // poster optimizado es suficiente y ahorra el mp4 entero.
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    setShowVideo(mq.matches);
  }, []);

  // Reveal del titular palabra a palabra, solo en escritorio: en móvil el
  // titular es el LCP y debe pintarse al instante.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (!h1Ref.current) return;
          const split = new SplitText(h1Ref.current, {
            type: "words",
            wordsClass: "inline-block",
          });
          gsap.fromTo(
            split.words,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.03, ease: "power3.out" },
          );
          return () => split.revert();
        },
      );
      return () => mm.revert();
    },
    { scope: h1Ref },
  );

  // Parallax sutil del fondo: solo escritorio y sin reduced-motion. El fondo
  // va a escala 110% (ver className más abajo) para que el desplazamiento no
  // deje huecos vacíos en los bordes.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        if (!bgRef.current || !sectionRef.current) return;
        const tween = gsap.to(bgRef.current, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-paper md:min-h-[100dvh]"
    >
      {/* ── Fondo: poster optimizado siempre, vídeo solo en escritorio ── */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-paper">
        <div ref={bgRef} className="absolute inset-0 scale-110">
          <Image
            src="/hero/hero-poster.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-90"
          />
          {showVideo && (
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
          )}
        </div>

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
        <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-10 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-dark">
              <span className="inline-block h-1.5 w-1.5 animate-pulse-led rounded-full bg-accent" />
              Equipo de 4 expertos · Asesoramiento incluido
            </span>

            {/* H1 */}
            <h1
              ref={h1Ref}
              className="mt-6 font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="block text-ink">Tu pieza,</span>
              <span className="block text-accent">
                mañana en tu puerta.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
              Escribe tu matrícula y un recambista te confirma pieza,
              precio y disponibilidad en menos de 2 horas.
              <br className="hidden sm:block" />{" "}
              Te atiende una persona, no un bot.
            </p>

            {/* PlateSearch + CTA principal */}
            <div className="mt-6 max-w-md">
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-sm text-success-dark">
                <svg className="h-5 w-5 shrink-0 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-ink">Solo pagas cuando confirmamos que la pieza es compatible.</span>
              </div>

              <PlateSearch variant="hero" />

              <div className="mt-3">
                <a
                  href={whatsappGenericUrl(
                    "¡Hola! Vengo de la web y necesito ayuda para encontrar un recambio.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-success px-6 text-base font-semibold text-white shadow-lg shadow-success/25 transition-all hover:bg-success-glow active:scale-[0.98] sm:inline-flex sm:w-auto"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.9.53 3.68 1.45 5.19L2 22l4.94-1.42A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.63 0-3.15-.46-4.44-1.25l-.32-.19-3.29.95.95-3.2-.21-.33A8.17 8.17 0 013.8 12C3.8 7.47 7.47 3.8 12 3.8s8.2 3.67 8.2 8.2-3.67 8.2-8.2 8.2z" />
                  </svg>
                  Escríbenos por WhatsApp &rarr;
                </a>
              </div>

              <div className="mt-4 flex flex-col gap-2 text-sm">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  <a
                    href={whatsappGenericUrl(
                      "Hola, no me sé la matrícula. ¿Me ayudáis a buscar la pieza igualmente?",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-muted underline decoration-line transition-colors hover:text-ink hover:decoration-ink-faint"
                  >
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
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar: Stats ── */}
      <div className="relative z-10 border-t border-line/50">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:gap-0 sm:divide-x sm:divide-line/50">
            {/* Stat: años de experiencia */}
            <div className="flex items-baseline gap-2 sm:pr-8">
              <span className="font-mono-num text-2xl font-bold text-ink sm:text-3xl">
                15<span className="text-accent">+</span>
              </span>
              <span className="text-sm text-ink-muted">años de experiencia</span>
            </div>

            {/* Stat: personas en el equipo */}
            <div className="flex items-baseline gap-2 sm:px-8">
              <span className="font-mono-num text-2xl font-bold text-ink sm:text-3xl">
                4
              </span>
              <span className="text-sm text-ink-muted">expertos a tu servicio</span>
            </div>

            {/* Stat: 24h */}
            <div className="flex items-baseline gap-2 sm:px-8">
              <span className="font-mono-num text-2xl font-bold text-ink sm:text-3xl">
                24<span className="text-accent">h</span>
              </span>
              <span className="text-sm text-ink-muted">entrega en España</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
