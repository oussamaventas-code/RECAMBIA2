import { WHATSAPP_NUMBER } from "@/lib/site-config";

export function whatsappGenericUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function whatsappPlateUrl(plate: string): string {
  return whatsappGenericUrl(
    `¡Hola! Mi matrícula es ${plate} y busco un recambio rápido. ¿Me podéis ayudar?`,
  );
}
