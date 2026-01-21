import { TestimonialCard } from "./testimonial-card"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Wedora made planning our wedding so much easier! We found our venue, photographer, and caterer all in one place. The availability feature saved us countless hours.",
      name: "Sarah & Michael",
      weddingDate: "June 2024",
      image: "/avatar-1.png",
      rating: 5,
    },
    {
      quote:
        "The best decision we made was using Wedora. We were able to compare vendors side-by-side, read real reviews, and book everything with confidence. Highly recommend!",
      name: "Emily & James",
      weddingDate: "August 2024",
      image: "/smiling-diverse-couple.png",
      rating: 5,
    },
    {
      quote:
        "We absolutely loved the messaging feature on Wedora. Being able to chat directly with vendors made the planning process personal and stress-free. A game changer!",
      name: "Maria & David",
      weddingDate: "October 2024",
      image: "/elegant-bride-smiling.jpg",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F5F5] dark:bg-[#1E1E1E]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] dark:text-white mb-3">
            Loved by Couples Everywhere
          </h2>
          <p className="text-lg text-[#666666] dark:text-[#B0B0B0]">Real stories from real weddings</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
