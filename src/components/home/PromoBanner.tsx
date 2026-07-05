"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function PromoBanner() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div
            className="relative w-full py-3 px-4"
            style={{
              background: "linear-gradient(135deg, #0066ff 0%, #43aaff 100%)",
            }}
          >
            {/* ── Shimmer overlay ── */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2.5s ease-in-out infinite",
              }}
            />

            {/* ── Content ── */}
            <div className="relative flex items-center justify-center">
              <p className="text-sm font-semibold text-white text-center pr-8 sm:pr-0">
                🚚 Envío GRATIS en pedidos +60€ —{" "}
                <span className="font-extrabold tracking-wide">
                  entrega 24h
                </span>{" "}
                en península
              </p>

              {/* ── Close button ── */}
              <button
                onClick={() => setVisible(false)}
                aria-label="Cerrar banner promocional"
                className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center
                           h-6 w-6 rounded-full bg-white/15 text-white/80
                           hover:bg-white/25 hover:text-white transition-colors cursor-pointer"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
