"use client"

import type React from "react"

import { usePathname, useRouter } from "next/navigation"
import { Home, Compass, Flame, Music2, Newspaper, Trophy, Lightbulb, Shirt, Gamepad2, Film } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Define types for better code organization
type Category = {
  name: string
  icon: React.ElementType
  path?: string
  query?: string
}

const categories: Category[] = [
  { name: "Home", icon: Home, path: "/" },
  { name: "Explore", icon: Compass, path: "/search?q=trending" },
  { name: "Shorts", icon: Flame, path: "/search?q=shorts" },
]

const subscriptions: Category[] = [
  { name: "Music", icon: Music2, query: "music" },
  { name: "Sports", icon: Trophy, query: "sports" },
  { name: "Gaming", icon: Gamepad2, query: "gaming" },
  { name: "Movies", icon: Film, query: "movies" },
  { name: "News", icon: Newspaper, query: "news" },
  { name: "Learning", icon: Lightbulb, query: "education" },
  { name: "Fashion", icon: Shirt, query: "fashion" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleCategoryClick = (query: string) => {
    router.push(`/search?q=${query}`)
  }

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-64 bg-background border-r">
      <div className="h-full px-3 py-4 overflow-y-auto pt-16">
        <ul className="space-y-2 font-medium">
          {categories.map((category) => (
            <li key={category.name}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", pathname === category.path && "bg-accent")}
                onClick={() => category.path && router.push(category.path)}
              >
                <category.icon className="h-5 w-5 mr-3" />
                <span>{category.name}</span>
              </Button>
            </li>
          ))}
        </ul>

        <hr className="my-4 border-t border-muted" />

        <ul className="space-y-2 font-medium">
          <li className="px-3 py-1 text-sm text-muted-foreground">Explore</li>
          {subscriptions.map((item) => (
            <li key={item.name}>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => item.query && handleCategoryClick(item.query)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.name}</span>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

