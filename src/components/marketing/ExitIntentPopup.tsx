"use client";

import { useEffect, useRef, useState } from "react";
import { EmailCaptureForm } from "@/components/marketing/EmailCaptureForm";
import { DISCOUNT } from "@/lib/site-config";

// Popup de captación al salir. Se muestra una sola vez (guardado en
// localStorage) cuando el usuario mueve el ratón hacia fuera (escritorio) o
// tras un scroll significativo (móvil, donde el exit-intent no existe).
const STORAGE_KEY = "recambia_lead_popup_v1";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Ya visto o ya suscrito: no volver a molestar.
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    let done = false;
    const trigger = () => {
      if (done) return;
      done = true;
      setOpen(true);
      cleanup();
    };

    // Escritorio: el ratón sale por arriba de la ventana.
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    // Móvil: tras desplazarse bastante (señal de interés), a los pocos segundos.
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    let scrolled = false;
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 1.2) scrolled = true;
    };
    let mobileTimer: ReturnType<typeof setTimeout> | null = null;
    if (isCoarse) {
      window.addEventListener("scroll", onScroll, { passive: true });
      mobileTimer = setTimeout(() => {
        if (scrolled) trigger();
      }, 15000);
    } else {
      document.addEventListener("mouseout", onMouseOut);
    }

    function cleanup() {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
      if (mobileTimer) clearTimeout(mobileTimer);
    }
    return cleanup;
  }, []);

  function close() {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  }

  function markSeen() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  }

  // Accesibilidad del modal: guarda el foco previo, lo mueve al diálogo al
  // abrir, cierra con Escape y devuelve el foco al elemento anterior al cerrar.
  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
      onClick={close}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        tabIndex={-1}
        className="relative w-full max-w-md rounded-3xl border border-line bg-surface-1 p-8 shadow-2xl outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-dark">
            🎁 Antes de irte
          </span>
          <h2 id="popup-title" className="mt-4 font-display text-2xl text-ink">
            {DISCOUNT.short} en tu primer pedido
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Déjanos tu email y te damos un código de bienvenida para usar por WhatsApp.
          </p>
        </div>

        <div className="mt-6">
          <EmailCaptureForm source="popup" onSuccess={markSeen} />
        </div>
      </div>
    </div>
  );
}
