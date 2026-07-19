import Link from "next/link";
import { PresupuestoBuilder } from "@/components/presupuesto/PresupuestoBuilder";

export default function NuevoPresupuestoPage() {
  return (
    <main className="min-h-[100dvh] bg-paper px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-2xl text-ink sm:text-3xl">Crear presupuesto</h1>
          <Link
            href="/presupuesto/crm"
            className="rounded-xl border border-line bg-surface-1 px-4 py-2 text-sm font-semibold text-ink-muted hover:border-accent hover:text-accent"
          >
            Ver CRM →
          </Link>
        </div>
        <p className="mt-2 text-sm text-ink-muted">
          Añade las piezas del catálogo o líneas personalizadas, genera el link y pégalo en el
          WhatsApp del cliente. El precio queda firmado: si alguien manipula el link, el pago se
          rechaza.
        </p>
        <PresupuestoBuilder />
      </div>
    </main>
  );
}
