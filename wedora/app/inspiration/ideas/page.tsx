import { Lightbulb } from "lucide-react"
import { InspirationQuickLinks } from "../_components/inspiration-quick-links"
import { IdeasContent } from "../_components/ideas-content"
import { CtaSection } from "@/app/_components/cta-section"

export default function IdeasPage() {
  return (
    <div className="pt-16">
      <section className="bg-white dark:bg-[#1E1E1E] border-b border-[#E0E0E0] dark:border-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#FFB6C1]/20 dark:bg-[#FF69B4]/20 rounded-full flex items-center justify-center">
              <Lightbulb size={20} className="text-[#FF69B4]" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] dark:text-white text-balance">
              Ideas
            </h1>
          </div>
          <p className="text-[#666666] dark:text-[#B0B0B0] text-sm sm:text-base leading-relaxed max-w-2xl ml-[52px]">
            Décor, themes, color palettes, and real wedding inspiration to spark your vision.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6">
          <InspirationQuickLinks />
        </div>
        <IdeasContent />
      </div>
      <CtaSection/>
    </div>
  )
}
