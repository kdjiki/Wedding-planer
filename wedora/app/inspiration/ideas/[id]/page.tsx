import { notFound } from "next/navigation"
import Image from "next/image"
import { Tag } from "lucide-react" 
import { db } from "@/db"
import { weddingIdeas } from "@/db/schema"
import { eq } from "drizzle-orm"

import { BackButton } from "@/app/_components/back-button"

export default async function IdeaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const idea = await db.query.weddingIdeas.findFirst({
    where: eq(weddingIdeas.id, id),
  })

  if (!idea) {
    notFound()
  }

  return (
    <div className="pt-16">
      {/* HEADER */}
      <section className="bg-white dark:bg-[#1E1E1E] border-b border-[#E0E0E0] dark:border-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <BackButton />

          {/* IMAGE  */}
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
            <Image
              src={idea.image}
              alt={idea.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* TITLE */}
          <h1 className="text-3xl font-bold mb-2 text-[#1A1A1A] dark:text-white">
            {idea.title}
          </h1>

          {/* META INFO  */}
          <div className="flex gap-4 text-sm font-semibold text-[#1A1A1A] dark:text-white mb-4 gap-8">
            <div className="flex items-center gap-2 shrink-0">
              <Tag size={20} className="text-[#FF69B4]" />
              <span className="text-sm uppercase tracking-wider text-[#FF69B4]">
                {idea.category}
              </span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="text-lg text-[#666666] dark:text-[#B0B0B0] leading-relaxed">
            {idea.description}
          </p>
        </div>
      </section>
    </div>
  )
}