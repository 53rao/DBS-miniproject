import Navbar from "@/components/navbar"
import Link from "next/link"
import { 
  Film, Users, BookOpen, Star, 
  Eye, Library, UserCheck, Clapperboard 
} from "lucide-react"

const features = [
  { title: "Movies", description: "Add, edit, manage movies", href: "/admin/movies", icon: Film, color: "bg-amber-600" },
  { title: "Collections", description: "Manage movie collections", href: "/admin/collections", icon: Library, color: "bg-blue-600" },
  { title: "People", description: "Manage cast & crew", href: "/admin/people", icon: Clapperboard, color: "bg-purple-600" },
  { title: "Users", description: "Manage users & roles", href: "/admin/users", icon: Users, color: "bg-green-600" },
  { title: "Articles", description: "Approve or deny articles", href: "/admin/articles", icon: BookOpen, color: "bg-rose-600" },
  { title: "Ratings", description: "View all movie ratings", href: "/admin/ratings", icon: Star, color: "bg-yellow-600" },
  { title: "Views", description: "Movie view analytics", href: "/admin/views", icon: Eye, color: "bg-cyan-600" },
  { title: "Authors", description: "Manage author requests", href: "/admin/authors", icon: UserCheck, color: "bg-orange-600" },
]

export default function Admin() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="pt-24 px-6 md:px-16 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-zinc-400 mb-10">Manage your platform</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="bg-gray-900 hover:bg-gray-800 rounded-2xl p-6 flex flex-col gap-4 transition group border border-zinc-800 hover:border-zinc-600"
            >
              <div className={`${feature.color} w-10 h-10 rounded-xl flex items-center justify-center`}>
                <feature.icon size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg group-hover:text-amber-500 transition">
                  {feature.title}
                </h2>
                <p className="text-zinc-400 text-sm mt-1">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}