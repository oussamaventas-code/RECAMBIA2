import { NextRequest, NextResponse } from "next/server";
import { verifyAndDecodeQuote } from "@/lib/quote";
import { getStripe } from "@/lib/stripe";
import { findQuoteByData } from "@/lib/crm-store";

const checkoutAttempts = new Map<string, { count: number; expires: number }>();

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown_ip";
  const now = Date.now();
  const attempt = checkoutAttempts.get(ip);
  if (attempt && attempt.expires > now) {
    if (attempt.count >= 10) {
      return NextResponse.json({ error: "Demasiados intentos. Por favor, espera un momento." }, { status: 429 });
    }
    attempt.count++;
  } else {
    checkoutAttempts.set(ip, { count: 1, expires: now + 60 * 1000 }); // 10 checkouts per min
  }

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

  const plateStr = quote.plate ? String(quote.plate).slice(0, 100) : "";
  const customerStr = quote.customerName ? String(quote.customerName).slice(0, 100) : "";

  const origin = new URL(request.url).origin;

  // Vincula el pago con la ficha del CRM para que el webhook la marque pagada,
  // y evita cobrar dos veces un presupuesto ya pagado o cancelado.
  let crmId = "";
  try {
    const record = await findQuoteByData(d);
    if (record) {
      if (record.status === "pagado") {
        return NextResponse.json({ error: "Este presupuesto ya está pagado." }, { status: 409 });
      }
      if (record.status === "cancelado") {
        return NextResponse.json({ error: "Este presupuesto ha sido cancelado." }, { status: 409 });
      }
      crmId = record.id;
    }
  } catch (err) {
    console.error("CRM: no se pudo localizar la ficha del presupuesto:", err);
  }

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
            name: String(item.name).slice(0, 200),
            ...(item.ref ? { description: `Ref. OEM ${String(item.ref).slice(0, 100)}` } : {}),
          },
        },
      })),
      success_url: `${origin}/presupuesto/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/presupuesto?d=${encodeURIComponent(d)}&s=${encodeURIComponent(s)}`,
      metadata: {
        plate: plateStr,
        customerName: customerStr,
        crmId,
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Error interno al conectar con la pasarela de pago." }, { status: 502 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json({ error: "Ha ocurrido un error inesperado al iniciar el pago." }, { status: 500 });
  }
}
