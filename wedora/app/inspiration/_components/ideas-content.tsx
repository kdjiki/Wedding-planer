"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import {
  WEDDING_IDEAS,
  IDEA_CATEGORIES,
  type IdeaCategory,
} from "../_data/wedding-ideas"
import { IdeaCard } from "./idea-card"

export function IdeasContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] =
    useState<IdeaCategory>("All")

  const filteredIdeas = useMemo(() => {
    let list = WEDDING_IDEAS
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
  }, [searchQuery, selectedCategory])

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
                className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
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

      {/* Image card grid – varied sizes, no borders */}
      {filteredIdeas.length > 0 ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          style={{ gridAutoRows: "minmax(160px, auto)" }}
        >
          {filteredIdeas.map((idea, index) => {
            const size =
              index % 8 === 0
                ? "wide"
                : index % 8 === 4
                  ? "tall"
                  : "default"
            const gridClass =
              size === "wide"
                ? "sm:col-span-2"
                : size === "tall"
                  ? "sm:row-span-2 h-full min-h-0"
                  : ""
            return (
              <div key={idea.id} className={gridClass}>
                <IdeaCard idea={idea} size={size} />
              </div>
            )
          })}
        </div>
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
