import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getQuote, markQuotePaid } from "@/lib/crm-store";

// Configurado en el dashboard de Stripe apuntando a /api/stripe/webhook.
// Confirma pagos server-side aunque el cliente cierre la pestaña tras pagar.
export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook no configurado" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Error validando firma de webhook de Stripe:", err);
    return NextResponse.json({ error: "Firma inválida" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Presupuesto pagado", {
      sessionId: session.id,
      amountTotal: session.amount_total,
      plate: session.metadata?.plate,
      customerName: session.metadata?.customerName,
    });

    // Marca la ficha del CRM como pagada. Si falla, se responde 200 igualmente
    // (Stripe reintentaría el webhook entero); el pago siempre queda en Stripe
    // y se puede marcar a mano desde /presupuesto/crm.
    const crmId = session.metadata?.crmId;
    if (crmId) {
      try {
        // Comprobación de coherencia: el importe cobrado debe cuadrar con el
        // total del presupuesto. El checkout ya construye los line_items a
        // partir del quote firmado (no hay forma de manipularlo desde el
        // cliente), así que un desajuste aquí sería anómalo — se registra
        // pero no bloquea el marcado como pagado, porque el cobro en Stripe
        // ya es un hecho consumado.
        const record = await getQuote(crmId);
        if (record && session.amount_total != null) {
          const expectedCents = Math.round(record.total * 100);
          if (expectedCents !== session.amount_total) {
            console.error(
              `CRM: importe cobrado (${session.amount_total}) no coincide con el total de la ficha ${crmId} (${expectedCents})`,
            );
          }
        }

        const updated = await markQuotePaid(crmId, "stripe", session.id);
        if (!updated) console.error(`CRM: ficha ${crmId} no encontrada al marcar pago de Stripe`);
      } catch (err) {
        console.error("CRM: error marcando presupuesto como pagado:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
