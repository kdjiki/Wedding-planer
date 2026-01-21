"use client"

import { VendorCard } from "./vendor-card"

export function FeaturedVendorsSection() {
  const vendors = [
    {
      image: "/wedding-rings-on-elegant-surface.jpg",
      name: "Elegant Events Photography",
      category: "Photography",
      rating: 4.9,
      reviewCount: 127,
      startingPrice: "$1,500",
      isNew: false,
    },
    {
      image: "/grand-ballroom-wedding-venue-with-chandeliers.jpg",
      name: "Grand Ballroom Venue",
      category: "Venues",
      rating: 5.0,
      reviewCount: 89,
      startingPrice: "$3,000",
      isNew: true,
    },
    {
      image: "/gourmet-wedding-catering-buffet-display.jpg",
      name: "Gourmet Catering Co.",
      category: "Catering",
      rating: 4.8,
      reviewCount: 156,
      startingPrice: "$75/guest",
      isNew: false,
    },
    {
      image: "/live-band-performing-at-wedding-reception.jpg",
      name: "Harmony Wedding Band",
      category: "Entertainment",
      rating: 4.9,
      reviewCount: 94,
      startingPrice: "$2,200",
      isNew: true,
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F5F5] dark:bg-[#1E1E1E]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] dark:text-white mb-3">
            Top-Rated Service Providers
          </h2>
          <p className="text-lg text-[#666666] dark:text-[#B0B0B0]">Trusted by couples everywhere</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.name} {...vendor} />
          ))}
        </div>

        <div className="text-center">
          <a href="/wedding-service">
            <button className="px-8 py-3 bg-[#FF69B4] text-white rounded-lg hover:bg-[#FF1493] transition-colors font-medium cursor-pointer">
                View All Vendors
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}
