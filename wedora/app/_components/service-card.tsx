import { ArrowRight, type LucideIcon } from "lucide-react"

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

export function ServiceCard({ icon: Icon, title, description, href }: ServiceCardProps) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#2D2D2D] rounded-xl p-6 hover:shadow-lg hover:border-[#FF69B4] transition-all group cursor-pointer">
      <a href={href} className="flex flex-col h-full">
      <div className="w-16 h-16 bg-[#FFB6C1]/20 dark:bg-[#FF69B4]/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-[#FFB6C1]/40 dark:group-hover:bg-[#FF69B4]/40 transition-colors">
        <Icon size={32} className="text-[#FF69B4]" />
      </div>
      <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mb-2 text-center">{title}</h3>
      <p className="text-[#666666] dark:text-[#B0B0B0] text-sm mb-4 text-center leading-relaxed">{description}</p>
      
      <div className="flex items-center justify-center gap-2 text-[#FF69B4] hover:text-[#FF1493] dark:hover:text-[#FFB6C1] transition-colors text-sm font-medium">
        Browse <ArrowRight size={16} />
      </div>
      </a>
    </div>
  )
}
