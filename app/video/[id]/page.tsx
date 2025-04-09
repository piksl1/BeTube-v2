import { fetchVideoDetails, fetchVideos } from "@/lib/api"
import VideoPlayer from "@/components/video-player"
import VideoGrid from "@/components/video-grid"
import { formatViewCount, formatTimeAgo } from "@/lib/utils"

interface VideoPageProps {
  params: {
    id: string
  }
}

export default async function VideoPage({ params }: VideoPageProps) {
  const videoId = params.id
  const videoDetails = await fetchVideoDetails(videoId)
  const relatedVideos = await fetchVideos("", videoId)

  // Handle case when video is not found
  if (!videoDetails?.items?.length) {
    return (
      <div className="container py-6">
        <h1 className="text-2xl font-bold">Video not found</h1>
        <p className="mt-4">The video you're looking for might have been removed or is unavailable.</p>
      </div>
    )
  }

  const video = videoDetails.items[0]
  const { snippet, statistics } = video || {}

  return (
    <div className="container py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        {/* Video Player */}
        <VideoPlayer videoId={videoId} />

        {/* Video Information */}
        <div className="mt-4">
          <h1 className="text-2xl font-bold">{snippet?.title || "Untitled video"}</h1>

          {/* Video Stats */}
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <span>{statistics?.viewCount ? formatViewCount(statistics.viewCount) : "0"} views</span>
            <span className="mx-2">•</span>
            <span>{snippet?.publishedAt ? formatTimeAgo(snippet.publishedAt) : "Unknown date"}</span>
          </div>

          {/* Channel Information */}
          <div className="mt-4 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {(snippet?.channelTitle || "?").charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold">{snippet?.channelTitle || "Unknown channel"}</h3>
              <p className="text-sm text-muted-foreground mt-4 whitespace-pre-line">
                {snippet?.description || "No description available."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Videos */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Related Videos</h2>
        <VideoGrid videos={relatedVideos} layout="vertical" />
      </div>
    </div>
  )
}

