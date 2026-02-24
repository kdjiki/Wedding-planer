import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ReadyToPlanCta() {
  return (
    <section className="bg-[#FF69B4] dark:bg-[#FF1493] py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-white mb-3">
          Ready to Start Planning?
        </h2>
        <p className="text-white/95 text-base sm:text-lg mb-6">
          Join thousands of happy couples who planned their perfect day with Wedora.
        </p>
        <Link
          href="/wedding-service"
          className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] font-medium px-6 py-3 rounded-xl hover:bg-white/95 transition-colors"
        >
          Get Started Free <ArrowRight size={18} />
        </Link>
        <p className="text-white/80 text-xs sm:text-sm mt-4">
          No credit card required. Free to browse.
        </p>
      </div>
    </section>
  )
}
