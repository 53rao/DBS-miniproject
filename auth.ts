import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "@/lib/db"
import { AppUser } from "./lib/types"


type GoogleProfile = {
  email?: string
  name?: string
  picture?: string
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [Google],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return false
      try {
        const existing = await prisma.user.findUnique({
          where: { google_id: account.providerAccountId }
        })
        if (!existing) {
          await prisma.user.create({
            data: {
              google_id: account.providerAccountId,
              email: user.email!,
              name: user.name!,
              image: user.image ?? null,
              role: "GUEST"
            }
          })
        }
        return true
      } catch (err) {
        console.error(err)
        return false
      }
    },

    async jwt({ token, account, profile }) {
      const googleProfile = profile as GoogleProfile

      if (account?.provider === "google") {
        // Fresh login — store google info in token
        token.google_id = account.providerAccountId
        token.google_email = googleProfile?.email
        token.google_name = googleProfile?.name
        token.google_image = googleProfile?.picture
      }

      // Always fetch from DB using google_id (works for both fresh + subsequent)
      // google_id persists in token across requests
      if (token.google_id) {
        const dbUser = await prisma.user.findUnique({
          where: { google_id: token.google_id as string },
          select: { id: true, role: true, username: true, is_active: true }
        })
        if (dbUser) {
          token.id = dbUser.id
          token.role = dbUser.role
          token.username = dbUser.username
          token.is_active = dbUser.is_active
        }
      }
      return token
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as number,
        role: token.role as string,
        username: token.username as string | null,
        is_active: token.is_active as boolean,
        google_id: token.google_id as string,
        email: token.google_email as string,
        name: token.google_name as string,
        image: token.google_image as string,
      } as AppUser & typeof session.user
      return session
    }
  }
})