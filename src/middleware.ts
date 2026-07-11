import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/site-config";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get(ADMIN_COOKIE)?.value;
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || cookie !== expected) {
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
  matcher: ["/presupuesto/nuevo", "/api/presupuesto/firmar"],
};
