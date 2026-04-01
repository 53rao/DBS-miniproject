import Navbar from "@/components/navbar"
import MovieDetail from "@/components/movieDetails"
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="bg-black">
      <Navbar/>
      <MovieDetail params={{ id }} />
    </div>
  )
}