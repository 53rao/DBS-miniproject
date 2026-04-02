"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { useSession } from "next-auth/react"
import { AppUser } from "@/lib/types"
import Image from "next/image"

const links = [
  { title: "Home", url: "/explore" },
  { title: "Articles", url: "/articles" },
  { title: "Discover", url: "/discover" },
  { title: "Collections", url: "/collections" },
  { title: "Search", url: "/search" }
]

export default function Navbar() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user) {
      const user = session.user as unknown as AppUser
      setRole(user?.role ?? null)
      setImage(user?.image ?? null)
    }
  }, [session])

  return (
    <nav className="h-20 w-full absolute bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10 px-2 md:px-15 flex items-center justify-between md:justify-around">
      <div className="text-amber-600 text-3xl font-extrabold font-[family-name:var(--font-playfair)]">FDC</div>

      {!open && (
        <div className="links hidden md:flex gap-6 items-center">
          {links.map((link) => (
            <Link key={link.title} href={link.url}
              className={path.startsWith(link.url) ? "text-orange-500 font-semibold" : "text-zinc-400"}>
              {link.title}
            </Link>
          ))}

          {(role === "AUTHOR" || role === "ADMIN") && (
            <Link href="/author/dashboard"
             className={path.startsWith("/ashboard")?"text-orange-500":" text-zinc-400   rounded-lg text-md  transition "}
            >
              Dashboard
            </Link>
          )}
          {( role === "ADMIN") && (
            <Link href="/admin"
             className={path.startsWith("/admin")?"text-orange-500 rounded-lg text-md  transition  ":" text-zinc-400   rounded-lg text-md  transition "}
            >
              Admin
            </Link>
          )}
        </div>
      )}

      <div className="hidden md:flex w-8 h-8 rounded-full overflow-hidden bg-zinc-600">
        {image && <Image src={image} alt="avatar" width={32} height={32} className="rounded-full" />}
      </div>

      {open
        ? <X onClick={() => setOpen(false)} size={30} className="md:hidden" />
        : <Menu onClick={() => setOpen(true)} size={30} className="md:hidden" />}
    </nav>
  )
}