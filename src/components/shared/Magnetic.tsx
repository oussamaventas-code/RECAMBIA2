"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface MagneticProps {
  children: ReactNode;
  /** cuánto se desplaza hacia el cursor, 0-1 */
  strength?: number;
  className?: string;
}

// Envuelve un botón/enlace y lo hace seguir ligeramente al cursor.
// Solo con ratón/trackpad y si el usuario no pidió menos movimiento:
// en touch no hay "hover" real y el efecto no aporta nada.
export function Magnetic({ children, strength = 0.35, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

        const handleMove = (e: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          xTo((e.clientX - rect.left - rect.width / 2) * strength);
          yTo((e.clientY - rect.top - rect.height / 2) * strength);
        };
        const handleLeave = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener("pointermove", handleMove);
        el.addEventListener("pointerleave", handleLeave);
        return () => {
          el.removeEventListener("pointermove", handleMove);
          el.removeEventListener("pointerleave", handleLeave);
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
