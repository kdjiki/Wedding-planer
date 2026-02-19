"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"

interface SearchBarProps {
  onSearch?: (query: string) => void
  onFilterToggle?: () => void
  showFilterButton?: boolean
  filtersActive?: boolean
}

export function SearchBar({ onSearch, onFilterToggle, showFilterButton = true, filtersActive = false }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleChange = (value: string) => {
    setQuery(value)
    onSearch?.(value)
  }

  const handleClear = () => {
    setQuery("")
    onSearch?.("")
  }

  return (
    <div className="flex gap-3">
      <div className="flex-1 relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666] dark:text-[#B0B0B0]" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search services, vendors, locations..."
          className="w-full pl-11 pr-10 py-3 bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#2D2D2D] rounded-xl text-sm text-[#1A1A1A] dark:text-white placeholder:text-[#666666] dark:placeholder:text-[#B0B0B0] outline-none focus:border-[#FF69B4] focus:ring-2 focus:ring-[#FF69B4]/20 transition-all"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#666666] dark:text-[#B0B0B0] hover:text-[#1A1A1A] dark:hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {/* {showFilterButton && (
        <button
          onClick={onFilterToggle}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all ${
            filtersActive
              ? "bg-[#FF69B4] text-white border-[#FF69B4]"
              : "bg-white dark:bg-[#1E1E1E] border-[#E0E0E0] dark:border-[#2D2D2D] text-[#1A1A1A] dark:text-white hover:border-[#FF69B4]"
          }`}
          aria-label="Toggle filters"
          aria-pressed={filtersActive}
        >
          <SlidersHorizontal size={16} />
          <span className="hidden sm:inline">Filters</span>
        </button>
      )} */}
    </div>
  )
}
