'use client'
import { signIn } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Movie } from "@/lib/types"

function PosterCard({ poster_url, title }: { poster_url: string; title: string }) {
  return (
    <div className="rounded-lg flex-shrink-0 w-[170px] h-[260px] w-full overflow-hidden bg-zinc-900 relative">
      <Image
        src={poster_url}
        alt={title}
        fill
        sizes="(max-width: 768px) 0vw, 14vw"
        className="object-cover opacity-80"
        onError={(e) => {
          e.currentTarget.style.display = "none"
        }}
      />
    </div>
  )
}

function ScrollTrack({ movies, direction, speed }: {
  movies: Movie[]
  direction: "up" | "down"
  speed: number 
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number | null>(null)
  const posRef = useRef(0)

  useEffect(() => {
    if (movies.length === 0) return
    const track = trackRef.current
    if (!track) return

    const step = () => {
      const half = track.scrollHeight / 2
      const delta = half / (speed * 60) 

      if (direction === "up") {
        posRef.current -= delta
        if (Math.abs(posRef.current) >= half) posRef.current = 0
      } else {
        posRef.current += delta
        if (posRef.current >= 0) posRef.current = -half
      }

      track.style.transform = `translateY(${posRef.current}px)`
      animRef.current = requestAnimationFrame(step)
    }

    if (direction === "down") posRef.current = -(track.scrollHeight / 2)

    animRef.current = requestAnimationFrame(step)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [movies, direction, speed])

  if (movies.length === 0) {
    return (
      <div className="flex-1 flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-lg h-40 w-full bg-zinc-900 animate-pulse" />
        ))}
      </div>
    )
  }

  const tripled = [...movies, ...movies, ...movies]

  return (
    <div className="flex-1 overflow-hidden">
      <div ref={trackRef} className="flex flex-col gap-2 will-change-transform">
        {tripled.map((movie, i) => (
          <PosterCard key={`${movie.poster_url}-${i}`} poster_url={movie.poster_url} title={movie.title} />
        ))}
      </div>
    </div>
  )
}

export default function LoginPage() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("/api/movies")
        const { data } = await res.json()
        setMovies(data)
      } catch (err) {
        console.error("Failed to fetch movies:", err)
      }
    }
    fetchMovies()
  }, [])

  const tracks = [0, 1, 2, 3].map((t) =>
    movies.filter((_, i) => i % 4 === t)
  )

  return (
    <>
      <div className="w-screen h-screen flex">

        <div className="hidden md:flex w-[55%] relative overflow-hidden bg-black">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black z-10 pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
          <div className="flex gap-2 p-2 w-full h-full">
            <ScrollTrack movies={tracks[0]} direction="up"   speed={18} />
            <ScrollTrack movies={tracks[1]} direction="down" speed={23} />
            <ScrollTrack movies={tracks[2]} direction="up"   speed={27} />
            <ScrollTrack movies={tracks[3]} direction="down" speed={20} />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center bg-white dark:bg-zinc-950 px-8">
          <div className="w-full max-w-xs space-y-6">

            <p className="font-semibold tracking-widest text-orange-500 text-2xl uppercase">
              FDC
            </p>

            <div>
              <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white leading-snug">
                Cinema lives here.<br />Come join us.
              </h1>
              <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
                Rate movies, build your watchlist, and write reviews.
                A community for people who actually care about film.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-xs text-zinc-500">Members only · No guests</span>
            </div>

            <button
              onClick={() => signIn("google", { callbackUrl: "/setup-profile" })}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm font-medium text-zinc-800 dark:text-zinc-100 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-xs text-zinc-400 text-center leading-relaxed">
              By signing in you agree to our terms.<br />
              No email or password needed.
            </p>

          </div>
        </div>

      </div>
    </>
  )
}