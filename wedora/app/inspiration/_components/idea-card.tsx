import Link from "next/link"
import Image from "next/image"
import type { WeddingIdea } from "../_data/wedding-ideas"

type CardSize = "default" | "large" | "wide" | "tall"

export function IdeaCard({ idea, size = "default" }: { idea: WeddingIdea; size?: CardSize }) {
  const fillsCell = size === "tall"
  const aspectClass =
    size === "wide"
      ? "aspect-[2/1] min-h-[140px]"
      : size === "tall"
        ? "min-h-[180px]"
        : "aspect-[4/3] min-h-[140px]"

  return (
    <Link
      href={`/inspiration/ideas/${idea.id}`}
      className={`group block rounded-xl overflow-hidden hover:opacity-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#FF69B4] focus:ring-offset-2 focus:ring-offset-[#F5F5F5] dark:focus:ring-offset-[#121212] ${fillsCell ? "h-full flex flex-col" : ""}`}
    >
      <div
        className={`relative w-full overflow-hidden ${fillsCell ? "flex-1 min-h-[160px]" : ""} ${aspectClass}`}
      >
        <Image
          src={idea.image}
          alt={idea.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="pt-3 shrink-0">
        <h3 className="font-semibold text-[#1A1A1A] dark:text-white mb-0.5 line-clamp-1">
          {idea.title}
        </h3>
        <p className="text-sm text-[#666666] dark:text-[#B0B0B0] line-clamp-2">
          {idea.description}
        </p>
      </div>
    </Link>
  )
}
