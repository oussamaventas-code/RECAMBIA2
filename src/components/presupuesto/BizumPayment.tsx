"use client";

import { useState } from "react";

interface BizumPaymentProps {
  phone: string;
  amount: number;
  concept: string;
}

const eur = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });

export function BizumPayment({ phone, amount, concept }: BizumPaymentProps) {
  const [copied, setCopied] = useState<"phone" | "concept" | null>(null);

  async function copy(value: string, field: "phone" | "concept") {
    await navigator.clipboard.writeText(value);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="rounded-xl border border-success/30 bg-success/5 p-5">
      <p className="text-sm font-semibold text-ink">Paga por Bizum</p>
      <p className="mt-1 text-xs text-ink-muted">
        Envíanos un Bizum con estos datos y confirmamos tu pedido por WhatsApp en cuanto lo veamos.
      </p>

      <dl className="mt-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <dt className="text-xs uppercase tracking-wider text-ink-faint">Número</dt>
            <dd className="font-mono-num text-lg font-bold text-ink">{phone}</dd>
          </div>
          <button
            type="button"
            onClick={() => copy(phone, "phone")}
            className="shrink-0 rounded-lg border border-line bg-surface-1 px-3 py-1.5 text-xs font-semibold text-ink-muted hover:border-accent hover:text-accent"
          >
            {copied === "phone" ? "¡Copiado!" : "Copiar"}
          </button>
        </div>

        <div>
          <dt className="text-xs uppercase tracking-wider text-ink-faint">Importe</dt>
          <dd className="font-mono-num text-lg font-bold text-ink">{eur.format(amount)}</dd>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <dt className="text-xs uppercase tracking-wider text-ink-faint">Concepto</dt>
            <dd className="truncate font-mono-num text-sm font-semibold text-ink">{concept}</dd>
          </div>
          <button
            type="button"
            onClick={() => copy(concept, "concept")}
            className="shrink-0 rounded-lg border border-line bg-surface-1 px-3 py-1.5 text-xs font-semibold text-ink-muted hover:border-accent hover:text-accent"
          >
            {copied === "concept" ? "¡Copiado!" : "Copiar"}
          </button>
        </div>
      </dl>
    </div>
  );
}
