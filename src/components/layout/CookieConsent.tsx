"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent } from "@/lib/consent";

// Banner de consentimiento opt-in estricto: "Aceptar" y "Rechazar" con el
// mismo peso visual (la AEPD sanciona los banners que hacen "aceptar" grande
// y "rechazar" un enlace pequeño). Sin decisión guardada, el píxel no carga
// — ver MetaPixel.tsx.
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === null);
  }, []);

  function decide(value: "accepted" | "rejected") {
    setConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentimiento de cookies"
      className="fixed inset-x-0 bottom-0 z-[200] border-t border-line bg-surface-1 px-4 py-5 shadow-2xl sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-muted">
          Usamos cookies técnicas siempre y, solo si lo aceptas, el píxel de Meta para medir la
          eficacia de nuestros anuncios.{" "}
          <Link href="/legal/cookies" className="text-accent underline hover:no-underline">
            Más información
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2.5">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="rounded-xl border border-line-strong bg-surface-1 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink-faint"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-dark"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
