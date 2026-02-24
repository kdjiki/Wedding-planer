import Link from "next/link"
import Image from "next/image"
import type { GuideArticle } from "../_data/guides-and-stories"

export function GuideSmallCard({ article }: { article: GuideArticle }) {
  return (
    <Link
      href={`/inspiration/guides-tips-trends/${article.id}`}
      className="group block bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden border border-[#E0E0E0] dark:border-[#2D2D2D] hover:border-[#FF69B4] hover:shadow-lg hover:opacity-95 transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <span className="inline-block px-2.5 py-1 bg-[#F0F0F0] dark:bg-[#2D2D2D] text-[#666666] dark:text-[#B0B0B0] text-xs font-medium rounded mb-2">
          {article.category}
        </span>
        <h3 className="font-bold text-[#1A1A1A] dark:text-white mb-1 line-clamp-2 group-hover:text-[#FF69B4] transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-[#666666] dark:text-[#B0B0B0] line-clamp-2">
          {article.description}
        </p>
      </div>
    </Link>
  )
}
