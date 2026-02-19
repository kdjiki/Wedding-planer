import { Star, MapPin, Heart, CheckCircle } from "lucide-react"
import Image from "next/image"

export interface ServiceListing {
  id: string
  image: string
  name: string
  category: string
  rating: number
  reviewCount: number
  location: string
  priceRange: string
  description: string
  isVerified?: boolean
  isFavorited?: boolean
  tags?: string[]
}

interface ServiceListingCardProps {
  listing: ServiceListing
  onFavorite?: (id: string) => void
}

export function ServiceListingCard({ listing, onFavorite }: ServiceListingCardProps) {
  return (
    <div className="group bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#2D2D2D] rounded-xl overflow-hidden hover:shadow-lg hover:border-[#FF69B4] transition-all">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.name}
              fill
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onFavorite?.(listing.id)
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
            listing.isFavorited
              ? "bg-[#FF69B4] text-white"
              : "bg-black/30 text-white hover:bg-[#FF69B4]"
          }`}
          aria-label={listing.isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={16} fill={listing.isFavorited ? "currentColor" : "none"} />
        </button>
        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">
          {listing.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="text-base font-bold text-[#1A1A1A] dark:text-white truncate">{listing.name}</h3>
            {listing.isVerified && (
              <CheckCircle size={16} className="text-[#FF69B4] shrink-0" aria-label="Verified vendor" />
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-[#1A1A1A] dark:text-white">{listing.rating}</span>
            <span className="text-xs text-[#666666] dark:text-[#B0B0B0]">({listing.reviewCount})</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-3">
          <MapPin size={14} className="text-[#666666] dark:text-[#B0B0B0] shrink-0" />
          <span className="text-sm text-[#666666] dark:text-[#B0B0B0] truncate">{listing.location}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-[#666666] dark:text-[#B0B0B0] leading-relaxed line-clamp-2 mb-4">
          {listing.description}
        </p>

        {/* Tags */}
        {listing.tags && listing.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {listing.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-[#FFB6C1]/15 dark:bg-[#FF69B4]/15 text-[#FF69B4] text-xs font-medium rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E0E0E0] dark:border-[#2D2D2D]">
          <div>
            <span className="text-xs text-[#666666] dark:text-[#B0B0B0]">Starting at</span>
            <p className="text-base font-bold text-[#1A1A1A] dark:text-white">{listing.priceRange}</p>
          </div>
          <button className="px-5 py-2 bg-[#FF69B4] text-white text-sm font-medium rounded-lg hover:bg-[#FF1493] transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
