import type { Metadata } from "next";
import Link from "next/link";
import { listQuotes, type CrmRecord, type QuoteStatus } from "@/lib/crm-store";
import { QuoteActions } from "@/components/crm/QuoteActions";

export const metadata: Metadata = {
  title: "CRM — Presupuestos y ventas",
  robots: { index: false, follow: false },
};

// Siempre datos frescos del almacén, nada de caché estática.
export const dynamic = "force-dynamic";

const eur = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
const fecha = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Madrid",
});

const METHOD_LABEL: Record<string, string> = {
  stripe: "Stripe",
  efectivo: "Efectivo",
  bizum: "Bizum",
  transferencia: "Transferencia",
  otro: "Otro",
};

function waLink(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9) return null;
  const full = digits.length === 9 ? `34${digits}` : digits;
  return `https://wa.me/${full}`;
}

function StatusBadge({ record }: { record: CrmRecord }) {
  if (record.status === "pagado") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
        ● Pagado{record.paymentMethod ? ` · ${METHOD_LABEL[record.paymentMethod]}` : ""}
      </span>
    );
  }
  if (record.status === "cancelado") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-surface-3 px-2.5 py-1 text-xs font-semibold text-ink-faint">
        ● Cancelado
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-2.5 py-1 text-xs font-semibold text-warning">
      ● Enviado
    </span>
  );
}

interface CrmPageProps {
  searchParams: Promise<{ estado?: string; q?: string }>;
}

