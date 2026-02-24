"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Lightbulb, BookOpen } from "lucide-react"
import { inspirationPages } from "../../navigationData"

const pathToIcon: Record<string, typeof Lightbulb> = {
  "/inspiration/ideas": Lightbulb,
  "/inspiration/guides-tips-trends": BookOpen,
}

export function InspirationQuickLinks() {
  const pathname = usePathname()

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
      {inspirationPages.map((page) => {
        const isActive =
          pathname === page.path || pathname.startsWith(page.path + "/")
        const Icon = pathToIcon[page.path] ?? Lightbulb
        return (
          <Link
            key={page.path}
            href={page.path}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all group ${
              isActive
                ? "bg-[#FF69B4]/10 border-[#FF69B4] dark:bg-[#FF69B4]/20"
                : "bg-white dark:bg-[#1E1E1E] border-[#E0E0E0] dark:border-[#2D2D2D] hover:border-[#FFB6C1] hover:bg-[#FFB6C1]/5 dark:hover:bg-[#FF69B4]/10"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isActive
                  ? "bg-[#FF69B4] text-white"
                  : "bg-[#FFB6C1]/20 dark:bg-[#FF69B4]/20 text-[#FF69B4] group-hover:bg-[#FFB6C1]/40 dark:group-hover:bg-[#FF69B4]/40"
              }`}
            >
              <Icon size={20} />
            </div>
            <span
              className={`text-xs font-medium text-center ${
                isActive ? "text-[#FF69B4]" : "text-[#1A1A1A] dark:text-white"
              }`}
            >
              {page.title}
            </span>
          </Link>
        )
      })}
      </div>
    </div>
  )
}
