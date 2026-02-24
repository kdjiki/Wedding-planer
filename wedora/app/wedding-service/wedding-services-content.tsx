"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Sparkles } from "lucide-react"

import { SearchBar } from "./_components/search-bar"
import { ServiceListingCard } from "../_components/service-listing-card"
import { CategoryQuickLinks } from "./_components/category-quick-links"
import { SortDropdown } from "./_components/sort-dropdown"
import { BackButton } from "../_components/back-button"

interface Listing {
  id: string
  image: string
  name: string
  category: string
  rating: number
  location: string
  priceRange: string
  description: string
  tags?: string[]
  dateBooked?: Date[]
}

export default function WeddingServicesContent({
  initialListings,
}: {
  initialListings: Listing[]
}) {
  const searchParams = useSearchParams()

  const urlLocation = searchParams.get("location")
  const urlDate = searchParams.get("date")

  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recommended")
  const [visibleCount, setVisibleCount] = useState(8)

  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const handleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const filteredListings = useMemo(() => {
    let results = initialListings.map((l) => ({
      ...l,
      isFavorited: favorites.has(l.id),
    }))

    /* ---------------- URL FILTERS ---------------- */
    if (urlLocation) {
      results = results.filter(
        (l) => l.location.toLowerCase() === urlLocation.toLowerCase()
      )
    }

    if (urlDate) {
      const urlD = new Date(urlDate)
      results = results.filter((l) => {
        if (!l.dateBooked) return true
        return !l.dateBooked.some((d) => {
          return (
            d.getFullYear() === urlD.getFullYear() &&
            d.getMonth() === urlD.getMonth() &&
            d.getDate() === urlD.getDate()
          )
        })
      })
    }

    /* ---------------- SEARCH ---------------- */
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

    /* ---------------- SORT ---------------- */
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
  }, [initialListings, searchQuery, sortBy, favorites, urlLocation, urlDate])

  const visibleListings = filteredListings.slice(0, visibleCount)

  return (
    <div className="pt-16">
      <section className="bg-white dark:bg-[#1E1E1E] border-b border-[#E0E0E0] dark:border-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <BackButton />
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#FFB6C1]/20 dark:bg-[#FF69B4]/20 rounded-full flex items-center justify-center">
              <Sparkles size={20} className="text-[#FF69B4]" />
            </div>
            <h1 className="text-3xl font-bold text-[#1A1A1A] dark:text-white">
              Wedding Services
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <CategoryQuickLinks />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <SearchBar onSearch={setSearchQuery} />
          </div>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        <div className="mb-5">
          <p className="text-sm text-[#666666] dark:text-[#B0B0B0]">
            <span className="font-semibold text-[#1A1A1A] dark:text-white">
              {filteredListings.length}
            </span>{" "}
            {filteredListings.length === 1 ? "service" : "services"} found
          </p>
        </div>

        {filteredListings.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {visibleListings.map((listing) => (
                <ServiceListingCard
                  key={listing.id}
                  listing={listing}
                  onFavorite={handleFavorite}
                />
              ))}
            </div>

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
          </>
        ) : (
          <div className="text-center py-20">
            <Sparkles size={28} className="mx-auto mb-4 text-[#FF69B4]" />
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              No services found
            </h3>
          </div>
        )}
      </div>
    </div>
  )
}