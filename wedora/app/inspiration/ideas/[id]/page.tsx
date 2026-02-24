import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { WEDDING_IDEAS } from "../../_data/wedding-ideas"

export default async function IdeaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const idea = WEDDING_IDEAS.find((i) => i.id === id)
  if (!idea) notFound()

  return (
    <div className="pt-16 min-h-screen bg-[#F5F5F5] dark:bg-[#121212]">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Link
          href="/inspiration/ideas"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#666666] dark:text-[#B0B0B0] hover:text-[#FF69B4] mb-6"
        >
          <ArrowLeft size={16} /> Back to Ideas
        </Link>
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden border border-[#E0E0E0] dark:border-[#2D2D2D]">
          <div className="relative aspect-[16/10]">
            <Image
              src={idea.image}
              alt={idea.title}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
              priority
            />
          </div>
          <div className="p-6 sm:p-8">
            <span className="text-xs font-medium text-[#FF69B4] uppercase tracking-wider">
              {idea.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] dark:text-white mt-2 mb-4">
              {idea.title}
            </h1>
            <p className="text-[#666666] dark:text-[#B0B0B0] leading-relaxed">
              {idea.description}
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
