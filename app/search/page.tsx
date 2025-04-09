import VideoGrid from "@/components/video-grid"
import { fetchVideos } from "@/lib/api"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Get the search query from URL parameters
  const query = searchParams.q || ""

  // Fetch videos based on the search query
  const videos = await fetchVideos(query)

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">{query ? `Search Results for: ${query}` : "Trending Videos"}</h1>
      <VideoGrid videos={videos} />
    </div>
  )
}

