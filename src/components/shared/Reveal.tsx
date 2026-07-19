"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Entrada estándar de secciones: sutil (12px, 0.3s) y disparada ANTES de que
// el elemento entre en pantalla (margin positivo), para que el contenido ya
// esté asentado cuando el usuario llega. Nunca ocultar contenedores enteros.
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: "0px 0px 200px 0px" }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
