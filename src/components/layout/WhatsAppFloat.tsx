"use client";

import { motion } from "framer-motion";
import { whatsappGenericUrl } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={whatsappGenericUrl("Hola, quiero información sobre una pieza.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-xl shadow-success/30 transition-colors hover:bg-success-glow sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-success/40" aria-hidden="true" />
      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.9.53 3.68 1.45 5.19L2 22l4.94-1.42A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.63 0-3.15-.46-4.44-1.25l-.32-.19-3.29.95.95-3.2-.21-.33A8.17 8.17 0 013.8 12C3.8 7.47 7.47 3.8 12 3.8s8.2 3.67 8.2 8.2-3.67 8.2-8.2 8.2z" />
      </svg>
    </motion.a>
  );
}
