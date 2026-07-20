import { createHmac, timingSafeEqual } from "crypto";

export interface QuoteItem {
  name: string;
  ref?: string;
  qty: number;
  // Precio unitario en euros, IVA incluido (mismo criterio que el resto de la web).
  unitPrice: number;
}

export interface Quote {
  customerName?: string;
  plate?: string;
  note?: string;
  items: QuoteItem[];
  // Momento de la firma (epoch ms). Lo añade buildSignedQuote; no lo rellena
  // el creador del presupuesto ni se muestra en pantalla.
  iat?: number;
}

// Los links de presupuesto caducan a los 30 días de generarse (evita que un
// link firmado quede válido para siempre si se filtra o queda indexado).
const QUOTE_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

function getQuoteSecret(): string {
  const secret = process.env.QUOTE_SIGNING_SECRET;
  if (!secret) {
    throw new Error(
      "Falta QUOTE_SIGNING_SECRET en las variables de entorno. Genera una cadena aleatoria y añádela antes de crear o cobrar presupuestos.",
    );
  }
  return secret;
}

function base64url(input: Buffer): string {
  return input.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64url(input: string): Buffer {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(input.length + ((4 - (input.length % 4)) % 4), "=");
  return Buffer.from(padded, "base64");
}

export function quoteTotal(quote: Quote): number {
  return quote.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
}

// Concepto automático para que el cliente lo copie tal cual en su app del
// banco: así se identifica el Bizum al cruzarlo con el CRM.
export function bizumConcept(quote: Quote): string {
  const ref = quote.plate?.trim() || quote.customerName?.trim();
  return ref ? `RECAMBIA ${ref}` : "RECAMBIA presupuesto";
}

export function encodeQuote(quote: Quote): string {
  return base64url(Buffer.from(JSON.stringify(quote), "utf-8"));
}

export function signQuoteData(data: string): string {
  const hmac = createHmac("sha256", getQuoteSecret()).update(data).digest();
  return base64url(hmac);
}

// Construye el par (d, s) que va en la URL del presupuesto: d = datos, s = firma.
export function buildSignedQuote(quote: Quote): { d: string; s: string } {
  const d = encodeQuote({ ...quote, iat: Date.now() });
  return { d, s: signQuoteData(d) };
}

// Verifica la firma y decodifica. Devuelve null si la firma no coincide, el
// payload está corrupto o el link ha caducado — así no se puede manipular
// para bajar precios ni queda válido para siempre.
export function verifyAndDecodeQuote(d: string, s: string): Quote | null {
  try {
    const expected = signQuoteData(d);
    const a = Buffer.from(expected);
    const b = Buffer.from(s);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    const json = fromBase64url(d).toString("utf-8");
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed.items)) return null;
    if (typeof parsed.iat === "number" && Date.now() - parsed.iat > QUOTE_MAX_AGE_MS) {
      return null;
    }
    return parsed as Quote;
  } catch {
    return null;
  }
}
