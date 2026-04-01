import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = await getToken({ req, secret: process.env.AUTH_SECRET })

  const isLoginPage = pathname === "/" || pathname === "/login"
  const isSetupPage = pathname === "/setup-profile"
  const isPublic = pathname.startsWith("/api/auth") || pathname.startsWith("/api/user") || pathname.startsWith("/api/movies") && req.method === "GET"

  if (isPublic) return NextResponse.next()

  if (!token) {
    if (isLoginPage) return NextResponse.next()
    return NextResponse.redirect(new URL("/", req.url))
  }

  if (!token.username) {
    if (isSetupPage) return NextResponse.next()
    if (isLoginPage) return NextResponse.next()
    return NextResponse.redirect(new URL("/setup-profile", req.url))
  }

  if (isLoginPage || isSetupPage) {
    return NextResponse.redirect(new URL("/explore", req.url))
  }
  
  if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
    const url = new URL("/explore", req.url)
    url.searchParams.set("error", "not_admin")
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
}