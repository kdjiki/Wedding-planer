"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { services } from "@app/servicesType";


// const categories = [
//   { label: "Venues", href: "/services/venues", icon: Building2 },
//   { label: "Photography", href: "/services/photography", icon: Camera },
//   { label: "Catering", href: "/services/catering", icon: UtensilsCrossed },
//   { label: "Entertainment", href: "/services/entertainment", icon: Music },
//   { label: "Decorations", href: "/services/decorations", icon: Flower2 },
//   { label: "Planning", href: "/services/planning", icon: ClipboardList },
// ]

export function CategoryQuickLinks() {
  const pathname = usePathname()

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {services.map((cat) => {
        const isActive = pathname === cat.href
        const Icon = cat.icon
        return (
          <Link
            key={cat.id}
            href={cat.href}
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
              {cat.title}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
