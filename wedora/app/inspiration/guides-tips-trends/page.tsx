import { BookOpen, Heart } from "lucide-react";
import { InspirationQuickLinks } from "../_components/inspiration-quick-links";
import { ReadyToPlanCta } from "../_components/ready-to-plan-cta";
import { GuideFeaturedCard } from "../_components/guide-featured-card";
import { GuideSmallCard } from "../_components/guide-small-card";
import { RealWeddingCard } from "../_components/real-wedding-card";
import {
  FEATURED_GUIDE,
  GUIDE_ARTICLES,
  REAL_WEDDING_STORIES,
} from "../_data/guides-and-stories";

export default function GuidesTipsTrendsPage() {
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
        <section className="mb-12">
          <div className="mb-6">
            <GuideFeaturedCard article={FEATURED_GUIDE} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {GUIDE_ARTICLES.map((article) => (
              <GuideSmallCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Real Wedding Stories section */}
        <section>
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#1A1A1A] dark:text-white mb-6">
            <Heart size={20} className="text-[#FF69B4]" />
            Real Wedding Stories
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {REAL_WEDDING_STORIES.map((story) => (
              <RealWeddingCard key={story.id} story={story} />
            ))}
          </div>
        </section>
      </div>
      <ReadyToPlanCta />
    </div>
  );
}
