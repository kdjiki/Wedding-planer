import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex gap-4 p-6 bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E0E0E0] dark:border-[#2D2D2D] shadow-md ">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-[#FFB6C1]/20 dark:bg-[#FF69B4]/20 rounded-lg flex items-center justify-center">
          <Icon size={24} className="text-[#FF69B4]" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-white mb-2">{title}</h3>
        <p className="text-[#666666] dark:text-[#B0B0B0] text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
