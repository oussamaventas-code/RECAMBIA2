// Coordina los popups de captación (descuento + reaseguro) para que nunca
// se solapen: comparten esta misma marca de "ya visto", así que el que
// dispare primero es el único que se muestra en toda la sesión del visitante.
const KEY = "recambia_popup_seen_v1";

export function hasSeenAnyPopup(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return !!localStorage.getItem(KEY);
  } catch {
    return false;
  }
}

export function markPopupSeen(): void {
  try {
    localStorage.setItem(KEY, "1");
  } catch {}
}
