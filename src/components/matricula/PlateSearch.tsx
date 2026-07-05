"use client";

import { useRouter } from "next/navigation";
import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatPlateInput, isPlateComplete } from "./plate-format";
import { identifyVehicle, vehicleLabel } from "@/data/vehicles";

type Status = "idle" | "scanning" | "identifying" | "identified";

interface PlateSearchProps {
  variant?: "hero" | "compact";
  className?: string;
  onActivityChange?: (active: boolean) => void;
}

const EU_STARS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const r = 45;
  return {
    x: Number((50 + r * Math.sin(angle)).toFixed(2)),
    y: Number((50 - r * Math.cos(angle)).toFixed(2)),
  };
});

export function PlateSearch({
  variant = "hero",
  className = "",
  onActivityChange,
}: PlateSearchProps) {
  const router = useRouter();
  const inputId = useId();
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const isHero = variant === "hero";
  const complete = isPlateComplete(value);

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function runIdentification() {
    if (!complete || status !== "idle") return;
    clearTimers();
    setStatus("scanning");
    timers.current.push(
      setTimeout(() => setStatus("identifying"), 900),
      setTimeout(() => setStatus("identified"), 2000),
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!complete) return;
    if (!isHero) {
      router.push(`/resultados?matricula=${encodeURIComponent(value)}`);
      return;
    }
    runIdentification();
  }

  function handleVerPiezas() {
    router.push(`/resultados?matricula=${encodeURIComponent(value)}`);
  }

  const vehicle = complete ? identifyVehicle(value) : null;

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        aria-label="Buscar recambios por matrícula"
        className={`group flex items-stretch overflow-hidden rounded-xl border shadow-lg transition-all duration-300 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/30 focus-within:shadow-accent/10 ${
          status !== "idle"
            ? "border-accent ring-2 ring-accent/30 shadow-accent/10"
            : "border-line-strong hover:border-ink-faint"
        } ${isHero ? "h-14 sm:h-16" : "h-10"}`}
      >
        {/* EU blue strip */}
        <div
          className={`relative flex flex-shrink-0 flex-col items-center justify-between bg-plate-blue py-1 text-plate ${
            isHero ? "w-10 sm:w-12" : "w-7"
          }`}
        >
          <div
            className={`relative ${isHero ? "h-4 w-4 sm:h-5 sm:w-5" : "h-3 w-3"}`}
            aria-hidden="true"
          >
            {EU_STARS.map((star, i) => (
              <span
                key={i}
                className="absolute block rounded-full bg-plate"
                style={{
                  width: isHero ? "2px" : "1.5px",
                  height: isHero ? "2px" : "1.5px",
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </div>
          <span
            className={`font-sans font-bold leading-none ${
              isHero ? "text-[10px] sm:text-xs" : "text-[8px]"
            }`}
          >
            E
          </span>
        </div>

        {/* Input */}
        <div className="relative flex flex-1 items-center bg-plate px-3 sm:px-4">
          <label htmlFor={inputId} className="sr-only">
            Escribe tu matrícula
          </label>
          <input
            id={inputId}
            type="text"
            inputMode="text"
            autoComplete="off"
            spellCheck={false}
            placeholder="0000 BBB"
            value={value}
            disabled={status !== "idle" && isHero}
            onChange={(e) => {
              setValue(formatPlateInput(e.target.value));
              onActivityChange?.(true);
            }}
            onFocus={() => onActivityChange?.(true)}
            onBlur={() => {
              if (status === "idle") onActivityChange?.(false);
            }}
            maxLength={8}
            className={`w-full bg-transparent font-mono font-semibold uppercase tracking-[0.2em] text-plate-ink outline-none placeholder:text-plate-ink/30 ${
              isHero ? "text-xl sm:text-2xl" : "text-sm"
            }`}
          />

          {/* Scan animation */}
          {isHero && status === "scanning" && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 0.9, ease: "linear" }}
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent/50 to-transparent"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={!complete || (isHero && status !== "idle")}
          aria-label="Buscar recambios"
          className={`flex flex-shrink-0 items-center justify-center bg-accent font-display text-white transition-all hover:bg-accent-dark disabled:cursor-not-allowed disabled:bg-line-strong disabled:text-ink-faint ${
            isHero
              ? "w-16 text-xs sm:w-28 sm:text-sm gap-2"
              : "w-10 text-[10px]"
          }`}
        >
          {isHero ? (
            <>
              <svg
                className="h-4 w-4 hidden sm:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Buscar
            </>
          ) : (
            "→"
          )}
        </button>
      </form>

      {/* Status feedback */}
      {isHero && (
        <AnimatePresence mode="wait">
          {status === "identifying" && (
            <motion.div
              key="identifying"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 flex items-center gap-3 rounded-xl border border-line bg-surface-1/90 backdrop-blur-sm px-4 py-3"
            >
              <span className="h-2.5 w-2.5 flex-shrink-0 animate-pulse-led rounded-full bg-accent shadow-sm shadow-accent/50" />
              <div className="flex-1">
                <p className="font-mono-num text-sm text-ink-muted">
                  Identificando vehículo…
                </p>
                <div className="mt-2 h-2 w-2/3 animate-pulse rounded-full bg-line" />
              </div>
            </motion.div>
          )}

          {status === "identified" && vehicle && (
            <motion.div
              key="identified"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 flex flex-col gap-3 rounded-xl border border-success/30 bg-success/5 backdrop-blur-sm px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-success/20 text-success">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <p className="text-sm text-ink">
                  <span className="font-semibold">{vehicleLabel(vehicle)}</span>{" "}
                  <span className="text-success">verificado</span>
                </p>
              </div>
              <button
                onClick={handleVerPiezas}
                className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/20 active:scale-95"
              >
                Ver piezas compatibles →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
