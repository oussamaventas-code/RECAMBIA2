import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/site-config";
import { verifySession } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get(ADMIN_COOKIE)?.value;

  let isAuthenticated = false;
  if (cookie) {
    const payload = await verifySession(cookie);
    if (payload === "admin_auth") {
      isAuthenticated = true;
    }
  }

  if (!isAuthenticated) {
    if (request.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const url = request.nextUrl.clone();
    url.pathname = "/presupuesto/acceso";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/presupuesto/nuevo",
    "/presupuesto/nuevo/:path*",
    "/presupuesto/crm",
    "/presupuesto/crm/:path*",
    "/api/presupuesto/firmar",
    "/api/presupuesto/firmar/:path*",
  ],
};
