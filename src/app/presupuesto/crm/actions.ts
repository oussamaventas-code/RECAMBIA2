"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE } from "@/lib/site-config";
import { verifySession } from "@/lib/session";
import {
  createLeadRecord,
  deleteQuoteRecord,
  getQuote,
  markQuotePaid,
  updateQuoteRecord,
  type LostReason,
  type PaymentMethod,
} from "@/lib/crm-store";

// El middleware ya protege /presupuesto/crm, pero las server actions se
// verifican también aquí por si algún día cambia el matcher.
async function requireAdmin(): Promise<void> {
  const store = await cookies();
  const cookie = store.get(ADMIN_COOKIE)?.value;
  const payload = cookie ? await verifySession(cookie) : null;
  if (payload !== "admin_auth") {
    throw new Error("No autorizado");
  }
}

const VALID_METHODS: PaymentMethod[] = ["stripe", "efectivo", "bizum", "transferencia", "otro"];
const VALID_LOST_REASONS: LostReason[] = [
  "precio",
  "no_contesta",
  "compro_otro_sitio",
  "pieza_no_disponible",
  "solo_consultaba",
  "otro",
];

// Alta rápida al primer mensaje de WhatsApp: sin esto, todo lead que no
// llega a presupuesto queda invisible en el CRM.
export async function crearLeadAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const str = (key: string) => {
    const v = String(formData.get(key) ?? "").trim();
    return v || undefined;
  };
  await createLeadRecord({
    customerName: str("customerName"),
    customerPhone: str("customerPhone"),
    plate: str("plate"),
    note: str("note"),
    source: str("source"),
    owner: str("owner"),
  });
  revalidatePath("/presupuesto/crm");
}

export async function marcarPagadoAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const metodoRaw = String(formData.get("metodo") ?? "");
  const metodo = VALID_METHODS.includes(metodoRaw as PaymentMethod)
    ? (metodoRaw as PaymentMethod)
    : "otro";
  if (!id) return;
  await markQuotePaid(id, metodo);
  revalidatePath("/presupuesto/crm");
}

export async function cancelarAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await updateQuoteRecord(id, { status: "cancelado" });
  revalidatePath("/presupuesto/crm");
}

// Presupuesto o lead que no cerró. El motivo es obligatorio y viene de una
// lista cerrada para que se pueda analizar (nada de texto libre).
export async function marcarPerdidoAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const motivoRaw = String(formData.get("motivo") ?? "");
  if (!id) return;
  const motivo = VALID_LOST_REASONS.includes(motivoRaw as LostReason)
    ? (motivoRaw as LostReason)
    : "otro";
  await updateQuoteRecord(id, { status: "perdido", lostReason: motivo });
  revalidatePath("/presupuesto/crm");
}

export async function reactivarAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  // Sin link firmado (d/s) todavía no hay presupuesto que reenviar: vuelve a
  // "lead", no a "enviado", para que el CRM no muestre un presupuesto fantasma.
  const record = await getQuote(id);
  const nextStatus = record?.d && record?.s ? "enviado" : "lead";
  await updateQuoteRecord(id, {
    status: nextStatus,
    lostReason: undefined,
    paidAt: undefined,
    paymentMethod: undefined,
    stripeSessionId: undefined,
  });
  revalidatePath("/presupuesto/crm");
}

export async function borrarAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deleteQuoteRecord(id);
  revalidatePath("/presupuesto/crm");
}
