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

// Eventos propios (no estándar de Meta) van por trackCustom en vez de track,
// que es lo que espera el Píxel para nombres que no son de su catálogo.
function trackCustomEvent(name: string, params?: FbqParams, eventId?: string): string | null {
  if (typeof window === "undefined") return null;
  if (getConsent() !== "accepted") return null;
  if (!window.fbq) return null;
  const id = eventId ?? newEventId();
  window.fbq("trackCustom", name, params ?? {}, { eventID: id });
  return id;
}

// Marca en sesión que el visitante ya escribió su matrícula en algún buscador
// de la web (hero, nav, packs...). Lo consulta trackWhatsappClick para saber
// si, en el momento de escribir por WhatsApp, ya la había puesto.
const MATRICULA_SESSION_KEY = "recambia_matricula_entered";

export function markMatriculaEntered(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(MATRICULA_SESSION_KEY, "true");
}

function hasEnteredMatricula(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(MATRICULA_SESSION_KEY) === "true";
}

// Evento central de embudo: un clic en cualquier enlace de WhatsApp de la
// web. `origen` identifica qué bloque disparó el clic (hero, sticky,
// footer...) para poder comparar conversión por sección una vez arranquen
// los anuncios.
export function trackWhatsappClick(origen: string): string | null {
  return trackCustomEvent("whatsapp_click", {
    origen,
    matricula: hasEnteredMatricula() ? 1 : 0,
  });
}
