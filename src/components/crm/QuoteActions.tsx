"use client";

import { useState, useTransition } from "react";
import {
  borrarAction,
  cancelarAction,
  marcarPagadoAction,
  reactivarAction,
} from "@/app/presupuesto/crm/actions";
import type { QuoteStatus } from "@/lib/crm-store";

interface QuoteActionsProps {
  id: string;
  status: QuoteStatus;
  d: string;
  s: string;
}

const btn =
  "rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50";

export function QuoteActions({ id, status, d, s }: QuoteActionsProps) {
  const [pending, startTransition] = useTransition();
  const [metodo, setMetodo] = useState("efectivo");
  const [copied, setCopied] = useState(false);

  function run(action: (fd: FormData) => Promise<void>, extra?: Record<string, string>) {
    const fd = new FormData();
    fd.set("id", id);
    for (const [k, v] of Object.entries(extra ?? {})) fd.set(k, v);
    startTransition(async () => {
      await action(fd);
    });
  }

  async function copyLink() {
    const url = `${window.location.origin}/presupuesto?d=${encodeURIComponent(d)}&s=${encodeURIComponent(s)}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-1.5">
      {status !== "cancelado" && (
        <button
          onClick={copyLink}
          disabled={pending}
          className={`${btn} border border-line bg-surface-1 text-ink-muted hover:border-accent hover:text-accent`}
        >
          {copied ? "¡Copiado!" : "Copiar link"}
        </button>
      )}

      {status === "enviado" && (
        <>
          <div className="flex items-center gap-1">
            <select
              value={metodo}
              onChange={(e) => setMetodo(e.target.value)}
              disabled={pending}
              aria-label="Método de pago"
              className="rounded-lg border border-line bg-surface-1 px-1.5 py-1.5 text-xs text-ink-muted outline-none focus:border-accent"
            >
              <option value="efectivo">Efectivo</option>
              <option value="bizum">Bizum</option>
              <option value="transferencia">Transferencia</option>
              <option value="stripe">Stripe</option>
              <option value="otro">Otro</option>
            </select>
            <button
              onClick={() => run(marcarPagadoAction, { metodo })}
              disabled={pending}
              className={`${btn} bg-success text-white hover:bg-success/85`}
            >
              ✓ Cobrado
            </button>
          </div>
          <button
            onClick={() => run(cancelarAction)}
            disabled={pending}
            className={`${btn} border border-line bg-surface-1 text-ink-faint hover:border-danger hover:text-danger`}
          >
            Cancelar
          </button>
        </>
      )}

      {status !== "enviado" && (
        <button
          onClick={() => run(reactivarAction)}
          disabled={pending}
          className={`${btn} border border-line bg-surface-1 text-ink-muted hover:border-accent hover:text-accent`}
        >
          Reactivar
        </button>
      )}

      {status === "cancelado" && (
        <button
          onClick={() => {
            if (window.confirm("¿Borrar este presupuesto del CRM? No se puede deshacer.")) {
              run(borrarAction);
            }
          }}
          disabled={pending}
          className={`${btn} border border-danger/40 bg-surface-1 text-danger hover:bg-danger hover:text-white`}
        >
          Borrar
        </button>
      )}
    </div>
  );
}
