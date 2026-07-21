"use client";

import { useRef, useState, useTransition } from "react";
import { crearLeadAction } from "@/app/presupuesto/crm/actions";

// Alta de un contacto de WhatsApp en los primeros segundos de la
// conversación. Sin esto, todo lead que no llega a presupuesto queda
// invisible en el CRM y no se puede medir la tasa real lead→venta.
export function NuevoLeadForm() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await crearLeadAction(formData);
      formRef.current?.reset();
      setOpen(false);
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl border border-dashed border-line-strong bg-surface-1 px-4 py-2.5 text-sm font-semibold text-ink-muted hover:border-accent hover:text-accent"
      >
        + Registrar contacto de WhatsApp
      </button>
    );
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="rounded-2xl border border-line bg-surface-1 p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-ink">Nuevo contacto de WhatsApp</h2>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs font-semibold text-ink-faint hover:text-ink"
        >
          Cerrar
        </button>
      </div>
      <p className="mt-1 text-xs text-ink-muted">
        Regístralo en cuanto entre el mensaje, aunque todavía no sepas qué pieza necesita. Luego
        podrás montarle el presupuesto desde aquí mismo.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          name="customerName"
          placeholder="Nombre del cliente"
          className="rounded-xl border border-line bg-surface-2 px-3.5 py-2 text-sm text-ink outline-none focus:border-accent"
        />
        <input
          name="customerPhone"
          type="tel"
          placeholder="Teléfono / WhatsApp"
          className="rounded-xl border border-line bg-surface-2 px-3.5 py-2 text-sm text-ink outline-none focus:border-accent"
        />
        <input
          name="plate"
          placeholder="Matrícula (opcional)"
          className="rounded-xl border border-line bg-surface-2 px-3.5 py-2 text-sm text-ink outline-none focus:border-accent"
        />
        <select
          name="source"
          defaultValue=""
          className="rounded-xl border border-line bg-surface-2 px-3.5 py-2 text-sm text-ink outline-none focus:border-accent"
        >
          <option value="">Origen (opcional)</option>
          <option value="whatsapp_directo">WhatsApp directo</option>
          <option value="meta_ads">Anuncio Meta</option>
          <option value="web">Web</option>
          <option value="referido">Referido</option>
          <option value="taller">Taller / B2B</option>
          <option value="otro">Otro</option>
        </select>
        <input
          name="owner"
          placeholder="Quién le atiende (opcional)"
          className="rounded-xl border border-line bg-surface-2 px-3.5 py-2 text-sm text-ink outline-none focus:border-accent sm:col-span-2"
        />
        <textarea
          name="note"
          placeholder="Qué busca / síntoma (opcional)"
          rows={2}
          className="rounded-xl border border-line bg-surface-2 px-3.5 py-2 text-sm text-ink outline-none focus:border-accent sm:col-span-2"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-4 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
      >
        {pending ? "Guardando…" : "Guardar contacto"}
      </button>
    </form>
  );
}
