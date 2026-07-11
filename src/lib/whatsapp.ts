import type { Product } from "@/types";
import { WHATSAPP_NUMBER } from "@/lib/site-config";

export function buildOrderMessage(product: Product, plate?: string | null): string {
  const lines = [
    "Hola, quiero pedir esta pieza:",
    "",
    `• ${product.name} — ${product.brand}`,
    `• REF OEM: ${product.oemRef}`,
    `• Precio web: ${product.price.toFixed(2).replace(".", ",")} €`,
  ];
  if (plate) {
    lines.push(`• Mi matrícula: ${plate}`);
  }
  lines.push("", "¿Me confirmáis disponibilidad y entrega?");
  return lines.join("\n");
}

export function whatsappOrderUrl(product: Product, plate?: string | null): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildOrderMessage(product, plate),
  )}`;
}

export function whatsappGenericUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function whatsappPlateUrl(plate: string): string {
  return whatsappGenericUrl(
    `Hola, mi matrícula es ${plate}. ¿Qué piezas tenéis disponibles para mi coche?`,
  );
}
