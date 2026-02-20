
import { useState, useMemo } from "react"
import { SearchBar } from "./search-bar"
import { SortDropdown } from "./sort-dropdown"
import { ServiceListingCard } from "@app/_components/service-listing-card"
import { allListings } from "@app/_data/listings"
import { getServiceType } from "@app/servicesType"
import { useSearchParams } from "next/dist/client/components/navigation"

interface CategoryPageProps {
  serviceId: string
}

export function CategoryPage({ serviceId }: CategoryPageProps) {

  const searchParams = useSearchParams()
  
  const urlLocation = searchParams.get("location")
  const urlDate = searchParams.get("date")

  const { category, title, description: description, icon: Icon } = getServiceType(serviceId)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recommended")
  const [favorites, setFavorites] = useState<Set<string>>(() =>
    new Set(allListings.filter((l) => l.isFavorited).map((l) => l.id))
  )

  const handleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const listings = useMemo(() => {

    let results = allListings.map((l) => ({
      ...l,
      isFavorited: favorites.has(l.id),
      
    }))

    /* ---------------- URL FILTERS ---------------- */

    if (urlLocation) {
      results = results.filter((l) => l.location.toLowerCase() === urlLocation.toLowerCase())
    }

    if (urlDate) {
      const urlD = new Date(urlDate)

      results = results.filter((l) => {
        if (!l.dateBooked) return true

        const isBookedThatDay = l.dateBooked.some((d) => {
          return (
            d.getFullYear() === urlD.getFullYear() &&
            d.getMonth() === urlD.getMonth() &&
            d.getDate() === urlD.getDate()
          )
        })

        return !isBookedThatDay
      })
    }

    /* ---------------- CATEGORY FILTER ---------------- */

    results = results.filter((l) => l.category.toLowerCase() === category.toLowerCase())

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      results = results.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q) ||
          l.tags?.some((t) => t.toLowerCase().includes(q))
      )
    }

    switch (sortBy) {
      case "rating":
        results.sort((a, b) => b.rating - a.rating)
        break
      case "price-asc":
        results.sort((a, b) => {
          const pa = Number.parseFloat(a.priceRange.replace(/[^0-9.]/g, ""))
          const pb = Number.parseFloat(b.priceRange.replace(/[^0-9.]/g, ""))
          return pa - pb
        })
        break
      case "price-desc":
        results.sort((a, b) => {
          const pa = Number.parseFloat(a.priceRange.replace(/[^0-9.]/g, ""))
          const pb = Number.parseFloat(b.priceRange.replace(/[^0-9.]/g, ""))
          return pb - pa
        })
        break
    }

    return results
  },  [searchQuery, sortBy, favorites, urlLocation, urlDate, category ])

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="bg-white dark:bg-[#1E1E1E] border-b border-[#E0E0E0] dark:border-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#FFB6C1]/20 dark:bg-[#FF69B4]/20 rounded-full flex items-center justify-center">
              <Icon size={20} className="text-[#FF69B4]" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] dark:text-white text-balance">
              {title}
            </h1>
          </div>
          <p className="text-[#666666] dark:text-[#B0B0B0] text-sm sm:text-base leading-relaxed max-w-2xl ml-[52px]">
            {description}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <SearchBar onSearch={setSearchQuery} showFilterButton={false} />
          </div>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-[#666666] dark:text-[#B0B0B0]">
            <span className="font-semibold text-[#1A1A1A] dark:text-white">{listings.length}</span>{" "}
            {listings.length === 1 ? "provider" : "providers"} found
          </p>
        </div>

        {/* Listings Grid */}
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {listings.map((listing) => (
              <ServiceListingCard key={listing.id} listing={listing} onFavorite={handleFavorite} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-[#FFB6C1]/20 dark:bg-[#FF69B4]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon size={28} className="text-[#FF69B4]" />
            </div>
            <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-sm text-[#666666] dark:text-[#B0B0B0] max-w-sm mx-auto">
              Try adjusting your search to discover more providers.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-6 py-2.5 bg-[#FF69B4] text-white text-sm font-medium rounded-lg hover:bg-[#FF1493] transition-colors"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
