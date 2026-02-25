import { BookOpen, Heart } from "lucide-react";
import { InspirationQuickLinks } from "../_components/inspiration-quick-links";
import { GuideFeaturedCard } from "../_components/guide-featured-card";
import { GuideSmallCard } from "../_components/guide-small-card";
import { RealWeddingCard } from "../_components/real-wedding-card";
import { CtaSection } from "@/app/_components/cta-section";
import { db } from "@/db";
import { realWeddingStories } from "@/db/schema";
import { supabase } from "@/lib/supabase";
import {
  FEATURED_GUIDE,
  GUIDE_ARTICLES,
  REAL_WEDDING_STORIES,
  type GuideArticle,
  type RealWeddingStory,
} from "../_data/guides-and-stories";
import { MyPostsPanel } from "../_components/my-posts-panel";

// Uvijek dohvaćaj svježe podatke iz baze (postovi iz guide_articles)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GuidesTipsTrendsPage() {
  let storiesFromDb: {
    id: string
    tag: string
    couple: string
    location: string
    date: Date
    guests: number
    description: string
    image: string
  }[] = []
  let guidesFromDb: {
    id: string
    tag: string
    category: string
    title: string
    description: string
    image: string
    userId?: string | null
  }[] = []

  try {
    storiesFromDb = await db.select().from(realWeddingStories)
  } catch {
    // Fallback when DB unavailable (e.g. connection pool limit)
  }

  try {
    const { data, error } = await supabase
      .from("guide_articles")
      .select("id, tag, category, title, description, image, user_id")

    if (error) throw error
    guidesFromDb = (data ?? []).map((row) => ({
      id: row.id as string,
      tag: row.tag as string,
      category: row.category as string,
      title: row.title as string,
      description: row.description as string,
      image: row.image as string,
      userId: (row as { user_id?: string | null }).user_id ?? null,
    }))
  } catch {
    // Fallback to static data when DB unavailable
  }

  const guidesSource =
    guidesFromDb.length > 0
      ? guidesFromDb.map((g) => ({
          id: g.id,
          tag: g.tag as GuideArticle["tag"],
          category: g.category,
          title: g.title,
          description: g.description,
          readTime: 5,
          image: g.image,
        }))
      : GUIDE_ARTICLES

  const featuredGuide: GuideArticle =
    guidesSource.find((g) => g.tag === "Trending") || FEATURED_GUIDE;

  const guideArticlesMapped: GuideArticle[] = guidesSource.filter(
    (g) => g.id !== featuredGuide.id
  );

  const realWeddingStoriesMapped: RealWeddingStory[] =
    storiesFromDb.length === 0
      ? REAL_WEDDING_STORIES
      : storiesFromDb.map((story) => ({
          id: story.id,
          tag: story.tag,
          couple: story.couple,
          location: story.location,
          date: story.date.toLocaleString("default", {
            month: "long",
            year: "numeric",
          }),
          guests: story.guests,
          description: story.description,
          image: story.image,
        }));

  return (
    <div className="pt-16">
      <section className="bg-white dark:bg-[#1E1E1E] border-b border-[#E0E0E0] dark:border-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#FFB6C1]/20 dark:bg-[#FF69B4]/20 rounded-full flex items-center justify-center">
              <BookOpen size={20} className="text-[#FF69B4]" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] dark:text-white text-balance">
              Guides, tips & trends
            </h1>
          </div>
          <p className="text-[#666666] dark:text-[#B0B0B0] text-sm sm:text-base leading-relaxed max-w-2xl ml-[52px]">
            Planning guides, budgeting tips, timelines, and the latest wedding
            trends.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-8">
          <InspirationQuickLinks />
        </div>

        {/* Guides, Tips & Trends section */}
        {featuredGuide && (
          <section className="mb-12">
            <div className="mb-6">
              <GuideFeaturedCard article={featuredGuide} />
            </div>
            {guideArticlesMapped.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                {guideArticlesMapped.map((article) => (
                  <GuideSmallCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Real Wedding Stories section */}
        {realWeddingStoriesMapped.length > 0 && (
          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-[#1A1A1A] dark:text-white mb-6">
              <Heart size={20} className="text-[#FF69B4]" />
              Real Wedding Stories
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {realWeddingStoriesMapped.map((story) => (
                <RealWeddingCard key={story.id} story={story} />
              ))}
            </div>
          </section>
        )}
      </div>
      <CtaSection />
      <MyPostsPanel />
    </div>
  );
}
