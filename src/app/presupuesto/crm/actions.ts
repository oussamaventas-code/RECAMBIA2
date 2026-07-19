"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE } from "@/lib/site-config";
import { verifySession } from "@/lib/session";
import {
  deleteQuoteRecord,
  markQuotePaid,
  updateQuoteRecord,
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

export async function reactivarAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await updateQuoteRecord(id, {
    status: "enviado",
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
