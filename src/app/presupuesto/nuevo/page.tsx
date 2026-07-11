import { PresupuestoBuilder } from "@/components/presupuesto/PresupuestoBuilder";

export default function NuevoPresupuestoPage() {
  return (
    <main className="min-h-[100dvh] bg-paper px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-2xl text-ink sm:text-3xl">Crear presupuesto</h1>
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
