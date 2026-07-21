"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

interface PurchaseTrackerProps {
  amount: number;
  // El id de la sesión de Stripe como eventID: si el cliente recarga esta
  // página, el evento se reenvía con el mismo id y una futura Conversions
  // API (o el propio Meta) puede deduplicar en vez de contar la compra dos
  // veces.
  eventId: string;
}

// Componente invisible: solo dispara el evento de compra al montar. Vive en
// un componente cliente aparte porque /presupuesto/gracias es una página de
// servidor y fbq solo existe en el navegador.
export function PurchaseTracker({ amount, eventId }: PurchaseTrackerProps) {
  useEffect(() => {
    trackEvent("Purchase", { value: amount, currency: "EUR" }, eventId);
  }, [amount, eventId]);

  return null;
}
