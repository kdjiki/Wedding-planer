import { db } from "@/db"
import { serviceListings } from "@/db/schema"
import { desc, inArray } from "drizzle-orm"
import { ServiceListingCard } from "./service-listing-card"

export async function FeaturedVendorsSection() {
  // Dohvati 4 najbolje ocijenjena iz određenih kategorija
  const vendors = await db
    .select()
    .from(serviceListings)
    .orderBy(desc(serviceListings.rating))
    .limit(4)

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
              <ServiceListingCard key={vendor.id} listing={vendor} />
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
