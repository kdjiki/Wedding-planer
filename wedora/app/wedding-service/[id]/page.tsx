import { notFound } from "next/navigation"
import Image from "next/image"
import { Heart, MapPin } from "lucide-react"

import { db } from "@/db"
import { serviceListings, serviceTags, bookings } from "@/db/schema"
import { eq } from "drizzle-orm"

import { BackButton } from "@app/_components/back-button"

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Fetch service details
  const service = await db.query.serviceListings.findFirst({
    where: eq(serviceListings.id, id),
  })

  if (!service) {
    notFound()
  }

  // Fetch additional data
  const tags = await db
    .select()
    .from(serviceTags)
    .where(eq(serviceTags.listingId, id))

  const bookedDates = await db
    .select()
    .from(bookings)
    .where(eq(bookings.serviceId, id))

  return (
    <div className="pt-16">
      <section className="bg-white dark:bg-[#1E1E1E] border-b border-[#E0E0E0] dark:border-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <BackButton />

          {/* IMAGE */}
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
            <Image
              src={service.image}
              alt={service.name}
              fill
              className="object-cover"
            />
          </div>

          {/* TITLE */}
          <h1 className="text-3xl font-bold mb-2 dark:text-white">
            {service.name}
          </h1>

          {/* META INFO */}
          <div className="flex gap-8 text-sm font-semibold text-[#1A1A1A] dark:text-white mb-4">
            <div className="flex items-center gap-2">
              <Heart size={20} className="fill-[#FF69B4] text-[#FF69B4]" />
              <span>{service.rating}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={20} />
              <span>{service.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#666666] dark:text-[#B0B0B0]">
                Starting at
              </span>
              <p className="text-base font-bold">{service.priceRange}</p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="text-lg text-[#666666] dark:text-[#B0B0B0] mb-6">
            {service.description}
          </p>

          {/* TAGS */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((t) => (
                <span
                  key={t.id}
                  className="px-3 py-1 bg-[#FF69B4]/10 text-[#FF1493] text-sm rounded-full"
                >
                  {t.tag}
                </span>
              ))}
            </div>
          )}

          {/* BOOKED DATES */}
          {bookedDates.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 dark:text-white">
                Unavailable Dates
              </h3>
              <ul className="text-sm text-[#666666] dark:text-[#B0B0B0]">
                {bookedDates.map((b) => (
                  <li key={b.id}>
                    {new Date(b.bookedDate).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}