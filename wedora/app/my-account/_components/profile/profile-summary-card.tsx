"use client"

import { useState } from "react"
import { CalendarDays, Mail, MapPin, Phone, UserRound } from "lucide-react"

export type ProfileSummary = {
  fullName: string
  roleLabel: string
  bio: string
  email: string
  phone: string
  location: string
  memberSinceLabel: string
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const a = parts[0]?.[0] ?? "U"
  const b = parts.length > 1 ? parts[parts.length - 1]?.[0] : ""
  return (a + b).toUpperCase()
}

type RoleOption = "bride" | "groom"

export function ProfileSummaryCard({
  summary,
  onChangeRole,
}: {
  summary: ProfileSummary
  onChangeRole?: (role: RoleOption) => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  const currentRole: RoleOption =
    summary.roleLabel.toLowerCase() === "groom" ? "groom" : "bride"

  const rolePillClasses =
    currentRole === "groom"
      ? "bg-[#1D4ED8]/20 text-[#1D4ED8]"
      : "bg-[#FFB6C1]/25 text-[#FF1493] dark:text-[#FFB6C1]"

  const handleSelect = (role: RoleOption) => {
    setMenuOpen(false)
    onChangeRole?.(role)
  }

  return (
    <section className="bg-white dark:bg-[#111111] border border-[#E0E0E0] dark:border-[#2D2D2D] rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="h-20 w-20 rounded-full bg-[#FFB6C1]/25 dark:bg-[#FF69B4]/20 flex items-center justify-center text-[#FF1493] dark:text-[#FFB6C1] font-bold">
            <span className="sr-only">Avatar</span>
            <span className="text-xl">{initials(summary.fullName)}</span>
          </div>
          <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-white dark:bg-[#111111] border border-[#E0E0E0] dark:border-[#2D2D2D] flex items-center justify-center">
            <MapPin size={16} className="text-[#FF69B4]" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-white">{summary.fullName}</h2>

        <div className="mt-1 relative">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold cursor-pointer transition-colors ${
              rolePillClasses
            } ${
              currentRole === "groom"
                ? "hover:bg-[#1D4ED8]/30"
                : "hover:bg-[#FFB6C1]/40"
            }`}
          >
            <UserRound size={14} />
            {currentRole === "groom" ? "Groom" : "Bride"}
          </button>

          {menuOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 rounded-2xl bg-[#1A1A1A] text-white text-[11px] shadow-lg border border-[#2D2D2D] px-2 py-1 flex gap-1">
              <button
                type="button"
                onClick={() => handleSelect("bride")}
                className={`px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                  currentRole === "bride"
                    ? "bg-[#FF69B4] border-[#FF69B4] text-white"
                    : "border-transparent text-[#FFB6C1] hover:border-[#FF69B4] hover:bg-[#FF69B4]/10"
                }`}
              >
                Bride
              </button>
              <button
                type="button"
                onClick={() => handleSelect("groom")}
                className={`px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                  currentRole === "groom"
                    ? "bg-[#1D4ED8] border-[#1D4ED8] text-white"
                    : "border-[#1D4ED8] text-[#93C5FD] hover:bg-[#1D4ED8]/20 hover:text-white"
                }`}
              >
                Groom
              </button>
            </div>
          )}
        </div>

        <p className="mt-4 text-sm text-[#666666] dark:text-[#B0B0B0] leading-relaxed">
          {summary.bio}
        </p>

        <div className="mt-5 w-full border-t border-[#E0E0E0] dark:border-[#2D2D2D]" />

        <dl className="mt-5 w-full space-y-3 text-left">
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-[#FF69B4]" />
            <dd className="text-sm text-[#1A1A1A] dark:text-white truncate">{summary.email}</dd>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={16} className="text-[#FF69B4]" />
            <dd className="text-sm text-[#1A1A1A] dark:text-white truncate">{summary.phone}</dd>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-[#FF69B4]" />
            <dd className="text-sm text-[#1A1A1A] dark:text-white truncate">{summary.location}</dd>
          </div>
          <div className="flex items-center gap-3">
            <CalendarDays size={16} className="text-[#FF69B4]" />
            <dd className="text-sm text-[#1A1A1A] dark:text-white truncate">
              Member since {summary.memberSinceLabel}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

