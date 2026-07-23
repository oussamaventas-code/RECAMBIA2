import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PagarButton } from "@/components/presupuesto/PagarButton";
import { BizumPayment } from "@/components/presupuesto/BizumPayment";
import { verifyAndDecodeQuote, quoteTotal, quoteVatBreakdown, quoteValidUntil, bizumConcept } from "@/lib/quote";
import { whatsappGenericUrl } from "@/lib/whatsapp";
import { getBizumPhone, LEGAL } from "@/lib/site-config";
import { findQuoteByData, type QuoteStatus } from "@/lib/crm-store";
import { DescargarPresupuestoButton } from "@/components/presupuesto/DescargarPresupuestoButton";

const fechaLarga = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Madrid",
});

// Mientras los datos legales sigan sin rellenar (placeholders entre
// corchetes), no se muestran al cliente: es peor enseñar "[NIF]" en un
// presupuesto real que no enseñar nada.
const legalConfigurado = !LEGAL.businessName.startsWith("[");

export const metadata: Metadata = {
  title: "Tu presupuesto",
  robots: { index: false, follow: false },
};

interface PresupuestoPageProps {
  searchParams: Promise<{ d?: string; s?: string }>;
}

export default async function PresupuestoPage({ searchParams }: PresupuestoPageProps) {
  const { d, s } = await searchParams;
  const quote = d && s ? verifyAndDecodeQuote(d, s) : null;

  // Estado real en el CRM: evita mostrar los botones de pago si el
  // presupuesto ya está cobrado, perdido o cancelado. Si la consulta falla,
  // se trata como "desconocido" y se dejan los botones de pago disponibles.
  let crmStatus: QuoteStatus | null = null;
  if (quote && d) {
    try {
      const record = await findQuoteByData(d);
      crmStatus = record?.status ?? null;
    } catch (err) {
      console.error("CRM: no se pudo comprobar el estado del presupuesto:", err);
    }
  }

  const bizumPhone = getBizumPhone();

  return (
    <>
      <div className="print:hidden">
        <Nav />
      </div>
      <main className="flex-1 bg-paper py-10 print:bg-white print:py-0">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 print:max-w-none print:px-0">
          {!quote ? (
            <div className="rounded-2xl border border-line bg-surface-1 p-8 text-center shadow-sm">
              <h1 className="font-display text-2xl text-ink">Presupuesto no válido</h1>
              <p className="mt-3 text-sm text-ink-muted">
                Este link no es correcto o ha caducado. Escríbenos por WhatsApp y te lo volvemos a
                mandar.
              </p>
              <a
                href={whatsappGenericUrl("Hola, mi presupuesto no me carga la página. ¿Me lo enviáis de nuevo?")}
                target="_blank"
                rel="noopener noreferrer"
                data-origen="presupuesto-invalido"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-success px-5 py-3 text-sm font-semibold text-white hover:bg-success-glow"
              >
                Escríbenos por WhatsApp &rarr;
              </a>
            </div>
          ) : (
            <div className="rounded-2xl border border-line bg-surface-1 p-6 shadow-sm sm:p-8 print:border-0 print:p-0 print:shadow-none">
              <div className="flex items-start justify-between gap-4">
                <h1 className="font-display text-2xl text-ink sm:text-3xl">Tu presupuesto</h1>
                <div className="print:hidden">
                  <DescargarPresupuestoButton />
                </div>
              </div>
              {quote.customerName && (
                <p className="mt-1 text-sm text-ink-muted">Para {quote.customerName}</p>
              )}
              {quote.plate && (
                <p className="mt-1 text-sm text-ink-muted">
                  Matrícula:{" "}
                  <span className="font-mono-num font-semibold text-ink">{quote.plate}</span>
                </p>
              )}
              {(() => {
                const validUntil = quoteValidUntil(quote);
                return (
                  validUntil && (
                    <p className="mt-1 text-sm text-ink-muted">
                      Válido hasta el{" "}
                      <span className="font-semibold text-ink">{fechaLarga.format(validUntil)}</span>
                    </p>
                  )
                );
              })()}
              {legalConfigurado && (
                <p className="mt-3 text-xs text-ink-faint">
                  Emitido por {LEGAL.businessName} · NIF {LEGAL.nif} · {LEGAL.address}
                </p>
              )}

              <div className="mt-6 rounded-xl border border-line overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-surface-2 text-left text-xs uppercase tracking-wider text-ink-muted">
                      <th className="px-4 py-2.5 font-semibold">Pieza</th>
                      <th className="px-4 py-2.5 font-semibold text-right">Cant.</th>
                      <th className="px-4 py-2.5 font-semibold text-right">Precio</th>
                      <th className="px-4 py-2.5 font-semibold text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quote.items.map((item, idx) => (
                      <tr key={idx} className="border-t border-line even:bg-surface-2/40">
                        <td className="px-4 py-3">
                          <p className="font-medium text-ink">{item.name}</p>
                          {item.ref && (
                            <p className="font-mono-num text-xs text-ink-faint">Ref. {item.ref}</p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right text-ink-muted">{item.qty}</td>
                        <td className="px-4 py-3 text-right font-mono-num text-ink-muted">
                          {item.unitPrice.toFixed(2)} €
                        </td>
                        <td className="px-4 py-3 text-right font-mono-num font-semibold text-ink">
                          {(item.qty * item.unitPrice).toFixed(2)} €
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {(() => {
                const { base, vat, total } = quoteVatBreakdown(quote);
                return (
                  <div className="mt-4 space-y-1.5 border-t border-line pt-4">
                    <div className="flex items-center justify-between text-sm text-ink-muted">
                      <span>Base imponible</span>
                      <span className="font-mono-num">{base.toFixed(2)} €</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-ink-muted">
                      <span>IVA (21%)</span>
                      <span className="font-mono-num">{vat.toFixed(2)} €</span>
                    </div>
                    <div className="flex items-center justify-between pt-1.5">
                      <span className="text-sm font-semibold text-ink">Total (IVA incluido)</span>
                      <span className="font-mono-num text-2xl font-extrabold text-ink">
                        {total.toFixed(2)} €
                      </span>
                    </div>
                  </div>
                );
              })()}

              {quote.note && (
                <p className="mt-4 rounded-lg bg-surface-2 p-3 text-sm text-ink-muted">
                  {quote.note}
                </p>
              )}

              {crmStatus === "pagado" ? (
                <div className="mt-8 rounded-xl border border-success/30 bg-success/5 p-5 text-center print:hidden">
                  <p className="text-sm font-semibold text-success">✓ Este presupuesto ya está pagado</p>
                  <p className="mt-1 text-xs text-ink-muted">
                    Si tienes cualquier duda sobre tu pedido, escríbenos por WhatsApp.
                  </p>
                </div>
              ) : crmStatus === "cancelado" || crmStatus === "perdido" ? (
                <div className="mt-8 rounded-xl border border-line bg-surface-2 p-5 text-center print:hidden">
                  <p className="text-sm font-semibold text-ink">Este presupuesto ha sido cancelado</p>
                  <p className="mt-1 text-xs text-ink-muted">
                    Escríbenos por WhatsApp si crees que se trata de un error o quieres uno nuevo.
                  </p>
                </div>
              ) : (
                <div className="mt-8 space-y-4 print:hidden">
                  {bizumPhone && (
                    <BizumPayment
                      phone={bizumPhone}
                      amount={quoteTotal(quote)}
                      concept={bizumConcept(quote)}
                    />
                  )}
                  {bizumPhone && (
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-line" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">o</span>
                      <div className="h-px flex-1 bg-line" />
                    </div>
                  )}
                  <PagarButton d={d!} s={s!} amount={quoteTotal(quote)} />
                </div>
              )}

              <p className="mt-4 text-center text-xs text-ink-faint print:hidden">
                ¿Prefieres pagar de otra forma?{" "}
                <a
                  href={whatsappGenericUrl(`Hola, quiero pagar mi presupuesto de otra forma (matrícula: ${quote.plate ?? "-"}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-origen="presupuesto-pagar-otra-forma"
                  className="text-accent hover:underline"
                >
                  Escríbenos por WhatsApp
                </a>
              </p>
            </div>
          )}

          <p className="mt-6 text-center text-xs text-ink-faint print:hidden">
            <Link href="/" className="hover:text-ink">Volver a RECAMBIA</Link>
          </p>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}
