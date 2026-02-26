import { db } from "@/db"
import { serviceListings } from "@/db/schema"
import { desc } from "drizzle-orm"
import {FeaturedVendorsSectionClient} from "./featured-vendors-section-client"

export async function FeaturedVendorsSection() {
  // fetch top-rated vendore from base (limit 4)
  const vendors = await db
    .select()
    .from(serviceListings)
    .orderBy(desc(serviceListings.rating))
    .limit(4)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F5F5] dark:bg-[#1E1E1E]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] dark:text-white mb-3">
            Top-Rated Service Providers
          </h2>
          <p className="text-lg text-[#666666] dark:text-[#B0B0B0]">Trusted by couples everywhere</p>
        </div>
        <FeaturedVendorsSectionClient initialVendors={vendors} />
      </div>
    </section>
  )
}
