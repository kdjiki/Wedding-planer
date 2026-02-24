import { Suspense } from "react"
import { eq, and, desc } from "drizzle-orm"

import { db } from "@/db"
import { serviceListings, serviceTags, bookings } from "@/db/schema"
import { CategoryPage } from "../_components/category-page"

export default async function CateringPage(props: {
  searchParams: Promise<{ location?: string; date?: string }>
}) {
  const searchParams = await props.searchParams
  const location = searchParams.location
  const date = searchParams.date
  
  // fetch all catering services with their bookings
  const services = await db.query.serviceListings.findMany({
    where: eq(serviceListings.category, "Catering"),
    with: {
      bookings: true,
    },
  })

  // filter services by location if provided
  let filtered = services

  if (location) {
    filtered = filtered.filter(
      (s) => s.location.toLowerCase() === location.toLowerCase()
    )
  }

  //filter services by availability on the selected date
  if (date) {
    const selectedDate = new Date(date)

    filtered = filtered.filter((s) => {
      return !s.bookings.some((b) => {
        const d = new Date(b.bookedDate)
        return (
          d.getFullYear() === selectedDate.getFullYear() &&
          d.getMonth() === selectedDate.getMonth() &&
          d.getDate() === selectedDate.getDate()
        )
      })
    })
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPage initialListings={filtered} serviceId="catering" />
    </Suspense>
  )
}