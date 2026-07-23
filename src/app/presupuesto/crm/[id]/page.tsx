import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuote, listCasesForQuote } from "@/lib/crm-store";
import { EditarVehiculoForm } from "@/components/crm/EditarVehiculoForm";
import { EditarEnvioForm } from "@/components/crm/EditarEnvioForm";
import { CasosPostventa } from "@/components/crm/CasosPostventa";

export const metadata: Metadata = {
  title: "Ficha del cliente",
  robots: { index: false, follow: false },
};

// Siempre datos frescos: se edita desde aquí mismo.
export const dynamic = "force-dynamic";

function waLink(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9) return null;
  const full = digits.length === 9 ? `34${digits}` : digits;
  return `https://wa.me/${full}`;
}

interface FichaClientePageProps {
  params: Promise<{ id: string }>;
}

export default async function FichaClientePage({ params }: FichaClientePageProps) {
  const { id } = await params;
  const record = await getQuote(id);
  if (!record) notFound();
  const cases = await listCasesForQuote(id);

  const wa = record.customerPhone ? waLink(record.customerPhone) : null;

  return (
    <main className="min-h-[100dvh] bg-paper px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <Link href="/presupuesto/crm" className="text-xs font-semibold text-ink-faint hover:text-ink">
          ← Volver al CRM
        </Link>

        <div className="mt-4 rounded-2xl border border-line bg-surface-1 p-6 sm:p-8">
          <h1 className="font-display text-2xl text-ink">
            {record.customerName || record.plate || "Cliente sin nombre"}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            {record.customerPhone ? (
              wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="text-success hover:underline">
                  {record.customerPhone} · WhatsApp
                </a>
              ) : (
                record.customerPhone
              )
            ) : (
              "Sin teléfono registrado"
            )}
            {(record.owner || record.source) && (
              <span className="text-ink-faint"> · {[record.owner, record.source].filter(Boolean).join(" · ")}</span>
            )}
          </p>

          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-faint">Vehículo</h2>
            <p className="mt-1 text-xs text-ink-muted">
              Datos básicos para agilizar futuras consultas de recambios. Un solo vehículo por cliente,
              de momento.
            </p>
            <div className="mt-4">
              <EditarVehiculoForm
                id={record.id}
                plate={record.plate}
                vin={record.vin}
                brand={record.brand}
                model={record.model}
              />
            </div>
          </div>

          {record.status === "pagado" && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-faint">Envío</h2>
              <p className="mt-1 text-xs text-ink-muted">
                El cliente ve este estado y el link de seguimiento en su presupuesto.
              </p>
              <div className="mt-4">
                <EditarEnvioForm
                  id={record.id}
                  shippingStatus={record.shippingStatus}
                  carrier={record.carrier}
                  trackingNumber={record.trackingNumber}
                  trackingUrl={record.trackingUrl}
                />
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-faint">
              Garantías y devoluciones
            </h2>
            <p className="mt-1 text-xs text-ink-muted">
              El cliente ve el estado de su incidencia en el link del presupuesto.
            </p>
            <CasosPostventa quoteId={record.id} cases={cases} />
          </div>
        </div>
      </div>
    </main>
  );
}
