import VideoCard from "./video-card"

interface Video {
  id: string | { videoId?: string }
  snippet?: {
    title: string
    channelTitle: string
    publishedAt: string
    thumbnails: {
      default?: { url: string }
      medium?: { url: string }
      high?: { url: string }
    }
  }
}

interface VideoGridProps {
  videos: {
    items?: Video[]
  }
  layout?: "grid" | "vertical"
}

export default function VideoGrid({ videos, layout = "grid" }: VideoGridProps) {
  // Check if videos exist and have items
  if (!videos?.items?.length) {
    return <div className="text-center py-8 text-muted-foreground">No videos found</div>
  }

  return (
    <div
      className={
        layout === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          : "flex flex-col gap-4"
      }
    >
      {videos.items.map((video, index) => {
        // Skip invalid videos
        if (!video || !video.snippet) return null

        return (
          <VideoCard
            key={typeof video.id === "object" ? video.id.videoId || index : video.id || index}
            video={video}
            layout={layout}
          />
        )
      })}
    </div>
  )
}

