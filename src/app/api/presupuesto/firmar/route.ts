import { NextRequest, NextResponse } from "next/server";
import { buildSignedQuote, type Quote } from "@/lib/quote";

// Protegido por middleware (cookie de admin) — ver src/middleware.ts.
export async function POST(request: NextRequest) {
  let quote: Quote;
  try {
    quote = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!Array.isArray(quote.items) || quote.items.length === 0) {
    return NextResponse.json({ error: "El presupuesto necesita al menos una línea" }, { status: 400 });
  }

  for (const item of quote.items) {
    if (!item.name || typeof item.qty !== "number" || item.qty <= 0 || typeof item.unitPrice !== "number" || item.unitPrice < 0) {
      return NextResponse.json({ error: "Línea de presupuesto inválida" }, { status: 400 });
    }
  }

  try {
    const { d, s } = buildSignedQuote(quote);
    return NextResponse.json({ d, s });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
