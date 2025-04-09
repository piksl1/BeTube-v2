import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a view count to a human-readable string (e.g., 1.2M, 4.5K)
 * @param viewCount Number of views
 * @returns Formatted view count string
 */
export function formatViewCount(viewCount: number | string): string {
  const count = typeof viewCount === "string" ? Number.parseInt(viewCount, 10) : viewCount

  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  } else {
    return count.toString()
  }
}

/**
 * Formats a date string to a relative time string (e.g., "2 days ago")
 * @param dateString ISO date string
 * @returns Relative time string
 */
export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  let interval = Math.floor(seconds / 31536000)
  if (interval >= 1) {
    return interval === 1 ? "1 year ago" : `${interval} years ago`
  }

  interval = Math.floor(seconds / 2592000)
  if (interval >= 1) {
    return interval === 1 ? "1 month ago" : `${interval} months ago`
  }

  interval = Math.floor(seconds / 86400)
  if (interval >= 1) {
    return interval === 1 ? "1 day ago" : `${interval} days ago`
  }

  interval = Math.floor(seconds / 3600)
  if (interval >= 1) {
    return interval === 1 ? "1 hour ago" : `${interval} hours ago`
  }

  interval = Math.floor(seconds / 60)
  if (interval >= 1) {
    return interval === 1 ? "1 minute ago" : `${interval} minutes ago`
  }

  return "Just now"
}

