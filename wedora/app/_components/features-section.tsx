import { client } from "@/sanity/lib/client" 
import { FeatureCard } from "./feature-card"
import { Clock, Shield, Star, MessageCircle, Calendar, DollarSign, Users } from "lucide-react"

const iconMap = {
  clock: Clock,
  shield: Shield,
  star: Star,
  message: MessageCircle,
  calendar: Calendar,
  dollar: DollarSign,
  users: Users,
}

export async function FeaturesSection() {
  const features = await client.fetch(`*[_type == "feature"]{title, description, icon}`) || []

  return (
    <section className="py-20 px-4 bg-white dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature: any, index: number) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Star

            return (
              <FeatureCard
                key={feature._id || index}
                icon={IconComponent}
                title={feature.title || "Bez naslova"}
                description={feature.description || "Nema opisa"}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}