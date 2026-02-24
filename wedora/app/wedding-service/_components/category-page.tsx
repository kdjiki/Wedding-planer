"use client"

import { useState, useMemo, useEffect } from "react"
import { SearchBar } from "./search-bar"
import { SortDropdown } from "./sort-dropdown"
import { ServiceListingCard } from "@/app/_components/service-listing-card"
import { BackButton } from "@/app/_components/back-button"
import { getServiceType } from "@/app/servicesType"
import { usePathname, useRouter } from "next/navigation"

// Uvezi akcije koje smo napravili
import { toggleFavoriteAction, fetchUserFavorites } from "@/lib/favorites-actions"
import { supabase } from "@/lib/supabase"

interface CategoryPageProps {
  serviceId: string
  initialListings: any[]
}

export function CategoryPage({
  serviceId,
  initialListings,
}: CategoryPageProps) {
  const { category, title, description, icon: Icon } = getServiceType(serviceId)

  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recommended")

  // --- LOGIKA ZA FAVORITE (Ista kao u WeddingServicesContent) ---
  const [mounted, setMounted] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    
    // 1. Load iz localStorage
    const saved = localStorage.getItem("wedding_favs")
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)))
    }

    // 2. Sync s bazom
    const syncWithDB = async () => {
      const dbFavs = await fetchUserFavorites()
      if (dbFavs && dbFavs.length > 0) {
        const dbSet = new Set(dbFavs)
        setFavorites(dbSet)
        localStorage.setItem("wedding_favs", JSON.stringify(dbFavs))
      }
    }
    syncWithDB()
  }, [])

  const handleFavorite = async (id: string) => {
     const { data } = await supabase.auth.getUser()
 
     if (!data.user) {
       router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
       return
     }
    const next = new Set(favorites)
    const isAdding = !next.has(id)
    
    if (isAdding) next.add(id)
    else next.delete(id)

    setFavorites(next)
    localStorage.setItem("wedding_favs", JSON.stringify(Array.from(next)))

    // Pozadinski sync
    toggleFavoriteAction(id, isAdding).catch((err) => {
      console.error("Sync failed:", err)
    })
  }
  // -------------------------------------------------------

  const listings = useMemo(() => {
    // Mapiramo favorite status na listings
    let results = initialListings.map((l) => ({
      ...l,
      isFavorited: mounted ? favorites.has(l.id) : false,
    }))

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
  }, [initialListings, searchQuery, sortBy, favorites, mounted])

  return (
    <div className="pt-16">
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
        <div className="flex flex-wrap sm:flex-row gap-3 mb-6">
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
            <ServiceListingCard 
              key={listing.id} 
              listing={listing} 
              onFavorite={handleFavorite} // Dodan prop
            />
          ))}
        </div>
      </div>
    </div>
  )
}