import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, Calendar, Users } from "lucide-react"
import {
  FEATURED_GUIDE,
  GUIDE_ARTICLES,
  REAL_WEDDING_STORIES,
} from "../../_data/guides-and-stories"

export default async function GuideOrStoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const allGuides = [FEATURED_GUIDE, ...GUIDE_ARTICLES]
  const guide = allGuides.find((g) => g.id === id)
  const story = REAL_WEDDING_STORIES.find((s) => s.id === id)

  if (guide) {
    return (
      <div className="pt-16 min-h-screen bg-[#F5F5F5] dark:bg-[#121212]">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <Link
            href="/inspiration/guides-tips-trends"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#666666] dark:text-[#B0B0B0] hover:text-[#FF69B4] mb-6"
          >
            <ArrowLeft size={16} /> Back to Guides
          </Link>
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden border border-[#E0E0E0] dark:border-[#2D2D2D]">
            <div className="relative aspect-[16/10]">
              <Image
                src={guide.image}
                alt={guide.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
              />
            </div>
            <div className="p-6 sm:p-8">
              <span className="inline-block px-2.5 py-1 bg-[#F0F0F0] dark:bg-[#2D2D2D] text-[#666666] dark:text-[#B0B0B0] text-xs font-medium rounded mb-3">
                {guide.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] dark:text-white mb-4">
                {guide.title}
              </h1>
              <p className="flex items-center gap-2 text-sm text-[#666666] dark:text-[#B0B0B0] mb-6">
                <Clock size={16} />
                {guide.readTime} min read
              </p>
              <p className="text-[#666666] dark:text-[#B0B0B0] leading-relaxed">
                {guide.description}
              </p>
            </div>
          </div>
        </article>
      </div>
    )
  }

  if (story) {
    return (
      <div className="pt-16 min-h-screen bg-[#F5F5F5] dark:bg-[#121212]">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <Link
            href="/inspiration/guides-tips-trends"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#666666] dark:text-[#B0B0B0] hover:text-[#FF69B4] mb-6"
          >
            <ArrowLeft size={16} /> Back to Guides
          </Link>
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden border border-[#E0E0E0] dark:border-[#2D2D2D]">
            <div className="relative aspect-[16/10]">
              <Image
                src={story.image}
                alt={story.couple}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
              />
            </div>
            <div className="p-6 sm:p-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] dark:text-white mb-2">
                {story.couple}
              </h1>
              <p className="text-[#666666] dark:text-[#B0B0B0] mb-4">
                {story.location}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-[#666666] dark:text-[#B0B0B0] mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  {story.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={16} />
                  {story.guests} guests
                </span>
              </div>
              <p className="text-[#666666] dark:text-[#B0B0B0] leading-relaxed">
                {story.description}
              </p>
            </div>
          </div>
        </article>
      </div>
    )
  }

  notFound()
}
