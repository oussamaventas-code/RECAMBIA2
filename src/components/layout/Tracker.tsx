"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Componente invisible que captura los parámetros de seguimiento de la URL
 * (fbclid, utm_source, utm_campaign) y los guarda en sessionStorage para
 * poder adjuntarlos a los mensajes de WhatsApp.
 */
export function Tracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Si no hay window (SSR), salimos
    if (typeof window === "undefined") return;

    const fbclid = searchParams.get("fbclid");
    const utmSource = searchParams.get("utm_source");
    const utmCampaign = searchParams.get("utm_campaign");

    // Guardar fbclid (prioridad 1 para Meta Ads)
    if (fbclid) {
      sessionStorage.setItem("tracking_ref", `fb-${fbclid.substring(0, 8)}`);
    } 
    // Guardar UTMs (prioridad 2)
    else if (utmSource || utmCampaign) {
      const ref = [utmSource, utmCampaign].filter(Boolean).join("-");
      if (ref) {
        sessionStorage.setItem("tracking_ref", `utm-${ref.substring(0, 15)}`);
      }
    }

    // Interceptar clics en enlaces de WhatsApp para añadir tracking y disparar Píxel
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("https://wa.me")) {
        e.preventDefault(); // Detenemos la navegación por defecto

        // Disparar evento de Meta Pixel
        const win = window as unknown as { fbq?: (type: string, event: string) => void };
        if (typeof window !== "undefined" && win.fbq) {
          win.fbq("track", "Contact");
        }

        // Añadir referencia de tracking si existe
        const trackingRef = sessionStorage.getItem("tracking_ref");
        let finalUrl = href;
        
        if (trackingRef) {
          try {
            const url = new URL(href);
            const text = url.searchParams.get("text") || "";
            if (text && !text.includes("ref:")) {
              url.searchParams.set("text", `${text}\n\n[ref: ${trackingRef}]`);
              finalUrl = url.toString();
            }
          } catch {
            // Ignorar errores de URL parse
          }
        }

        // Redirigir a la URL final (en nueva pestaña si tenía target="_blank")
        const targetAttr = target.getAttribute("target");
        if (targetAttr === "_blank") {
          window.open(finalUrl, "_blank", "noopener,noreferrer");
        } else {
          window.location.href = finalUrl;
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [searchParams]);

  return null;
}
