import VideoGrid from "@/components/video-grid";
import { fetchVideos } from "@/lib/api";

export default async function Home() {
  // Fetch trending videos for the homepage
  const videos = await fetchVideos("New");

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Recommended Videos</h1>
      <VideoGrid videos={videos} />
    </div>
  );
}
