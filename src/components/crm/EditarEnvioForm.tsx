"use client";

import { useState, useTransition } from "react";
import { actualizarEnvioAction } from "@/app/presupuesto/crm/actions";
import type { ShippingStatus } from "@/lib/crm-store";

interface EditarEnvioFormProps {
  id: string;
  shippingStatus?: ShippingStatus;
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
}

const field =
  "w-full rounded-xl border border-line bg-surface-2 px-3.5 py-2 text-sm text-ink outline-none focus:border-accent";
const label = "mb-1 block text-xs font-semibold text-ink-muted";

export function EditarEnvioForm({ id, shippingStatus, carrier, trackingNumber, trackingUrl }: EditarEnvioFormProps) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSubmit(formData: FormData) {
    formData.set("id", id);
    startTransition(async () => {
      await actualizarEnvioAction(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <form action={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div>
        <label className={label} htmlFor="shippingStatus">Estado</label>
        <select
          id="shippingStatus"
          name="shippingStatus"
          defaultValue={shippingStatus ?? ""}
          className={field}
        >
          <option value="">Sin enviar</option>
          <option value="preparando">Preparando</option>
          <option value="enviado">Enviado</option>
          <option value="entregado">Entregado</option>
        </select>
      </div>
      <div>
        <label className={label} htmlFor="carrier">Transportista</label>
        <input id="carrier" name="carrier" defaultValue={carrier ?? ""} placeholder="Correos, Seur…" className={field} />
      </div>
      <div>
        <label className={label} htmlFor="trackingNumber">Nº de seguimiento</label>
        <input id="trackingNumber" name="trackingNumber" defaultValue={trackingNumber ?? ""} className={field} />
      </div>
      <div>
        <label className={label} htmlFor="trackingUrl">Link de seguimiento</label>
        <input
          id="trackingUrl"
          name="trackingUrl"
          type="url"
          defaultValue={trackingUrl ?? ""}
          placeholder="https://..."
          className={field}
        />
      </div>

      <div className="flex items-center gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
        >
          {pending ? "Guardando…" : "Guardar envío"}
        </button>
        {saved && <span className="text-xs font-semibold text-success">✓ Guardado</span>}
      </div>
    </form>
  );
}
