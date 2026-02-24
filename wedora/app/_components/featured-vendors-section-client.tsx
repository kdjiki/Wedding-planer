"use client"

import { useState, useEffect, useMemo } from "react"
import { ServiceListingCard } from "./service-listing-card"
import { toggleFavoriteAction, fetchUserFavorites } from "@/lib/favorites-actions"
import { usePathname, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"


interface FeaturedVendorsSectionProps {
  initialVendors: any[]
}

export function FeaturedVendorsSectionClient({ initialVendors }: { initialVendors: any[] }) {
  // 1. State za favorite i mounted
  const [mounted, setMounted] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    
    // first read from localStorage for speed
    const saved = localStorage.getItem("wedding_favs")
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)))
    }

    // Sync with DB
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

    // background sync
    toggleFavoriteAction(id, isAdding).catch((err) => {
      console.error("Home sync failed:", err)
    })
  }

  // 2. map initialVendors to include isFavorited
  const vendors = useMemo(() => {
    return initialVendors.map((v) => ({
      ...v,
      isFavorited: mounted ? favorites.has(v.id) : false,
    }))
  }, [initialVendors, favorites, mounted])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F5F5] dark:bg-[#1E1E1E]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] dark:text-white mb-3">
            Top-Rated Service Providers
          </h2>
          <p className="text-lg text-[#666666] dark:text-[#B0B0B0]">
            Trusted by couples everywhere
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {vendors.map((vendor) => (
            <ServiceListingCard 
              key={vendor.id} 
              listing={vendor} 
              onFavorite={handleFavorite}
            />
          ))}
        </div>

        <div className="text-center">
          <a href="/wedding-service">
            <button className="px-8 py-3 bg-[#FF69B4] text-white rounded-lg hover:bg-[#FF1493] transition-colors font-medium cursor-pointer">
              View All Vendors
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}