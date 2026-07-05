import type { Product, Vehicle } from "@/types";
import { vehicleLabel } from "@/data/vehicles";

// Número provisional — sustituir por el WhatsApp Business real.
export const WHATSAPP_NUMBER = "34600000000";

export function buildOrderMessage(product: Product, vehicle?: Vehicle | null): string {
  const lines = [
    "Hola, quiero pedir esta pieza:",
    "",
    `• ${product.name} — ${product.brand}`,
    `• REF OEM: ${product.oemRef}`,
    `• Precio web: ${product.price.toFixed(2).replace(".", ",")} €`,
  ];
  if (vehicle) {
    lines.push(`• Mi coche: ${vehicleLabel(vehicle)} (${vehicle.plate})`);
  }
  lines.push("", "¿Me confirmáis disponibilidad y entrega?");
  return lines.join("\n");
}

export function whatsappOrderUrl(product: Product, vehicle?: Vehicle | null): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildOrderMessage(product, vehicle),
  )}`;
}

export function whatsappGenericUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
