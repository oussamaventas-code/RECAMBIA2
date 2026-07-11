"use client";

import { useState } from "react";

export function PagarButton({ d, s }: { d: string; s: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ d, s }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? "No se pudo iniciar el pago. Escríbenos por WhatsApp.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Error de red. Inténtalo de nuevo o escríbenos por WhatsApp.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handlePay}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-success px-6 py-4 font-semibold text-white shadow-lg shadow-success/20 transition-all hover:bg-success-glow hover:shadow-xl active:scale-[0.98] disabled:opacity-60"
      >
        {loading ? "Redirigiendo a pago seguro…" : "Pagar con tarjeta"}
      </button>
      {error && <p className="mt-3 text-center text-sm text-danger">{error}</p>}
      <p className="mt-3 text-center text-xs text-ink-faint">
        Pago seguro procesado por Stripe. RECAMBIA nunca ve ni guarda los datos de tu tarjeta.
      </p>
    </div>
  );
}
