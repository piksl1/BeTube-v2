// API configuration
const API_KEY = process.env.VITE_API_KEY
const BASE_URL = process.env.VITE_URL_KEY

// Request options for RapidAPI
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": API_KEY || "",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
}

/**
 * Fetches videos from YouTube API
 * @param query Search query string
 * @param relatedToVideoId Optional video ID to find related videos
 * @returns Video search results
 */
export async function fetchVideos(query: string, relatedToVideoId?: string) {
  try {
    // Build the URL based on parameters
    let url = `${BASE_URL}/search?part=snippet&maxResults=20`

    if (relatedToVideoId) {
      // Get related videos
      url += `&relatedToVideoId=${relatedToVideoId}&type=video`
    } else if (query) {
      // Search by query
      url += `&q=${encodeURIComponent(query)}`
    } else {
      // Default to trending
      url += `&chart=mostPopular`
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      console.error("API response error:", response.status, response.statusText)
      return { items: [] }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching videos:", error)
    return { items: [] }
  }
}

/**
 * Fetches details for a specific video
 * @param videoId The ID of the video
 * @returns Video details including snippet and statistics
 */
export async function fetchVideoDetails(videoId: string) {
  try {
    const url = `${BASE_URL}/videos?part=snippet,statistics&id=${videoId}`
    const response = await fetch(url, options)

    if (!response.ok) {
      console.error("API response error:", response.status, response.statusText)
      return { items: [] }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching video details:", error)
    return { items: [] }
  }
}

