import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

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
    // No hay base de datos propia: el registro de pagos vive en el dashboard
    // de Stripe. Si en el futuro queréis notificaros automáticamente (email,
    // WhatsApp Business API...), este es el sitio para engancharlo.
    console.log("Presupuesto pagado", {
      sessionId: session.id,
      amountTotal: session.amount_total,
      plate: session.metadata?.plate,
      customerName: session.metadata?.customerName,
    });
  }

  return NextResponse.json({ received: true });
}
