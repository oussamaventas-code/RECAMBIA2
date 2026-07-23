"use client";

import { useEffect, useRef, useState } from "react";
import { whatsappGenericUrl } from "@/lib/whatsapp";
import { hasSeenAnyPopup, markPopupSeen } from "@/lib/popup-coordination";

// Para quien lleva un buen rato en la web sin decidirse: no suele ser
// desinterés, suele ser miedo a pedir la pieza equivocada. En vez de otro
// descuento, aquí se le quita presión y se le empuja a preguntar por
// WhatsApp sin compromiso. Coordinado con ExitIntentPopup (misma marca de
// "ya visto"): si el de descuento ya salió, este no se muestra.
const DWELL_MS = 45_000;

export function ReassurancePopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (hasSeenAnyPopup()) return;
    const timer = setTimeout(() => {
      if (hasSeenAnyPopup()) return; // el popup de descuento se adelantó
      setOpen(true);
      markPopupSeen();
    }, DWELL_MS);
    return () => clearTimeout(timer);
  }, []);

  function close() {
    setOpen(false);
  }

  // Accesibilidad del modal: mismo patrón que ExitIntentPopup.
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
        aria-labelledby="reassurance-title"
        tabIndex={-1}
        className="relative w-full max-w-md rounded-3xl border border-line bg-surface-1 p-8 text-center shadow-2xl outline-none"
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

        <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-success-dark">
          💬 Sin compromiso
        </span>
        <h2 id="reassurance-title" className="mt-4 font-display text-2xl text-ink">
          Preguntar no cuesta nada
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          No hace falta que decidas nada todavía. Cuéntanos qué necesitas y un
          recambista te responde gratis — solo pagas si confirmamos que la
          pieza es la correcta para tu coche.
        </p>

        <a
          href={whatsappGenericUrl("Hola, tenía una duda antes de decidirme. ¿Me ayudáis?")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          data-origen="popup-reassurance"
          className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-success px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-success/25 transition-all hover:bg-success-glow active:scale-[0.98]"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          </svg>
          Preguntar por WhatsApp &rarr;
        </a>
        <p className="mt-3 text-xs text-ink-faint">Sin registros, sin compromiso de compra.</p>
      </div>
    </div>
  );
}
