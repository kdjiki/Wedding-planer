"use client"

import { useState, useMemo, useEffect } from "react"
import { Search } from "lucide-react"
import {
  IDEA_CATEGORIES,
  type IdeaCategory,
} from "../_data/wedding-ideas"
import { IdeaCard } from "./idea-card"
import type { WeddingIdea } from "../_data/wedding-ideas"

const INITIAL_VISIBLE = 8
const LOAD_MORE_STEP = 8

export function IdeasContent({ initialIdeas }: { initialIdeas: WeddingIdea[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] =
    useState<IdeaCategory>("All")
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)

  const filteredIdeas = useMemo(() => {
    let list = initialIdeas
    if (selectedCategory !== "All") {
      list = list.filter(
        (idea) =>
          idea.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (idea) =>
          idea.title.toLowerCase().includes(q) ||
          idea.description.toLowerCase().includes(q) ||
          idea.category.toLowerCase().includes(q)
      )
    }
    return list
  }, [searchQuery, selectedCategory, initialIdeas])

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE)
  }, [searchQuery, selectedCategory])

  const visibleIdeas = filteredIdeas.slice(0, visibleCount)
  const hasMore = visibleCount < filteredIdeas.length

  return (
    <>
      {/* Search bar */}
      <div className="max-w-xl mx-auto mb-6">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666] dark:text-[#B0B0B0]"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search wedding ideas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E0E0E0] dark:border-[#2D2D2D] bg-white dark:bg-[#1E1E1E] text-[#1A1A1A] dark:text-white placeholder:text-[#666666] dark:placeholder:text-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#FF69B4] focus:border-transparent"
            aria-label="Search wedding ideas"
          />
        </div>
      </div>

      {/* Category filters: wrap on desktop, horizontal scroll on mobile */}
      <div className="mb-8 -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-auto md:overflow-visible">
        <div className="flex flex-wrap justify-center gap-2 px-4 sm:px-6 lg:px-8 pb-2 min-w-max md:min-w-0">
          {IDEA_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#FF69B4] text-white dark:bg-[#FF1493]"
                    : "bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#2D2D2D] text-[#1A1A1A] dark:text-white hover:border-[#FFB6C1] dark:hover:border-[#FF69B4]"
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Image card grid */}
      {filteredIdeas.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {visibleIdeas.map((idea, index) => {
              const size = index % 5 === 3 ? "tall" : "default"
              return (
                <IdeaCard key={idea.id} idea={idea} size={size} />
              )
            })}
          </div>
          {hasMore && (
            <div className="text-center mt-10">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
                className="cursor-pointer px-8 py-3 border-2 border-[#FF69B4] text-[#FF69B4] rounded-xl font-medium hover:bg-[#FF69B4] hover:text-white transition-colors"
              >
                View more
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-[#666666] dark:text-[#B0B0B0]">
            No ideas match your search. Try another category or keyword.
          </p>
        </div>
      )}
    </>
  )
}
