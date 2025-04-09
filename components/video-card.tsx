import Image from "next/image"
import Link from "next/link"
import { formatTimeAgo, formatViewCount } from "@/lib/utils"

// Define proper types
interface VideoSnippet {
  title: string
  channelTitle: string
  publishedAt: string
  thumbnails: {
    default?: { url: string; width: number; height: number }
    medium?: { url: string; width: number; height: number }
    high?: { url: string; width: number; height: number }
  }
}

interface VideoId {
  videoId?: string
  kind?: string
}

interface Video {
  id: string | VideoId
  snippet?: VideoSnippet
}

interface VideoCardProps {
  video: Video
  layout?: "grid" | "vertical"
}

export default function VideoCard({ video, layout = "grid" }: VideoCardProps) {
  if (!video || !video.id) return null

  // Extract video ID whether it's a string or an object
  const videoId = typeof video.id === "object" ? video.id.videoId : video.id

  // Safely access snippet properties with fallbacks
  const { title, channelTitle, publishedAt, thumbnails } = video.snippet || {}

  // Get the best available thumbnail URL
  const thumbnailUrl =
    thumbnails?.medium?.url ||
    thumbnails?.default?.url ||
    thumbnails?.high?.url ||
    `/placeholder.svg?height=180&width=320`

  return (
    <div className={layout === "grid" ? "w-full" : "flex gap-3"}>
      <div className={layout === "grid" ? "w-full" : "w-40 flex-shrink-0"}>
        <Link href={`/video/${videoId}`} className="block">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={thumbnailUrl || "/placeholder.svg"}
              alt={title || "Video thumbnail"}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      </div>
      <div className="mt-2">
        <Link href={`/video/${videoId}`}>
          <h3 className="font-medium line-clamp-2">{title || "Untitled video"}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">{channelTitle || "Unknown channel"}</p>
        <div className="flex text-xs text-muted-foreground mt-1">
          <span>{formatViewCount(Math.floor(Math.random() * 1000000))} views</span>
          <span className="mx-1">•</span>
          <span>{publishedAt ? formatTimeAgo(publishedAt) : "Unknown date"}</span>
        </div>
      </div>
    </div>
  )
}

