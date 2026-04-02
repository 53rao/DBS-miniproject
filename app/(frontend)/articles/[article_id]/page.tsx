import Navbar from "@/components/navbar"
import MovieDetail from "@/components/movieDetails"
import ArticleDetails from "@/components/articleDetails"
export default async function Page({ params }: { params: Promise<{ article_id: string }> }) {
  const { article_id } = await params

  return (
    <div className="bg-black">
      <Navbar/>
      <ArticleDetails params={{ article_id }} />
    </div>
  )
}