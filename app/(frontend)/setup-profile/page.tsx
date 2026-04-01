"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SetupProfile() {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
const res = await fetch("/api/user/setup-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      setLoading(false)
      return
    }

    // Refresh server state then navigate
    window.location.reload()


  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-sm shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-2">One last step</h1>
        <p className="text-zinc-400 text-sm mb-6">
          Choose a username to complete your profile
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-zinc-400 text-sm mb-1 block">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. johndoe"
              minLength={3}
              maxLength={20}
              pattern="^[a-zA-Z0-9_]+$"
              required
              disabled={loading}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
            />
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
            <p className="text-zinc-600 text-xs mt-1">
              Only letters, numbers and underscores. 3-20 characters.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-amber-600 hover:bg-amber-500 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  )
}