"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"

import { ServiceListingCard } from "@/app/_components/service-listing-card"
import { fetchUserFavorites, toggleFavoriteAction } from "@/lib/favorites-actions"
import { supabase } from "@/lib/supabase"

type Listing = {
  id: string
  image: string
  name: string
  category: string
  rating: number
  location: string
  priceRange: string
  description: string
  isFavorited?: boolean
  tags?: string[]
}

export default function MyFavoritesPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())
  const [listings, setListings] = useState<Listing[]>([])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)

      const ids = await fetchUserFavorites()
      const idSet = new Set(ids)
      setFavoriteIds(idSet)

      if (ids.length === 0) {
        setListings([])
        setLoading(false)
        return
      }

      const [{ data: services, error: servicesError }, { data: tags, error: tagsError }] = await Promise.all([
        supabase
          .from("service_listings")
          .select("id,image,name,category,rating,location,price_range,description")
          .in("id", ids),
        supabase.from("service_tags").select("listing_id,tag").in("listing_id", ids),
      ])

      if (servicesError) throw servicesError
      if (tagsError) throw tagsError

      const tagsById = new Map<string, string[]>()
      for (const t of tags ?? []) {
        const listingId = (t as any).listing_id as string
        const tag = (t as any).tag as string
        if (!listingId || !tag) continue
        const arr = tagsById.get(listingId) ?? []
        arr.push(tag)
        tagsById.set(listingId, arr)
      }

      const mapped: Listing[] = (services ?? []).map((s: any) => ({
        id: s.id,
        image: s.image,
        name: s.name,
        category: s.category,
        rating: s.rating,
        location: s.location,
        priceRange: s.price_range,
        description: s.description,
        isFavorited: true,
        tags: tagsById.get(s.id) ?? [],
      }))

      setListings(mapped)
      setLoading(false)
    }

    load().catch(() => {
      setError("Failed to load favorites.")
      setLoading(false)
    })
  }, [])

  const countLabel = useMemo(() => {
    const n = listings.length
    return `${n} ${n === 1 ? "service" : "services"}`
  }, [listings.length])

  const handleFavorite = async (id: string) => {
    const next = new Set(favoriteIds)
    const isAdding = !next.has(id)
    if (isAdding) next.add(id)
    else next.delete(id)

    setFavoriteIds(next)
    setListings((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, isFavorited: isAdding } : l))
        .filter((l) => l.isFavorited)
    )
    localStorage.setItem("wedding_favs", JSON.stringify(Array.from(next)))

    try {
      await toggleFavoriteAction(id, isAdding)
    } catch {
      // best-effort sync; UI stays optimistic
    }
  }

  return (
    <div className="bg-zinc-50 dark:bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#FFB6C1]/20 dark:bg-[#FF69B4]/20 rounded-full flex items-center justify-center">
              <Heart size={18} className="text-[#FF69B4]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] dark:text-white">My Favorites</h1>
          </div>
          <p className="text-sm text-[#666666] dark:text-[#B0B0B0] mb-6">
            {loading ? "Loading..." : `You have ${countLabel} in your favorites.`}
          </p>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {!loading && !error && listings.length === 0 ? (
            <div className="bg-white dark:bg-[#111111] border border-[#E0E0E0] dark:border-[#2D2D2D] rounded-2xl p-8 text-center">
              <Heart size={24} className="mx-auto mb-3 text-[#FF69B4]" />
              <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white">No favorites yet</h3>
              <p className="mt-2 text-sm text-[#666666] dark:text-[#B0B0B0]">
                Browse vendors and tap the heart to save them here.
              </p>
              <Link
                href="/wedding-service"
                className="inline-flex mt-5 px-6 py-2 bg-[#FF69B4] text-white rounded-lg hover:bg-[#FF1493] transition-colors font-medium"
              >
                Browse Services
              </Link>
            </div>
          ) : null}

          {listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map((listing) => (
                <ServiceListingCard key={listing.id} listing={listing} onFavorite={handleFavorite} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

