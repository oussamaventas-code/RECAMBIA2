"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE } from "@/lib/site-config";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const rawNext = String(formData.get("next") ?? "/presupuesto/nuevo");
  const next = rawNext.startsWith("/presupuesto") ? rawNext : "/presupuesto/nuevo";
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || password !== expected) {
    redirect(`/presupuesto/acceso?error=1&next=${encodeURIComponent(next)}`);
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect(next);
}
