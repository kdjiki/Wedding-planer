import { notFound } from "next/navigation"
import Image from "next/image"
import { Calendar, Users, MapPin, Tag } from "lucide-react"
import {
  FEATURED_GUIDE,
  GUIDE_ARTICLES,
  REAL_WEDDING_STORIES,
  type RealWeddingStory,
} from "../../_data/guides-and-stories"
import { BackButton } from "@/app/_components/back-button"
import { db } from "@/db"
import { realWeddingStories } from "@/db/schema"
import { eq } from "drizzle-orm"

export default async function GuideOrStoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Guides ostaju iz static _data
  const allGuides = [FEATURED_GUIDE, ...GUIDE_ARTICLES]
  const guide = allGuides.find((g) => g.id === id)

  // Pokušaj prvo naći real wedding u bazi, pa fallback na static _data
  let storyFromDb: Awaited<ReturnType<typeof db.query.realWeddingStories.findFirst>> = undefined
  try {
    storyFromDb = await db.query.realWeddingStories.findFirst({
      where: eq(realWeddingStories.id, id),
    })
  } catch {
    // DB unavailable (e.g. connection pool limit)
  }

  const story: RealWeddingStory | undefined = storyFromDb
    ? {
        id: storyFromDb.id,
        tag: storyFromDb.tag,
        couple: storyFromDb.couple,
        location: storyFromDb.location,
        date: storyFromDb.date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
        guests: storyFromDb.guests,
        description: storyFromDb.description,
        image: storyFromDb.image,
      }
    : REAL_WEDDING_STORIES.find((s) => s.id === id)

  const content = guide || story
  if (!content) notFound()

  const isGuide = !!guide
  const title = isGuide ? guide.title : (story as RealWeddingStory).couple
  const image = content.image
  const description = content.description

  return (
    <div className="pt-16">
      <section className="bg-white dark:bg-[#1E1E1E] border-b border-[#E0E0E0] dark:border-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <BackButton />

          {/* IMAGE - h-[400px] kao na ostalim stranicama */}
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* TITLE */}
          <h1 className="text-3xl font-bold mb-4 text-[#1A1A1A] dark:text-white">
            {title}
          </h1>

          {/* META INFO - Row s ikonama (isto kao ServiceDetails) */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-semibold text-[#1A1A1A] dark:text-white mb-6">
            {isGuide ? (
              <div className="flex items-center gap-2 shrink-0">
                <Tag size={20} className="text-[#FF69B4]" />
                <span className="text-sm uppercase tracking-wider text-[#FF69B4]">
                  {guide.category}
                </span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 shrink-0">
                  <MapPin size={20} className="text-[#FF69B4]" />
                  <span className="text-sm">{story?.location}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-[#666666] dark:text-[#B0B0B0]">
                  <Calendar size={20} />
                  <span>{story?.date}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-[#666666] dark:text-[#B0B0B0]">
                  <Users size={20} />
                  <span>{story?.guests} guests</span>
                </div>
              </>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="max-w-4xl">
            <p className="text-lg text-[#666666] dark:text-[#B0B0B0] leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}