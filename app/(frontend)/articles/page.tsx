"use client"
import Navbar from "@/components/navbar"
import { Articles } from "@/lib/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function Article() {
  const [articles, setArticles] = useState<Articles[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [shuffled, setShuffled] = useState<Articles[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles")
        if (!res.ok) throw new Error("Failed to fetch articles")
        const data = await res.json()
        setArticles(data.data)
      } catch (err) {
        setError("Could not load articles.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  useEffect(() => {
    if (articles.length > 0) {
      setShuffled([...articles].sort(() => Math.random() - 0.5))
    }
  }, [articles])

  if (loading)
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] gap-5">
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase">Loading the reel…</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)] text-red-400 text-lg">
          {error}
        </div>
      </div>
    )

  const featured = shuffled[0]
  const rest = shuffled.slice(1)

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <main className="max-w-[1400px] mx-auto px-10 pt-20 pb-20">

        

        {featured && (
          <div
            className="relative w-full h-[520px] overflow-hidden rounded-sm cursor-pointer mb-0.5 group"
            onClick={() => router.push(`/articles/${featured.article_id}`)}
          >
            <Image
              src={featured.movie?.banner_url || "/fallback1.svg"}
              alt={featured.article_title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]/10" />

            <div className="absolute bottom-0 left-0 right-0 p-12 flex flex-col gap-3">
                            <h1 className="bg-amber-600/10 text-[#f97316] w-fit px-4 py-0.5 border-1 rounded-sm border-amber-600 text-sm"> 🔥 Featured Film</h1>

              <h2 className="text-4xl text-zinc-100 font-serif max-w-2xl leading-tight font-[family-name:var(--font-playfair)]">
                {featured.article_title}
              </h2>
              <span className="text-xs tracking-wide text-amber-300 font-medium opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                Read Article →
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 my-12">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[9px] tracking-[0.45em] text-zinc-700 uppercase">More Stories</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
          {rest.map((article, index) => (
            <div
              key={article.article_id ?? `${article.article_title}-${index}`}
              className="group cursor-pointer bg-zinc-900 overflow-hidden border border-transparent hover:border-white/10 transition-colors duration-300"
              onClick={() => router.push(`/articles/${article.article_id}`)}
            >
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={article.movie?.banner_url || "/fallback1.svg"}
                  alt={article.article_title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 group-hover:opacity-50 transition-opacity duration-300" />
                <span className="absolute top-2.5 left-3 text-[10px] tracking-wider text-white/30 font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3 px-4 py-3.5 min-h-[72px] border-t border-white/5 bg-zinc-900 group-hover:bg-zinc-800/80 transition-colors duration-300">
                <p className="text-sm text-zinc-200 leading-snug font-serif flex-1">
                  {article.article_title}
                </p>
                <span className="text-sm text-zinc-600 mt-0.5 shrink-0 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-amber-300 transition-all duration-300">
                  ↗
                </span>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  )
}