"use client";

import { useId, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { whatsappGenericUrl } from "@/lib/whatsapp";
import { formatPlateInput } from "@/components/matricula/plate-format";
import { markMatriculaEntered } from "@/lib/analytics";

import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Packs habituales — solo informativo, sin precio ni SKU ─── */
const PACKS = [
  {
    id: "embrague",
    icon: "/images/packs/kit-embrague.png",
    title: "Kit de embrague",
    description:
      "Disco, plato de presión y collarín a juego, para que la transmisión quede como nueva de una sola vez.",
    includes: ["Disco de embrague", "Plato de presión", "Collarín (rodamiento)"],
  },
  {
    id: "distribucion",
    icon: "/images/packs/kit-distribucion.png",
    title: "Kit distribución + bomba de agua",
    description:
      "Correa, tensores y bomba de agua cambiados a la vez — te ahorras pagar la mano de obra dos veces.",
    includes: ["Correa de distribución", "Tensores y rodillos", "Bomba de agua"],
  },
  {
    id: "frenos",
    icon: "/images/packs/kit-frenos.png",
    title: "Kit discos y pastillas",
    description:
      "Discos y pastillas del mismo eje, pensados para un frenado uniforme y sin vibraciones.",
    includes: ["Discos de freno (eje)", "Pastillas de freno (eje)", "Compatibilidad verificada"],
  },
  {
    id: "filtros",
    icon: "/images/packs/kit-filtros.png",
    title: "Kit filtros y aceite",
    description:
      "Tu revisión completa en un solo pedido: aceite de motor y los filtros que tocan en ese cambio.",
    includes: ["Aceite de motor", "Filtro de aceite", "Filtro de aire y habitáculo"],
  },
] as const;

function CheckIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function buildPackMessage(intro: string, plate: string): string {
  const lines = [intro];
  if (plate) {
    lines.push(`Mi matrícula: ${plate}`);
  }
  lines.push("", "¿Me confirmáis piezas exactas, precio y disponibilidad?");
  return lines.join("\n");
}

/* ─── Mini campo de matrícula, mismo lenguaje visual que el del hero ─── */
function PlateField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <div className="flex items-stretch overflow-hidden rounded-lg border border-line-strong transition-colors focus-within:border-accent">
      <div className="flex w-6 flex-shrink-0 items-center justify-center bg-plate-blue text-plate">
        <span className="text-[8px] font-bold leading-none">E</span>
      </div>
      <label htmlFor={id} className="sr-only">
        Tu matrícula
      </label>
      <input
        id={id}
        type="text"
        inputMode="text"
        autoComplete="off"
        spellCheck={false}
        placeholder="0000 BBB"
        value={value}
        onChange={(e) => {
          const formatted = formatPlateInput(e.target.value);
          onChange(formatted);
          if (formatted) markMatriculaEntered();
        }}
        maxLength={8}
        className="w-full bg-plate px-2 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-plate-ink outline-none placeholder:text-plate-ink/30"
      />
    </div>
  );
}

function PackCard({ pack }: { pack: (typeof PACKS)[number] }) {
  const [plate, setPlate] = useState("");

  return (
    <div className="pack-card group flex w-[260px] shrink-0 snap-start flex-col rounded-2xl border border-line bg-surface-1 p-6 sm:w-[280px] lg:w-[300px] overflow-hidden hover:border-accent/50 transition-colors">
      <div className="relative mb-5 -mt-6 -mx-6 h-32 overflow-hidden bg-ink/5">
        <Image src={pack.icon} alt={pack.title} fill sizes="300px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-surface-1/20 to-transparent" />
      </div>
      <h3 className="font-display text-lg text-ink mb-2 relative z-10">{pack.title}</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">{pack.description}</p>
      <ul className="mb-5 flex flex-1 flex-col gap-1.5">
        {pack.includes.map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs text-ink-muted">
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>

      <span className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-ink-faint">
        Tu matrícula (opcional)
      </span>
      <PlateField value={plate} onChange={setPlate} />

      <a
        href={whatsappGenericUrl(buildPackMessage(`Hola, quiero información sobre el ${pack.title}.`, plate))}
        target="_blank"
        rel="noopener noreferrer"
        data-origen="packs"
        className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-lg bg-success px-3 py-2.5 text-xs font-semibold text-white transition-all hover:bg-success-glow active:scale-95"
      >
        Preguntar precio de esta pieza &rarr;
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}

function MoreKitsCard() {
  const [plate, setPlate] = useState("");

  return (
    <div className="pack-card group flex w-[260px] shrink-0 snap-start flex-col rounded-2xl border border-dashed border-accent/30 bg-accent/5 p-6 sm:w-[280px] lg:w-[300px] overflow-hidden hover:border-accent/50 transition-colors">
      <div className="relative mb-5 -mt-6 -mx-6 h-28 overflow-hidden bg-accent/10 border-b border-dashed border-accent/20 flex items-center justify-center">
        <svg className="h-10 w-10 text-accent transition-transform duration-500 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <h3 className="font-display text-lg text-ink mb-2">¿Buscas otro kit?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Si varias piezas de tu coche se cambian juntas, dínoslo y te lo confirmamos a medida.
      </p>

      <div className="mt-auto w-full">
        <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-ink-faint">
          Tu matrícula (opcional)
        </span>
        <PlateField value={plate} onChange={setPlate} />

        <a
          href={whatsappGenericUrl(buildPackMessage("Hola, quiero un kit de piezas para mi coche.", plate))}
          target="_blank"
          rel="noopener noreferrer"
          data-origen="packs-otro"
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-success px-3 py-2.5 text-xs font-semibold text-white transition-all hover:bg-success-glow active:scale-95"
        >
          Escríbenos por WhatsApp &rarr;
        </a>
      </div>
    </div>
  );
}

export function Packs() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Scroll horizontal guiado por GSAP solo en pantallas grandes y sin
      // "prefers-reduced-motion". En móvil el track ya es deslizable de
      // forma nativa (overflow-x-auto), así que no hace falta animarlo.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const pin = pinRef.current;
        if (!track || !pin) return;

        const distance = () => track.scrollWidth - pin.offsetWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            pinType: "transform",
            scrub: 0.6,
            invalidateOnRefresh: true,
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
    <section ref={sectionRef} className="relative bg-surface-1 border-y border-line">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6 lg:pb-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-dark mb-4">
          Ahorra en mano de obra
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-ink">Kits y packs habituales</h2>
        <p className="mt-3 max-w-lg text-ink-muted">
          Cuando varias piezas se cambian juntas, te lo decimos — ejemplos de
          combinaciones habituales. Te confirmamos piezas exactas y precio por
          WhatsApp.
        </p>
      </div>

      <div ref={pinRef} className="overflow-hidden lg:flex lg:min-h-[520px] lg:items-center">
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto px-4 pb-10 snap-x snap-mandatory custom-scrollbar sm:px-6 lg:flex-nowrap lg:overflow-visible lg:pb-0 lg:pl-[6vw] lg:pr-[10vw]"
        >
          {PACKS.map((pack) => (
            <PackCard key={pack.id} pack={pack} />
          ))}
          <MoreKitsCard />
        </div>
      </div>
    </section>
  );
}
