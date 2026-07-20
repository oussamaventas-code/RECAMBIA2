import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveLead } from "@/lib/leads-store";
import { DISCOUNT } from "@/lib/site-config";

// Captura de email a cambio del descuento de bienvenida. Ruta pública (no pasa
// por el middleware de admin). Guarda el lead y devuelve el código para que el
// cliente lo use por WhatsApp al pedir.

const bodySchema = z.object({
  email: z.string().trim().toLowerCase().email().max(200),
  // Consentimiento RGPD: tiene que venir true sí o sí.
  consent: z.literal(true),
  source: z.enum(["portada", "popup"]).optional(),
  // Honeypot antibots: campo oculto que un humano deja vacío.
  website: z.string().max(0).optional().or(z.literal("")),
});

const attempts = new Map<string, { count: number; expires: number }>();

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown_ip";
  const now = Date.now();
  const a = attempts.get(ip);
  if (a && a.expires > now) {
    if (a.count >= 5) {
      return NextResponse.json({ error: "Demasiados intentos. Espera un momento." }, { status: 429 });
    }
    a.count++;
  } else {
    attempts.set(ip, { count: 1, expires: now + 60 * 1000 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    const paths = parsed.error.issues.map((i) => i.path[0]);
    // El honeypot (website) relleno = bot: lo cortamos sin pistas.
    if (paths.includes("website")) {
      return NextResponse.json({ ok: true, code: DISCOUNT.code }, { status: 200 });
    }
    const msg = paths.includes("email")
      ? "Escribe un email válido."
      : "Tienes que aceptar la política de privacidad.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const { email, consent, source } = parsed.data;

  try {
    const result = await saveLead({ email, consent, source, discountCode: DISCOUNT.code });
    // Tanto si es nuevo como si ya existía, devolvemos el código: la
    // experiencia del cliente es la misma y no revelamos si ya estaba.
    return NextResponse.json({
      ok: true,
      alreadySubscribed: result === "exists",
      code: DISCOUNT.code,
    });
  } catch (err) {
    console.error("Lead: error guardando email:", err);
    return NextResponse.json({ error: "No hemos podido guardar tu email. Inténtalo de nuevo." }, { status: 500 });
  }
}
