import { auth } from "@/auth"
import { encode } from "next-auth/jwt"
import { prisma } from "@/lib/db"
import { AppUser } from "@/lib/types"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await auth()
  const user = session?.user as unknown as AppUser

  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { username: true, id: true }
  })

  if (!dbUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (dbUser.username) {
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

  await prisma.user.update({
    where: { id: dbUser.id },
    data: { username, role: "USER" }
  })

  const newToken = await encode({
    token: {
      google_id: user.google_id,
      google_email: user.email,
      google_name: user.name,
      google_image: user.image,
      id: dbUser.id,
      role: "USER",
      username,
      is_active: true,
    },
    secret: process.env.AUTH_SECRET!,
    salt: process.env.NODE_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token",
  })

  const response = NextResponse.json({ ok: true })
  response.cookies.set(
    process.env.NODE_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token",
    newToken,
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    }
  )

  return response
}