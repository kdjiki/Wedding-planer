import Image from "next/image"
import { Star } from "lucide-react"

interface VendorCardProps {
  image: string
  name: string
  category: string
  rating: number
  reviewCount: number
  startingPrice: string
  isNew?: boolean
}

export function VendorCard({
  image,
  name,
  category,
  rating,
  reviewCount,
  startingPrice,
  isNew = false,
}: VendorCardProps) {
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
        {isNew && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-[#FF69B4] text-white text-xs font-bold rounded-full">
            New
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-white mb-1">{name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-[#1A1A1A] dark:text-white">{rating}</span>
          </div>
          <span className="text-sm text-[#666666] dark:text-[#B0B0B0]">({reviewCount} reviews)</span>
        </div>
        <p className="text-sm text-[#666666] dark:text-[#B0B0B0] mb-4">Starting at {startingPrice}</p>
        <button className="w-full py-2 border-2 border-[#FF69B4] text-[#FF69B4] rounded-lg hover:bg-[#FF69B4] hover:text-white transition-colors font-medium cursor-pointer">
          View Details
        </button>
      </div>
      </a>
    </div>
  )
}
