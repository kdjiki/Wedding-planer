import Link from "next/link"
import Image from "next/image"
import { Calendar, Users } from "lucide-react"
import type { RealWeddingStory } from "../_data/guides-and-stories"

export function RealWeddingCard({ story }: { story: RealWeddingStory }) {
  return (
    <Link
      href={`/inspiration/guides-tips-trends/${story.id}`}
      className="group flex flex-col sm:flex-row bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden border border-[#E0E0E0] dark:border-[#2D2D2D] hover:border-[#FF69B4] hover:shadow-lg hover:opacity-95 transition-all"
    >
      <div className="relative w-full sm:w-[42%] sm:min-w-[240px] aspect-[4/3] sm:aspect-auto sm:min-h-[240px]">
        <Image
          src={story.image}
          alt={story.couple}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, 40vw"
        />
      </div>
      <div className="flex flex-col justify-center p-5 sm:p-6 flex-1">
        <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] dark:text-white mb-2 group-hover:text-[#FF69B4] transition-colors">
          {story.couple}
        </h3>
        <p className="text-sm text-[#666666] dark:text-[#B0B0B0] mb-2">
          {story.location}
        </p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#666666] dark:text-[#B0B0B0] mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {story.date}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} />
            {story.guests} guests
          </span>
        </div>
        <p className="text-sm text-[#666666] dark:text-[#B0B0B0] leading-relaxed line-clamp-2">
          {story.description}
        </p>
      </div>
    </Link>
  )
}
