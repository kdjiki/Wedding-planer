import Link from "next/link"
import Image from "next/image"
import type { GuideArticle } from "../_data/guides-and-stories"

export function GuideFeaturedCard({ article }: { article: GuideArticle }) {
  return (
    <Link
      href={`/inspiration/guides-tips-trends/${article.id}`}
      className="group flex flex-col sm:flex-row bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden border border-[#E0E0E0] dark:border-[#2D2D2D] hover:border-[#FF69B4] hover:shadow-lg hover:opacity-95 transition-all"
    >
      <div className="relative w-full sm:w-[42%] sm:min-w-[260px] aspect-[4/5] sm:aspect-auto sm:min-h-[260px]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, 40vw"
        />
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8 flex-1">
        <span className="inline-block px-2.5 py-1 bg-[#F0F0F0] dark:bg-[#2D2D2D] text-[#666666] dark:text-[#B0B0B0] text-xs font-medium rounded mb-3 w-fit">
          {article.category}
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] dark:text-white mb-2 group-hover:text-[#FF69B4] transition-colors">
          {article.title}
        </h2>
        <p className="text-[#666666] dark:text-[#B0B0B0] text-sm sm:text-base leading-relaxed">
          {article.description}
        </p>
      </div>
    </Link>
  )
}
