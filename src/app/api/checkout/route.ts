import { NextRequest, NextResponse } from "next/server";
import { verifyAndDecodeQuote } from "@/lib/quote";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  let body: { d?: string; s?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { d, s } = body;
  if (!d || !s) {
    return NextResponse.json({ error: "Presupuesto incompleto" }, { status: 400 });
  }

  const quote = verifyAndDecodeQuote(d, s);
  if (!quote) {
    return NextResponse.json({ error: "Este presupuesto no es válido o ha sido modificado" }, { status: 400 });
  }

  const origin = new URL(request.url).origin;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: quote.items.map((item) => ({
        quantity: item.qty,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(item.unitPrice * 100),
          product_data: {
            name: item.name,
            ...(item.ref ? { description: `Ref. OEM ${item.ref}` } : {}),
          },
        },
      })),
      success_url: `${origin}/presupuesto/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/presupuesto?d=${encodeURIComponent(d)}&s=${encodeURIComponent(s)}`,
      metadata: {
        plate: quote.plate ?? "",
        customerName: quote.customerName ?? "",
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Stripe no devolvió una URL de pago" }, { status: 502 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
