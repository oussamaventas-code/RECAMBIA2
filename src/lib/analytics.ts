import { getConsent } from "@/lib/consent";

// Eventos de embudo hacia Meta Pixel. No hace nada sin consentimiento
// aceptado ni si el píxel no ha llegado a cargar (sin NEXT_PUBLIC_META_PIXEL_ID
// no hay script que llamar). Cada evento lleva su propio eventID para que una
// futura Conversions API pueda deduplicar sin tener que tocar este fichero.
type FbqParams = Record<string, string | number | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function trackEvent(name: string, params?: FbqParams, eventId?: string): string | null {
  if (typeof window === "undefined") return null;
  if (getConsent() !== "accepted") return null;
  if (!window.fbq) return null;
  const id = eventId ?? newEventId();
  window.fbq("track", name, params ?? {}, { eventID: id });
  return id;
}
