"use client";

import { useState, useTransition } from "react";
import { abrirCasoAction, actualizarCasoAction } from "@/app/presupuesto/crm/actions";
import type { CrmCase } from "@/lib/crm-store";

const field =
  "w-full rounded-xl border border-line bg-surface-2 px-3.5 py-2 text-sm text-ink outline-none focus:border-accent";
const label = "mb-1 block text-xs font-semibold text-ink-muted";

const TYPE_LABEL: Record<string, string> = { garantia: "Garantía", devolucion: "Devolución" };
const STATUS_LABEL: Record<string, string> = {
  abierto: "Abierto",
  en_revision: "En revisión",
  resuelto: "Resuelto",
  rechazado: "Rechazado",
};
const STATUS_CLASS: Record<string, string> = {
  abierto: "bg-warning/10 text-warning",
  en_revision: "bg-accent/10 text-accent",
  resuelto: "bg-success/10 text-success",
  rechazado: "bg-surface-3 text-ink-faint",
};

const fecha = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Madrid",
});

function CasoRow({ caso }: { caso: CrmCase }) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSubmit(formData: FormData) {
    formData.set("id", caso.id);
    formData.set("quoteId", caso.quoteId);
    startTransition(async () => {
      await actualizarCasoAction(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div className="rounded-xl border border-line bg-surface-2 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="text-sm font-semibold text-ink">{TYPE_LABEL[caso.type]}</span>
          <span className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_CLASS[caso.status]}`}>
            {STATUS_LABEL[caso.status]}
          </span>
        </div>
        <span className="text-xs text-ink-faint">Abierta {fecha.format(new Date(caso.createdAt))}</span>
      </div>
      {caso.reason && <p className="mt-2 text-sm text-ink-muted">{caso.reason}</p>}

      <form action={handleSubmit} className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[160px_1fr]">
        <div>
          <label className={label} htmlFor={`status-${caso.id}`}>Estado</label>
          <select id={`status-${caso.id}`} name="status" defaultValue={caso.status} className={field}>
            <option value="abierto">Abierto</option>
            <option value="en_revision">En revisión</option>
            <option value="resuelto">Resuelto</option>
            <option value="rechazado">Rechazado</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor={`resolution-${caso.id}`}>Resolución (para el cliente)</label>
          <input
            id={`resolution-${caso.id}`}
            name="resolution"
            defaultValue={caso.resolution ?? ""}
            placeholder="Se cambia la pieza, se reembolsa..."
            className={field}
          />
        </div>
        <div className="flex items-center gap-3 sm:col-span-2">
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
          >
            {pending ? "Guardando…" : "Actualizar incidencia"}
          </button>
          {saved && <span className="text-xs font-semibold text-success">✓ Guardado</span>}
        </div>
      </form>
    </div>
  );
}

interface CasosPostventaProps {
  quoteId: string;
  cases: CrmCase[];
}

export function CasosPostventa({ quoteId, cases }: CasosPostventaProps) {
  const [pending, startTransition] = useTransition();
  const [formKey, setFormKey] = useState(0);

  function handleNuevo(formData: FormData) {
    formData.set("quoteId", quoteId);
    startTransition(async () => {
      await abrirCasoAction(formData);
      setFormKey((k) => k + 1);
    });
  }

  return (
    <div className="mt-4 flex flex-col gap-3">
      {cases.map((c) => (
        <CasoRow key={c.id} caso={c} />
      ))}
      {cases.length === 0 && (
        <p className="text-xs text-ink-muted">Sin incidencias registradas para este pedido.</p>
      )}

      <form key={formKey} action={handleNuevo} className="mt-2 grid grid-cols-1 gap-3 rounded-xl border border-dashed border-line p-4 sm:grid-cols-[160px_1fr_auto]">
        <div>
          <label className={label} htmlFor="type">Nueva incidencia</label>
          <select id="type" name="type" defaultValue="devolucion" className={field}>
            <option value="devolucion">Devolución</option>
            <option value="garantia">Garantía</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="reason">Motivo</label>
          <input id="reason" name="reason" placeholder="No encaja, pieza defectuosa..." className={field} />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl border border-line-strong px-4 py-2.5 text-sm font-medium text-ink hover:border-accent hover:text-accent disabled:opacity-60"
          >
            {pending ? "Abriendo…" : "Abrir incidencia"}
          </button>
        </div>
      </form>
    </div>
  );
}
