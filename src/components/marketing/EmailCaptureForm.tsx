"use client";

import { useState } from "react";
import Link from "next/link";
import { DISCOUNT } from "@/lib/site-config";
import { whatsappGenericUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface EmailCaptureFormProps {
  source: "portada" | "popup";
  onSuccess?: () => void;
}

type Status = "idle" | "sending" | "done" | "error";

export function EmailCaptureForm({ source, onSuccess }: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setError(null);

    if (!consent) {
      setError("Marca la casilla para aceptar la política de privacidad.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent, source, website }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "No hemos podido guardar tu email.");
        setStatus("error");
        return;
      }
      setStatus("done");
      trackEvent("Lead", { content_name: source });
      onSuccess?.();
    } catch {
      setError("Problema de conexión. Inténtalo de nuevo.");
      setStatus("error");
    }
  }

  async function copyCode() {
    await navigator.clipboard.writeText(DISCOUNT.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ── Éxito: mostramos el código y empujamos a WhatsApp ──
  if (status === "done") {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-display text-lg text-ink">¡Listo! Tu {DISCOUNT.short} te espera</p>
        <p className="mt-1 text-sm text-ink-muted">
          Usa este código cuando pidas tu pieza por WhatsApp y te lo aplicamos.
        </p>

        <button
          type="button"
          onClick={copyCode}
          className="group mx-auto mt-4 flex items-center gap-3 rounded-xl border-2 border-dashed border-accent/40 bg-accent/5 px-5 py-3 transition-colors hover:border-accent"
        >
          <span className="font-mono-num text-xl font-bold tracking-wider text-accent">{DISCOUNT.code}</span>
          <span className="text-xs font-semibold text-ink-muted group-hover:text-accent">
            {copied ? "¡Copiado!" : "Copiar"}
          </span>
        </button>

        <a
          href={whatsappGenericUrl(
            `Hola, tengo el código ${DISCOUNT.code} para el ${DISCOUNT.long}. Busco esta pieza: `,
          )}
          target="_blank"
          rel="noopener noreferrer"
          data-origen={`email-capture-${source}`}
          className="mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-success px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-success/25 transition-all hover:bg-success-glow active:scale-[0.98]"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          </svg>
          Pedir mi pieza con el descuento &rarr;
        </a>
      </div>
    );
  }

  // ── Formulario ──
  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          autoComplete="email"
          disabled={status === "sending"}
          className="min-h-[48px] flex-1 rounded-xl border border-line bg-surface-1 px-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent focus:ring-2 focus:ring-accent/25 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="min-h-[48px] shrink-0 rounded-xl bg-accent px-6 text-sm font-semibold text-white transition-all hover:bg-accent-dark active:scale-[0.98] disabled:opacity-60"
        >
          {status === "sending" ? "Enviando…" : "Quiero mi descuento"}
        </button>
      </div>

      {/* Honeypot: oculto para humanos, los bots lo rellenan. Recortado con
          clip en vez de sacarlo de pantalla con left negativo: eso último
          ensancha el scroll horizontal de toda la página en móvil. */}
      <div
        className="absolute h-px w-px overflow-hidden whitespace-nowrap"
        style={{ clip: "rect(0 0 0 0)", clipPath: "inset(50%)" }}
        aria-hidden="true"
      >
        <label>
          No rellenar
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <label className="flex cursor-pointer items-start gap-2.5 text-left text-xs text-ink-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-line-strong text-accent focus:ring-accent/30"
        />
        <span>
          Acepto recibir el código y comunicaciones de RECAMBIA. Consulta la{" "}
          <Link href="/legal/privacidad" target="_blank" className="text-accent underline hover:no-underline">
            política de privacidad
          </Link>
          . Puedes darte de baja cuando quieras.
        </span>
      </label>

      {error && <p className="text-xs font-medium text-danger">{error}</p>}
    </form>
  );
}
