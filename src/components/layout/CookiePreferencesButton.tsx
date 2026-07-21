"use client";

import { resetConsent } from "@/lib/consent";

// Revocar debe ser tan fácil como aceptar: borra la decisión guardada y
// recarga, con lo que el banner de CookieConsent vuelve a aparecer.
export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => {
        resetConsent();
        window.location.reload();
      }}
      className="rounded-xl border border-line-strong bg-surface-1 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
    >
      Cambiar mi elección de cookies
    </button>
  );
}
