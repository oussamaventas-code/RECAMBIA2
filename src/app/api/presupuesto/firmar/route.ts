import { NextRequest, NextResponse } from "next/server";
import { buildSignedQuote, type Quote } from "@/lib/quote";
import { createQuoteRecord } from "@/lib/crm-store";

// Protegido por middleware (cookie de admin) — ver src/middleware.ts.
export async function POST(request: NextRequest) {
  let quote: Quote;
  let customerPhone: string | undefined;
  try {
    const body = await request.json();
    // El teléfono se guarda solo en el CRM, nunca dentro del link firmado.
    customerPhone = typeof body.customerPhone === "string" ? body.customerPhone.trim().slice(0, 30) || undefined : undefined;
    delete body.customerPhone;
    quote = body;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!Array.isArray(quote.items) || quote.items.length === 0) {
    return NextResponse.json({ error: "El presupuesto necesita al menos una línea" }, { status: 400 });
  }

  // Sanitizar longitudes para evitar payloads masivos
  if (quote.customerName && quote.customerName.length > 100) {
    quote.customerName = quote.customerName.substring(0, 100);
  }
  if (quote.plate && quote.plate.length > 50) {
    quote.plate = quote.plate.substring(0, 50);
  }
  if (quote.note && quote.note.length > 1000) {
    quote.note = quote.note.substring(0, 1000);
  }

  for (const item of quote.items) {
    if (!item.name || typeof item.qty !== "number" || item.qty <= 0 || typeof item.unitPrice !== "number" || item.unitPrice < 0) {
      return NextResponse.json({ error: "Línea de presupuesto inválida" }, { status: 400 });
    }
    if (item.name.length > 200) item.name = item.name.substring(0, 200);
    if (item.ref && item.ref.length > 100) item.ref = item.ref.substring(0, 100);
  }

  try {
    const { d, s } = buildSignedQuote(quote);

    // Alta en el CRM. Si fallara el guardado, el link sigue siendo válido:
    // no se bloquea la venta por un problema de registro.
    let crmId: string | null = null;
    try {
      const record = await createQuoteRecord(quote, { d, s }, customerPhone);
      crmId = record.id;
    } catch (err) {
      console.error("Error guardando presupuesto en el CRM:", err);
    }

    return NextResponse.json({ d, s, crmId });
  } catch (err) {
    console.error("Error al firmar presupuesto:", err);
    return NextResponse.json({ error: "Ha ocurrido un error al generar la firma." }, { status: 500 });
  }
}
