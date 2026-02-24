import { db } from "@/db"
import {serviceListings, serviceTags, bookings} from "@/db/schema"
import { Suspense } from "react"

import WeddingServicesContent from "./wedding-services-content"

export default async function WeddingServicesPage() {
  // Fetch all services from the database
  const services = await db.select().from(serviceListings)

  // Fetch all tags
  const tags = await db.select().from(serviceTags)

  // Fetch all bookings to determine availability
  const allBookings = await db.select().from(bookings)

  // Map database records to the ServiceListing format expected by the frontend
  const listings = services.map((service) => ({
    id: service.id,
    image: service.image,
    name: service.name,
    category: service.category,
    rating: service.rating,
    location: service.location,
    priceRange: service.priceRange,
    description: service.description,
    tags: tags
      .filter((t) => t.listingId === service.id)
      .map((t) => t.tag),
    dateBooked: allBookings
      .filter((b) => b.serviceId === service.id)
      .map((b) => new Date(b.bookedDate)),
  }))

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WeddingServicesContent initialListings={listings} />
    </Suspense>
  )
}