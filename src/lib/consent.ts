// Estado de consentimiento de cookies no esenciales (píxel de Meta). Un
// simple localStorage + evento custom para que el píxel pueda activarse (o
// desactivarse) sin recargar la página en cuanto el usuario decide.
export type ConsentValue = "accepted" | "rejected";

const STORAGE_KEY = "recambia_cookie_consent";
export const CONSENT_EVENT = "recambia:consent-change";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw === "accepted" || raw === "rejected" ? raw : null;
}

export function setConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

// Permite retirar la decisión (exigido por la normativa: aceptar debe ser
// tan fácil de revocar como de dar). Ver botón en /legal/cookies.
export function resetConsent(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
