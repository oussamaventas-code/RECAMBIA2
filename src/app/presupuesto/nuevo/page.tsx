import Link from "next/link";
import { PresupuestoBuilder } from "@/components/presupuesto/PresupuestoBuilder";
import { getQuote } from "@/lib/crm-store";

interface NuevoPresupuestoPageProps {
  searchParams: Promise<{ lead?: string }>;
}

export default async function NuevoPresupuestoPage({ searchParams }: NuevoPresupuestoPageProps) {
  const { lead } = await searchParams;
  // Al llegar desde "Montar presupuesto →" en el CRM: precarga los datos del
  // lead para no volver a teclearlos. Si el id no existe o ya no es un lead
  // (alguien lo montó entre tanto), sencillamente se ignora y el formulario
  // arranca en blanco.
  const leadRecord = lead ? await getQuote(lead) : null;
  const leadData = leadRecord && leadRecord.status === "lead" ? leadRecord : null;

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
        {leadData && (
          <p className="mt-3 rounded-lg border border-accent/20 bg-accent/5 px-3 py-2 text-xs text-accent-dark">
            Montando presupuesto a partir del lead de {leadData.customerName || leadData.plate || "este contacto"}.
          </p>
        )}
        <PresupuestoBuilder
          leadId={leadData?.id}
          initialName={leadData?.customerName}
          initialPhone={leadData?.customerPhone}
          initialPlate={leadData?.plate}
          initialNote={leadData?.note}
        />
      </div>
    </main>
  );
}
