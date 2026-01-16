import { Building2, Camera, UtensilsCrossed, Music, Sparkles, ClipboardList } from "lucide-react"
import { ServiceCard } from "./service-card"

export function ServicesSection() {
  const services = [
    {
      icon: Building2,
      title: "Wedding Halls",
      description: "Find your perfect location",
      href: "/wedding-service/wedding-halls",
    },
    {
      icon: Camera,
      title: "Photographers",
      description: "Capture every precious moment",
      href: "/wedding-service/photographers",
    },
    {
      icon: UtensilsCrossed,
      title: "Catering",
      description: "Delight your guests",
      href: "/wedding-service/catering",
    },
    {
      icon: Music,
      title: "Music & Entertainment",
      description: "Set the perfect mood",
      href: "/wedding-service/bands-djs",
    },
    {
      icon: Sparkles,
      title: "Decorations",
      description: "Create stunning ambiance",
      href: "/wedding-service/other-services",
    },
    {
      icon: ClipboardList,
      title: "Wedding Planning",
      description: "Professional guidance",
      href: "/wedding-service/other-services",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F5F5] dark:bg-[#1E1E1E]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] dark:text-white mb-3">Explore Our Services</h2>
          <p className="text-lg text-[#666666] dark:text-[#B0B0B0]">Everything you need for your perfect day</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}
