import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock } from "lucide-react"
import type { GuideArticle } from "../_data/guides-and-stories"

export function GuideSmallCard({ article }: { article: GuideArticle }) {
  return (
    <Link
      href={`/inspiration/guides-tips-trends/${article.id}`}
      className="group block bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden hover:opacity-95 transition-opacity"
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
        <p className="text-sm text-[#666666] dark:text-[#B0B0B0] line-clamp-2 mb-3">
          {article.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-[#666666] dark:text-[#B0B0B0]">
            <Clock size={12} />
            {article.readTime} min read
          </span>
          <span className="inline-flex items-center gap-0.5 text-sm font-medium text-[#FF69B4]">
            Read <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  )
}
