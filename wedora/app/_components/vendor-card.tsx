import Image from "next/image"
import { Heart } from "lucide-react"
import { ServiceListing } from "@data/listings"

export function VendorCard({
  id,
  image,
  name,
  category,
  rating,
  location,
  priceRange,
  description,
  isFavorited,
  tags,
}: ServiceListing) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer border border-[#E0E0E0] dark:border-[#2D2D2D] hover:border-[#FF69B4]">
      <a href="/wedding-service">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-white mb-1">{name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Heart size={16} className="text-[#FF69B4] fill-current" />
            <span className="text-sm font-semibold text-[#1A1A1A] dark:text-white">{rating}</span>
          </div>
        </div>
        <p className="text-sm text-[#666666] dark:text-[#B0B0B0] mb-4">Starting at {priceRange}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags?.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-[#E0E0E0] dark:bg-[#2D2D2D] text-[#666666] dark:text-[#B0B0B0] text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <button className="w-full py-2 border-2 border-[#FF69B4] text-[#FF69B4] rounded-lg hover:bg-[#FF69B4] hover:text-white transition-colors font-medium cursor-pointer">
          View Details
        </button>
      </div>
      </a>
    </div>
  )
}
