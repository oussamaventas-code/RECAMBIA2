"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE } from "@/lib/site-config";
import { signSession } from "@/lib/session";
import { timingSafeEqual } from "crypto";

// Simple in-memory rate limit (cleared on restart / not shared across serverless instances)
const loginAttempts = new Map<string, { count: number; expires: number }>();

export async function loginAction(formData: FormData) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown_ip";

  const now = Date.now();
  const attempt = loginAttempts.get(ip);
  if (attempt && attempt.expires > now) {
    if (attempt.count >= 5) {
      // Demasiados intentos, esperamos a que expire el bloqueo
      redirect(`/presupuesto/acceso?error=TooManyRequests`);
    }
    attempt.count++;
  } else {
    // 5 intentos cada 2 minutos
    loginAttempts.set(ip, { count: 1, expires: now + 120 * 1000 });
  }

  const password = String(formData.get("password") ?? "");
  const rawNext = String(formData.get("next") ?? "/presupuesto/nuevo");
  const next = rawNext.startsWith("/presupuesto") ? rawNext : "/presupuesto/nuevo";
  const expected = process.env.ADMIN_PASSWORD;

  let isMatch = false;
  if (expected && password.length === expected.length) {
    isMatch = timingSafeEqual(Buffer.from(password), Buffer.from(expected));
  }

  if (!isMatch) {
    redirect(`/presupuesto/acceso?error=1&next=${encodeURIComponent(next)}`);
  }

  // Clear rate limit on success
  loginAttempts.delete(ip);

  const sessionToken = await signSession("admin_auth");

  const store = await cookies();
  store.set(ADMIN_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect(next);
}
