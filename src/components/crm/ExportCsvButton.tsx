"use client";

import { useTransition } from "react";
import { exportCsvAction } from "@/app/presupuesto/crm/actions";

export function ExportCsvButton() {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const csv = await exportCsvAction();
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const fecha = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `recambia-crm-${fecha}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="rounded-xl border border-line bg-surface-1 px-4 py-2.5 text-sm font-semibold text-ink-muted hover:border-accent hover:text-accent disabled:opacity-60"
    >
      {pending ? "Exportando…" : "Exportar CSV"}
    </button>
  );
}
