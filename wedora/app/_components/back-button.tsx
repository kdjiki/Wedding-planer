"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="text-sm text-[#666666] dark:text-[#B0B0B0] hover:text-[#FF1493] transition-colors mb-4"
    >
      <div className="flex items-center justify-center gap-2 text-[#FF69B4] hover:text-[#FF1493] dark:hover:text-[#FFB6C1] transition-colors text-sm font-medium">
        <ArrowLeft size={16} /> Back
      </div>
    </button>
  )
}