import { Search, Scale, CheckCircle } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: Search,
      title: "Browse",
      description: "Explore hundreds of verified wedding service providers",
    },
    {
      icon: Scale,
      title: "Compare",
      description: "Check availability, prices, and reviews all in one place",
    },
    {
      icon: CheckCircle,
      title: "Book",
      description: "Reserve your services instantly with real-time confirmation",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] dark:text-white mb-3">
            Your Wedding, Simplified
          </h2>
          <p className="text-lg text-[#666666] dark:text-[#B0B0B0]">Three easy steps to your perfect day</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Line - Desktop Only */}
          <div className="hidden md:block absolute top-16 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-[#FF69B4] via-[#FFB6C1] to-[#FF69B4]">
            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FFB6C1] rounded-full"></div>
            <div className="absolute left-2/3 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FFB6C1] rounded-full"></div>
          </div>

          {steps.map((step, index) => (
            <div key={step.title} className="text-center relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-[#FF69B4] to-[#FFB6C1] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                <step.icon size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mb-3">{step.title}</h3>
              <p className="text-[#666666] dark:text-[#B0B0B0] leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
