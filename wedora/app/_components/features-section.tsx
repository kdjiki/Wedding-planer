import { Clock, Shield, Star, MessageCircle, Calendar, DollarSign } from "lucide-react"
import { FeatureCard } from "./feature-card"

export function FeaturesSection() {
  const features = [
    {
      icon: Clock,
      title: "Real-Time Availability",
      description: "Instant booking confirmation with live calendar updates",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Protected transactions with encrypted payment processing",
    },
    {
      icon: Star,
      title: "Verified Reviews",
      description: "Authentic feedback from real couples who used the services",
    },
    {
      icon: MessageCircle,
      title: "Direct Messaging",
      description: "Chat with vendors instantly to discuss your needs",
    },
    {
      icon: Calendar,
      title: "Smart Calendar",
      description: "Manage all your wedding bookings in one organized place",
    },
    {
      icon: DollarSign,
      title: "Best Price Guarantee",
      description: "Competitive pricing with transparent cost breakdowns",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] dark:text-white mb-3">Why Choose Wedora?</h2>
          <p className="text-lg text-[#666666] dark:text-[#B0B0B0]">Everything you need to plan your perfect wedding</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
