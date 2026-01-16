import { HeroSection } from "./_components/hero-section"
import { ServicesSection } from "./_components/services-section"
import { HowItWorksSection } from "./_components/how-it-works-section"
import { FeaturedVendorsSection } from "./_components/featured-vendors-section"
import { FeaturesSection } from "./_components/features-section"
import { TestimonialsSection } from "./_components/testimonials-section"
import { CtaSection } from "./_components/cta-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <div className="hidden md:block">
        <HowItWorksSection />
      </div>
      <FeaturedVendorsSection />
      <div className="hidden md:block">
        <FeaturesSection />
      </div>
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
