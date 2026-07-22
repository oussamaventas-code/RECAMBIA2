"use client";

import { useState, useTransition } from "react";
import { actualizarVehiculoAction } from "@/app/presupuesto/crm/actions";

interface EditarVehiculoFormProps {
  id: string;
  plate?: string;
  vin?: string;
  brand?: string;
  model?: string;
}

const field =
  "w-full rounded-xl border border-line bg-surface-2 px-3.5 py-2 text-sm text-ink outline-none focus:border-accent";
const label = "mb-1 block text-xs font-semibold text-ink-muted";

// Ficha del cliente: un solo vehículo por cliente, de momento. Reutiliza el
// mismo registro del CRM (plate ya existía; vin/brand/model son nuevos).
export function EditarVehiculoForm({ id, plate, vin, brand, model }: EditarVehiculoFormProps) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSubmit(formData: FormData) {
    formData.set("id", id);
    startTransition(async () => {
      await actualizarVehiculoAction(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <form action={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div>
        <label className={label} htmlFor="plate">Matrícula</label>
        <input id="plate" name="plate" defaultValue={plate ?? ""} placeholder="0000 BBB" className={field} />
      </div>
      <div>
        <label className={label} htmlFor="vin">Bastidor (VIN)</label>
        <input id="vin" name="vin" defaultValue={vin ?? ""} placeholder="WVWZZZ1KZ..." className={field} />
      </div>
      <div>
        <label className={label} htmlFor="brand">Marca</label>
        <input id="brand" name="brand" defaultValue={brand ?? ""} placeholder="Volkswagen" className={field} />
      </div>
      <div>
        <label className={label} htmlFor="model">Modelo</label>
        <input id="model" name="model" defaultValue={model ?? ""} placeholder="Golf V" className={field} />
      </div>

      <div className="flex items-center gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
        >
          {pending ? "Guardando…" : "Guardar vehículo"}
        </button>
        {saved && <span className="text-xs font-semibold text-success">✓ Guardado</span>}
      </div>
    </form>
  );
}
