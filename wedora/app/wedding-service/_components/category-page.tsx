"use client"

import { useState, useMemo } from "react"
import { SearchBar } from "./search-bar"
import { SortDropdown } from "./sort-dropdown"
import { ServiceListingCard } from "@/app/_components/service-listing-card"
import { BackButton } from "@/app/_components/back-button"
import { getServiceType } from "@/app/servicesType"

interface CategoryPageProps {
  serviceId: string
  initialListings: any[]
}

export function CategoryPage({
  serviceId,
  initialListings,
}: CategoryPageProps) {
  const { category, title, description, icon: Icon } =
    getServiceType(serviceId)

  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recommended")

  const listings = useMemo(() => {
    let results = [...initialListings]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      results = results.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q)
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
  }, [initialListings, searchQuery, sortBy])

  return (
    <div className="pt-16">
      {/* header ostaje isti */}
      {/* Page Header */}
      <section className="bg-white dark:bg-[#1E1E1E] border-b border-[#E0E0E0] dark:border-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <BackButton />
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {listings.map((listing) => (
          <ServiceListingCard key={listing.id} listing={listing} />
        ))}
      </div>
      </div>
    </div>
  )
}