import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { getStripe } from "@/lib/stripe";
import { whatsappGenericUrl } from "@/lib/whatsapp";
import { PurchaseTracker } from "@/components/presupuesto/PurchaseTracker";

export const metadata: Metadata = {
  title: "Pago confirmado",
  robots: { index: false, follow: false },
};

interface GraciasPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function GraciasPage({ searchParams }: GraciasPageProps) {
  const { session_id } = await searchParams;

  let paid = false;
  let amountTotal: number | null = null;

  if (session_id) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(session_id);
      paid = session.payment_status === "paid";
      amountTotal = session.amount_total ? session.amount_total / 100 : null;
    } catch {
      paid = false;
    }
  }

  return (
    <>
      <Nav />
      <main className="flex-1 bg-paper py-16">
        <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
          {paid && amountTotal !== null && session_id && (
            <PurchaseTracker amount={amountTotal} eventId={session_id} />
          )}
          {paid ? (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="mt-6 font-display text-2xl text-ink sm:text-3xl">¡Pago recibido!</h1>
              <p className="mt-3 text-sm text-ink-muted">
                {amountTotal !== null
                  ? `Hemos cobrado ${amountTotal.toFixed(2)} €. `
                  : ""}
                Prepararemos tu pedido y te avisamos por WhatsApp con los detalles de entrega.
              </p>
            </>
          ) : (
            <>
              <h1 className="font-display text-2xl text-ink sm:text-3xl">No hemos podido confirmar el pago</h1>
              <p className="mt-3 text-sm text-ink-muted">
                Si has completado el pago y ves este mensaje, escríbenos por WhatsApp y lo revisamos.
              </p>
            </>
          )}

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={whatsappGenericUrl("Hola, acabo de pagar un presupuesto en la web.")}
              target="_blank"
              rel="noopener noreferrer"
              data-origen="gracias"
              className="inline-flex items-center justify-center rounded-xl bg-success px-5 py-3 text-sm font-semibold text-white hover:bg-success-glow"
            >
              Escríbenos por WhatsApp &rarr;
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-line-strong px-5 py-3 text-sm font-medium text-ink hover:border-accent hover:text-accent"
            >
              Volver a RECAMBIA
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
