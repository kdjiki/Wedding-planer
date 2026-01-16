import { Star } from "lucide-react"
import Image from "next/image"

interface TestimonialCardProps {
  quote: string
  name: string
  weddingDate: string
  image: string
  rating: number
}

export function TestimonialCard({ quote, name, weddingDate, image, rating }: TestimonialCardProps) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-[#E0E0E0] dark:border-[#2D2D2D] hover:shadow-lg transition-shadow">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-[#1A1A1A] dark:text-white mb-6 leading-relaxed italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <Image src={image || "/placeholder.svg"} alt={name} width={48} height={48} className="rounded-full object-cover" />
        <div>
          <p className="font-semibold text-[#1A1A1A] dark:text-white">{name}</p>
          <p className="text-sm text-[#666666] dark:text-[#B0B0B0]">Married {weddingDate}</p>
        </div>
      </div>
    </div>
  )
}
