"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, UserRound } from "lucide-react"

type Tab = {
  title: string
  path: `/${string}`
  icon: "profile" | "favorites"
}

const ICONS: Record<Tab["icon"], React.ReactNode> = {
  profile: <UserRound size={16} />,
  favorites: <Heart size={16} />,
}

export function AccountTabs({ tabs }: { tabs: Tab[] }) {
  const pathname = usePathname()

  return (
    <div className="sticky top-16 z-40 bg-zinc-50/90 dark:bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="mx-auto w-full max-w-5xl">
          <div className="rounded-2xl border border-[#E0E0E0] dark:border-[#2D2D2D] bg-white dark:bg-[#111111] p-1">
            <div className="grid grid-cols-2 gap-1">
              {tabs.map((tab) => {
                const isActive = pathname === tab.path || pathname.startsWith(tab.path + "/")
                return (
                  <Link
                    key={tab.path}
                    href={tab.path}
                    className={[
                      "flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-[#FF69B4] text-white"
                        : "text-[#1A1A1A] dark:text-white hover:bg-[#FFB6C1]/20 dark:hover:bg-white/5",
                    ].join(" ")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span
                      className={isActive ? "text-white" : "text-[#1A1A1A] dark:text-white"}
                      aria-hidden="true"
                    >
                      {ICONS[tab.icon]}
                    </span>
                    <span>{tab.title}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

