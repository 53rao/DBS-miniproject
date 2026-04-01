// app/api/user/setup-profile/route.ts
import { auth } from "@/auth"
import { encode } from "next-auth/jwt" // ← add this
import { prisma } from "@/lib/db"
import type { AppUser } from "@/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await auth()
  const user = session?.user as unknown as AppUser

  if (!user?.id && !user?.google_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({
    where: user?.id ? { id: user.id } : { google_id: user.google_id },
    select: { username: true, id: true }
  })

  if (dbUser?.username) {
    return NextResponse.json({ error: "Profile already set up" }, { status: 400 })
  }

  const { username } = await req.json()

  if (!username || username.length < 3)
    return NextResponse.json({ error: "Username too short" }, { status: 400 })

  if (!/^[a-zA-Z0-9_]+$/.test(username))
    return NextResponse.json({ error: "Invalid characters" }, { status: 400 })

  const existing = await prisma.user.findUnique({ where: { username } })
  if (existing)
    return NextResponse.json({ error: "Username already taken" }, { status: 400 })

  // Save to DB
  if (dbUser?.id) {
    await prisma.user.update({
      where: { id: dbUser.id },
      data: { username, role: "USER" }
    })
  } else if (user?.google_id) {
    await prisma.user.create({
      data: {
        google_id: user.google_id!,
        email: user.google_email!,
        name: user.google_name!,
        image: user.google_image ?? null,
        username,
        role: "USER"
      }
    })
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // ✅ Manually mint a fresh JWT with username included
  const newToken = await encode({
    token: {
      google_id: user.google_id,
      google_email: user.google_email,
      google_name: user.google_name,
      google_image: user.google_image,
      id: dbUser?.id ?? user.id,
      role: "USER",
      username,           // ← the key field middleware checks
      is_active: true,
    },
    secret: process.env.AUTH_SECRET!,
    salt: "authjs.session-token", // default Auth.js v5 salt
  })

  // ✅ Write it as the session cookie so middleware sees it immediately
  const response = NextResponse.json({ ok: true })
  response.cookies.set("authjs.session-token", newToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30 // 30 days
  })

  return response
}