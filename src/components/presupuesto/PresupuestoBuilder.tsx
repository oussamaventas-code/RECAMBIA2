"use client";

import { useMemo, useState } from "react";
import { searchProducts } from "@/data/products";
import type { QuoteItem } from "@/lib/quote";
import { PRICING_METHOD_LABEL, suggestPrice } from "@/lib/pricing";

interface Row extends QuoteItem {
  key: string;
}

function newKey() {
  return Math.random().toString(36).slice(2);
}

interface PresupuestoBuilderProps {
  // Al llegar desde "Montar presupuesto →" de un lead del CRM: precarga los
  // datos de contacto y hace que /api/presupuesto/firmar actualice esa misma
  // ficha en vez de crear una duplicada.
  leadId?: string;
  initialName?: string;
  initialPhone?: string;
  initialPlate?: string;
  initialNote?: string;
}

export function PresupuestoBuilder({
  leadId,
  initialName = "",
  initialPhone = "",
  initialPlate = "",
  initialNote = "",
}: PresupuestoBuilderProps) {
  const [customerName, setCustomerName] = useState(initialName);
  const [customerPhone, setCustomerPhone] = useState(initialPhone);
  const [plate, setPlate] = useState(initialPlate);
  const [note, setNote] = useState(initialNote);
  const [rows, setRows] = useState<Row[]>([]);
  const [catalogQuery, setCatalogQuery] = useState("");
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculadora de precio: para piezas que no están en el catálogo de la web
  // (la mayoría — ese catálogo es solo escaparate). Se consulta el coste real
  // al proveedor por teléfono y, si se conoce, el precio aproximado de
  // mercado; la calculadora propone un precio de venta con margen.
  const [calcName, setCalcName] = useState("");
  const [calcRef, setCalcRef] = useState("");
  const [calcCost, setCalcCost] = useState("");
  const [calcMarket, setCalcMarket] = useState("");

  const catalogResults = useMemo(
    () => (catalogQuery.length > 1 ? searchProducts(catalogQuery).slice(0, 6) : []),
    [catalogQuery],
  );

  const calcCostNum = Number(calcCost);
  const calcMarketNum = Number(calcMarket);
  const suggestion = useMemo(() => {
    if (!calcCost || !(calcCostNum > 0)) return null;
    try {
      return suggestPrice({
        cost: calcCostNum,
        marketPrice: calcMarket && calcMarketNum > 0 ? calcMarketNum : undefined,
      });
    } catch {
      return null;
    }
  }, [calcCost, calcCostNum, calcMarket, calcMarketNum]);

  function addCalculatedRow() {
    if (!suggestion) return;
    setRows((prev) => [
      ...prev,
      {
        key: newKey(),
        name: calcName.trim() || "Pieza",
        ref: calcRef.trim() || undefined,
        qty: 1,
        unitPrice: suggestion.price,
      },
    ]);
    setCalcName("");
    setCalcRef("");
    setCalcCost("");
    setCalcMarket("");
  }

  const total = rows.reduce((sum, r) => sum + r.qty * r.unitPrice, 0);

  function addCatalogProduct(p: { name: string; oemRef: string; price: number }) {
    setRows((prev) => [
      ...prev,
      { key: newKey(), name: p.name, ref: p.oemRef, qty: 1, unitPrice: p.price },
    ]);
    setCatalogQuery("");
  }

  function addCustomRow() {
    setRows((prev) => [...prev, { key: newKey(), name: "", qty: 1, unitPrice: 0 }]);
  }

  function updateRow(key: string, patch: Partial<Row>) {
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  }

  function removeRow(key: string) {
    setRows((prev) => prev.filter((r) => r.key !== key));
  }

  async function generateLink() {
    setError(null);
    setLink(null);
    setCopied(false);

    const cleanRows = rows.filter((r) => r.name.trim() && r.qty > 0);
    if (cleanRows.length === 0) {
      setError("Añade al menos una línea con nombre y cantidad.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/presupuesto/firmar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          customerName: customerName.trim() || undefined,
          customerPhone: customerPhone.trim() || undefined,
          plate: plate.trim() || undefined,
          note: note.trim() || undefined,
          items: cleanRows.map(({ name, ref, qty, unitPrice }) => ({ name, ref, qty, unitPrice })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "No se pudo generar el presupuesto.");
        return;
      }
      const url = `${window.location.origin}/presupuesto?d=${encodeURIComponent(data.d)}&s=${encodeURIComponent(data.s)}`;
      setLink(url);
    } catch {
      setError("Error de red. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  async function copyLink() {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-8 flex flex-col gap-6">
      {/* Datos del cliente */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Cliente (opcional)
          </label>
          <input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Nombre del cliente"
            className="w-full rounded-xl border border-line bg-surface-1 px-4 py-2.5 text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Matrícula (opcional)
          </label>
          <input
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            placeholder="1234 BCD"
            className="w-full rounded-xl border border-line bg-surface-1 px-4 py-2.5 text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Teléfono / WhatsApp del cliente (opcional)
          </label>
          <input
            type="tel"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="612 34 56 78"
            className="w-full rounded-xl border border-line bg-surface-1 px-4 py-2.5 text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
          <p className="mt-1 text-xs text-ink-faint">
            Solo se guarda en tu CRM para el seguimiento; no aparece en el link del cliente.
          </p>
        </div>
      </div>

      {/* Buscador de catálogo */}
      <div className="relative">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
          Añadir del catálogo
        </label>
        <input
          value={catalogQuery}
          onChange={(e) => setCatalogQuery(e.target.value)}
          placeholder="Busca por nombre, marca o referencia OEM..."
          className="w-full rounded-xl border border-line bg-surface-1 px-4 py-2.5 text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
        {catalogResults.length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-xl border border-line bg-surface-1 shadow-xl">
            {catalogResults.map((p) => (
              <button
                key={p.id}
                onClick={() => addCatalogProduct(p)}
                className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm hover:bg-surface-2"
              >
                <span className="truncate">{p.name} — {p.brand}</span>
                <span className="font-mono-num text-ink-muted shrink-0">{p.price.toFixed(2)} €</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Calculadora de precio */}
      <div className="rounded-2xl border border-line bg-surface-1 p-4 sm:p-5">
        <h2 className="text-sm font-semibold text-ink">Calculadora de precio</h2>
        <p className="mt-1 text-xs text-ink-faint">
          Para piezas fuera de catálogo: mete el coste (y el precio de mercado si lo sabes) y te
          propone un precio de venta con margen.
        </p>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            value={calcName}
            onChange={(e) => setCalcName(e.target.value)}
            placeholder="Nombre de la pieza (opcional)"
            className="rounded-xl border border-line bg-surface-2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
          />
          <input
            value={calcRef}
            onChange={(e) => setCalcRef(e.target.value)}
            placeholder="Ref. OEM (opcional)"
            className="rounded-xl border border-line bg-surface-2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
          />
          <div className="flex items-center gap-1">
            <input
              type="number"
              min={0}
              step="0.01"
              value={calcCost}
              onChange={(e) => setCalcCost(e.target.value)}
              placeholder="Coste"
              className="w-full rounded-xl border border-line bg-surface-2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
            <span className="text-xs text-ink-muted shrink-0">€ coste</span>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="number"
              min={0}
              step="0.01"
              value={calcMarket}
              onChange={(e) => setCalcMarket(e.target.value)}
              placeholder="Precio de mercado (opcional)"
              className="w-full rounded-xl border border-line bg-surface-2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
            <span className="text-xs text-ink-muted shrink-0">€ mercado</span>
          </div>
        </div>

        {suggestion && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-accent/30 bg-accent/5 p-3">
            <div className="text-sm text-ink">
              <span className="font-mono-num text-lg font-bold text-accent">
                {suggestion.price.toFixed(2)} €
              </span>
              <span className="ml-2 text-xs text-ink-muted">
                margen {suggestion.marginEuros.toFixed(2)} € ({suggestion.marginPercent.toFixed(0)}%)
                {suggestion.discountPercent !== undefined && ` · -${suggestion.discountPercent.toFixed(0)}% vs. mercado`}
              </span>
              <div className="text-xs text-ink-faint">{PRICING_METHOD_LABEL[suggestion.method]}</div>
            </div>
            <button
              onClick={addCalculatedRow}
              className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent-dark"
            >
              + Añadir línea
            </button>
          </div>
        )}
      </div>

      {/* Líneas del presupuesto */}
      <div className="rounded-2xl border border-line bg-surface-1 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-ink">Líneas del presupuesto</h2>
          <button
            onClick={addCustomRow}
            className="text-xs font-semibold text-accent hover:text-accent-dark"
          >
            + Línea personalizada
          </button>
        </div>

        {rows.length === 0 ? (
          <p className="py-6 text-center text-sm text-ink-faint">
            Sin líneas todavía. Busca en el catálogo o añade una línea personalizada.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {rows.map((row) => (
              <div key={row.key} className="flex flex-wrap items-center gap-2 rounded-lg bg-surface-2 p-2.5">
                <input
                  value={row.name}
                  onChange={(e) => updateRow(row.key, { name: e.target.value })}
                  placeholder="Nombre de la pieza"
                  className="min-w-[160px] flex-1 rounded-lg border border-line bg-surface-1 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
                />
                <input
                  value={row.ref ?? ""}
                  onChange={(e) => updateRow(row.key, { ref: e.target.value })}
                  placeholder="Ref. OEM"
                  className="w-28 rounded-lg border border-line bg-surface-1 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
                />
                <input
                  type="number"
                  min={1}
                  value={row.qty}
                  onChange={(e) => updateRow(row.key, { qty: Number(e.target.value) || 1 })}
                  className="w-16 rounded-lg border border-line bg-surface-1 px-2 py-2 text-sm text-ink outline-none focus:border-accent"
                />
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={row.unitPrice}
                    onChange={(e) => updateRow(row.key, { unitPrice: Number(e.target.value) || 0 })}
                    className="w-24 rounded-lg border border-line bg-surface-1 px-2 py-2 text-sm text-ink outline-none focus:border-accent"
                  />
                  <span className="text-xs text-ink-muted">€</span>
                </div>
                <span className="font-mono-num w-20 text-right text-sm font-semibold text-ink">
                  {(row.qty * row.unitPrice).toFixed(2)} €
                </span>
                <button
                  onClick={() => removeRow(row.key)}
                  aria-label="Quitar línea"
                  className="text-ink-faint hover:text-danger"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
          <span className="text-sm text-ink-muted">Total (IVA incluido)</span>
          <span className="font-mono-num text-xl font-bold text-ink">{total.toFixed(2)} €</span>
        </div>
      </div>

      {/* Nota */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
          Nota para el cliente (opcional)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="Ej. Entrega estimada 24-48h desde el pago"
          className="w-full rounded-xl border border-line bg-surface-1 px-4 py-2.5 text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}

      <button
        onClick={generateLink}
        disabled={loading}
        className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-dark disabled:opacity-60"
      >
        {loading ? "Generando…" : "Generar link de presupuesto"}
      </button>

      {link && (
        <div className="rounded-xl border border-success/30 bg-success/5 p-4">
          <p className="mb-2 text-sm font-semibold text-ink">
            Link listo — pégalo en el WhatsApp del cliente. Queda registrado en{" "}
            <a href="/presupuesto/crm" className="text-accent hover:underline">tu CRM</a>:
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <input
              readOnly
              value={link}
              onFocus={(e) => e.target.select()}
              className="min-w-[240px] flex-1 rounded-lg border border-line bg-surface-1 px-3 py-2 text-xs text-ink outline-none"
            />
            <button
              onClick={copyLink}
              className="rounded-lg bg-success px-4 py-2 text-xs font-semibold text-white hover:bg-success-glow"
            >
              {copied ? "¡Copiado!" : "Copiar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