export default async function CrmPage({ searchParams }: CrmPageProps) {
  const { estado, q } = await searchParams;
  const all = await listQuotes();

  const pagados = all.filter((r) => r.status === "pagado");
  const enviados = all.filter((r) => r.status === "enviado");
  const cancelados = all.filter((r) => r.status === "cancelado");

  const now = new Date();
  const mesActual = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const pagadosMes = pagados.filter((r) => (r.paidAt ?? r.updatedAt).startsWith(mesActual));

  const sum = (rs: CrmRecord[]) => rs.reduce((acc, r) => acc + r.total, 0);
  const conversion = all.length > 0 ? Math.round((pagados.length / all.length) * 100) : null;

  const filtro: QuoteStatus | null =
    estado === "enviado" || estado === "pagado" || estado === "cancelado" ? estado : null;
  const porEstado = filtro ? all.filter((r) => r.status === filtro) : all;

  const query = q?.trim().toLowerCase() ?? "";
  const visibles = query
    ? porEstado.filter((r) =>
        [r.customerName, r.plate, r.customerPhone].some((v) => v?.toLowerCase().includes(query)),
      )
    : porEstado;

  const tiles = [
    { label: "Ventas cobradas", value: eur.format(sum(pagados)), sub: `${pagados.length} venta${pagados.length === 1 ? "" : "s"}` },
    { label: "Ventas este mes", value: eur.format(sum(pagadosMes)), sub: `${pagadosMes.length} venta${pagadosMes.length === 1 ? "" : "s"}` },
    { label: "Pendiente de cobro", value: eur.format(sum(enviados)), sub: `${enviados.length} presupuesto${enviados.length === 1 ? "" : "s"} enviado${enviados.length === 1 ? "" : "s"}` },
    { label: "Conversión", value: conversion === null ? "—" : `${conversion} %`, sub: `${pagados.length} de ${all.length} presupuestos` },
  ];

  const filtros: { label: string; value: QuoteStatus | null; count: number }[] = [
    { label: "Todos", value: null, count: all.length },
    { label: "Enviados", value: "enviado", count: enviados.length },
    { label: "Pagados", value: "pagado", count: pagados.length },
    { label: "Cancelados", value: "cancelado", count: cancelados.length },
  ];

  return (
    <main className="min-h-[100dvh] bg-paper px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl text-ink sm:text-3xl">CRM · Presupuestos y ventas</h1>
            <p className="mt-2 text-sm text-ink-muted">
              Cada link de presupuesto que generas queda registrado aquí. Los pagos por Stripe se
              marcan solos; los cobros por WhatsApp (efectivo, Bizum…) los marcas tú con un clic.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/presupuesto/nuevo"
              className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              + Nuevo presupuesto
            </Link>
          </div>
        </div>

        {/* Resumen */}
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {tiles.map((t) => (
            <div key={t.label} className="rounded-2xl border border-line bg-surface-1 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">{t.label}</p>
              <p className="font-mono-num mt-2 text-2xl font-bold text-ink">{t.value}</p>
              <p className="mt-1 text-xs text-ink-muted">{t.sub}</p>
            </div>
          ))}
        </div>

        {/* Filtros y búsqueda */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {filtros.map((f) => {
              const active = filtro === f.value;
              return (
                <Link
                  key={f.label}
                  href={f.value ? `/presupuesto/crm?estado=${f.value}` : "/presupuesto/crm"}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-accent text-white"
                      : "border border-line bg-surface-1 text-ink-muted hover:border-accent hover:text-accent"
                  }`}
                >
                  {f.label} ({f.count})
                </Link>
              );
            })}
          </div>
          <form action="/presupuesto/crm" className="flex items-center gap-2">
            {filtro && <input type="hidden" name="estado" value={filtro} />}
            <input
              type="search"
              name="q"
              defaultValue={q ?? ""}
              placeholder="Buscar cliente, matrícula o teléfono…"
              className="w-64 max-w-full rounded-xl border border-line bg-surface-1 px-3.5 py-2 text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
            {q && (
              <Link
                href={filtro ? `/presupuesto/crm?estado=${filtro}` : "/presupuesto/crm"}
                className="text-xs font-semibold text-ink-faint hover:text-ink"
              >
                Limpiar
              </Link>
            )}
          </form>
        </div>

        {/* Tabla */}
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-surface-1">
          {visibles.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-ink-muted">
                {all.length === 0
                  ? "Todavía no hay presupuestos registrados."
                  : query
                    ? "Ningún presupuesto coincide con la búsqueda."
                    : "No hay presupuestos con este estado."}
              </p>
              {all.length === 0 && (
                <Link
                  href="/presupuesto/nuevo"
                  className="mt-4 inline-block rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
                >
                  Crear el primero
                </Link>
              )}
            </div>
          ) : (
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="bg-surface-2 text-left text-xs uppercase tracking-wider text-ink-muted">
                  <th className="px-4 py-2.5 font-semibold">Fecha</th>
                  <th className="px-4 py-2.5 font-semibold">Cliente</th>
                  <th className="px-4 py-2.5 font-semibold">Matrícula</th>
                  <th className="px-4 py-2.5 font-semibold">Piezas</th>
                  <th className="px-4 py-2.5 font-semibold text-right">Total</th>
                  <th className="px-4 py-2.5 font-semibold">Estado</th>
                  <th className="px-4 py-2.5 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {visibles.map((r) => {
                  const wa = r.customerPhone ? waLink(r.customerPhone) : null;
                  const resumen =
                    r.items.length === 1
                      ? r.items[0].name
                      : `${r.items[0].name} +${r.items.length - 1} más`;
                  return (
                    <tr key={r.id} className="border-t border-line align-top even:bg-surface-2/40">
                      <td className="whitespace-nowrap px-4 py-3 text-ink-muted">
                        {fecha.format(new Date(r.createdAt))}
                        {r.status === "pagado" && r.paidAt && (
                          <p className="mt-0.5 text-xs text-success">
                            Cobrado {fecha.format(new Date(r.paidAt))}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-ink">{r.customerName || "Sin nombre"}</p>
                        {r.customerPhone &&
                          (wa ? (
                            <a
                              href={wa}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono-num text-xs text-success hover:underline"
                            >
                              {r.customerPhone} · WhatsApp
                            </a>
                          ) : (
                            <p className="font-mono-num text-xs text-ink-faint">{r.customerPhone}</p>
                          ))}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span className="font-mono-num text-ink-muted">{r.plate || "—"}</span>
                      </td>
                      <td className="max-w-[220px] px-4 py-3">
                        <p className="truncate text-ink-muted" title={r.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}>
                          {resumen}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        <span className="font-mono-num font-semibold text-ink">{eur.format(r.total)}</span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <StatusBadge record={r} />
                      </td>
                      <td className="px-4 py-3">
                        <QuoteActions id={r.id} status={r.status} d={r.d} s={r.s} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink">← Volver a RECAMBIA</Link>
        </p>
      </div>
    </main>
  );
}
