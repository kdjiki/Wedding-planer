"use client"

import { useState, useMemo, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { SearchBar } from "./_components/search-bar"
import { FilterPanel } from "./_components/filter-panel"
import { ServiceListingCard } from "../_components/service-listing-card"
import { CategoryQuickLinks } from "./_components/category-quick-links"
import { SortDropdown } from "./_components/sort-dropdown"
import { allListings } from "../_data/listings"

export default function WeddingServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [sortBy, setSortBy] = useState("recommended")
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(allListings.filter((l) => l.isFavorited).map((l) => l.id))
  )
  const [visibleCount, setVisibleCount] = useState(8)


  const handleFilterChange = (category: string, value: string) => {
  setSelectedFilters((prev) => {
    const current = prev[category] ?? []
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]

    return { ...prev, [category]: updated }
  })

  setVisibleCount(8)
}

  const handleClearFilters = () => {
    setSelectedFilters({})
    setVisibleCount(8)
  }

  const handleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const filteredListings = useMemo(() => {
    let results = allListings.map((l) => ({
      ...l,
      isFavorited: favorites.has(l.id),
    }))
    
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      results = results.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q) ||
          l.tags?.some((t) => t.toLowerCase().includes(q))
      )
    }
    

    // Sort
    switch (sortBy) {
      case "rating":
        results.sort((a, b) => b.rating - a.rating)
        break
      case "price-asc":
        results.sort((a, b) => {
          const priceA = Number.parseFloat(a.priceRange.replace(/[^0-9.]/g, ""))
          const priceB = Number.parseFloat(b.priceRange.replace(/[^0-9.]/g, ""))
          return priceA - priceB
        })
        break
      case "price-desc":
        results.sort((a, b) => {
          const priceA = Number.parseFloat(a.priceRange.replace(/[^0-9.]/g, ""))
          const priceB = Number.parseFloat(b.priceRange.replace(/[^0-9.]/g, ""))
          return priceB - priceA
        })
        break
    }

    return results
  }, [searchQuery, sortBy, favorites])

  const visibleListings = filteredListings.slice(0, visibleCount)

  const activeFilterCount = Object.values(selectedFilters).flat().length

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="bg-white dark:bg-[#1E1E1E] border-b border-[#E0E0E0] dark:border-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#FFB6C1]/20 dark:bg-[#FF69B4]/20 rounded-full flex items-center justify-center">
              <Sparkles size={20} className="text-[#FF69B4]" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] dark:text-white text-balance">
              Wedding Services
            </h1>
          </div>
          <p className="text-[#666666] dark:text-[#B0B0B0] text-sm sm:text-base leading-relaxed max-w-2xl ml-[52px]">
            Browse and book everything you need for your perfect wedding day, from venues to photographers, all in one place.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Category Quick Links */}
        <div className="mb-6">
          <CategoryQuickLinks />
        </div>

        {/* Search + Sort Row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1">
            <SearchBar
              onSearch={(value) => {
                setSearchQuery(value)
                setVisibleCount(8)
              }}
              onFilterToggle={() => setShowFilters(!showFilters)}
              filtersActive={activeFilterCount > 0}
            />
          </div>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        {/* Filter Panel */}
        {/* <div className="mb-6">
          <FilterPanel
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearFilters}
          />
        </div> */}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-[#666666] dark:text-[#B0B0B0]">
            <span className="font-semibold text-[#1A1A1A] dark:text-white">{filteredListings.length}</span>{" "}
            {visibleListings.length === 1 ? "service" : "services"} found
          </p>
        </div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {visibleListings.map((listing) => (
              <ServiceListingCard
                key={listing.id}
                listing={listing}
                onFavorite={handleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-[#FFB6C1]/20 dark:bg-[#FF69B4]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles size={28} className="text-[#FF69B4]" />
            </div>
            <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white mb-2">
              No services found
            </h3>
            <p className="text-sm text-[#666666] dark:text-[#B0B0B0] max-w-sm mx-auto">
              Try adjusting your search or filters to discover more wedding services.
            </p>
            <button
              onClick={() => {
                setSearchQuery("")
                handleClearFilters()
              }}
              className="mt-4 px-6 py-2.5 bg-[#FF69B4] text-white text-sm font-medium rounded-lg hover:bg-[#FF1493] transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Load More */}
        {visibleCount < filteredListings.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="px-8 py-3 border-2 border-[#FF69B4] text-[#FF69B4] rounded-xl font-medium hover:bg-[#FF69B4] hover:text-white transition-colors"
            >
              View More Vendors
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
