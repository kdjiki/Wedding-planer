import { db } from "./index"
import { serviceListings, serviceTags, bookings, weddingIdeas } from "./schema"
import { WEDDING_IDEAS } from "@/app/inspiration/_data/wedding-ideas"

const BASE_URL =
  "https://sxutxqfwyxzlgsnvonvr.supabase.co/storage/v1/object/public/services"

async function seed() {
  try {
    console.log("🌱 Seeding database...")

    // 1️⃣ Insert service listings
    const insertedListings = await db
      .insert(serviceListings)
      .values([
        {
          name: "Rose Garden Estate",
          image: `${BASE_URL}/venue-garden.jpg`,
          category: "Wedding Halls",
          rating: 4.9,
          location: "Split",
          priceRange: "$3,500",
          description:
            "A stunning outdoor garden venue surrounded by rose bushes and ancient oak trees.",
        },
        {
          name: "Grand Ballroom Venue",
          image: `${BASE_URL}/venue-ballroom.jpg`,
          category: "Wedding Halls",
          rating: 4.0,
          location: "Zagreb",
          priceRange: "$6,000",
          description:
            "An opulent ballroom with crystal chandeliers and marble floors.",
        },
        {
          name: "Elegant Events Photography",
          image: `${BASE_URL}/photographer-portrait.jpg`,
          category: "Photography",
          rating: 4.9,
          location: "Split",
          priceRange: "$2,500",
          description:
            "Award-winning wedding photography that captures every emotion.",
        },
        {
          name: "Gourmet Catering Co.",
          image: `${BASE_URL}/catering-elegant.jpg`,
          category: "Catering",
          rating: 4.7,
          location: "Sarajevo",
          priceRange: "$75/person",
          description:
            "Exquisite multi-course menus crafted by Michelin-trained chefs.",
        },
        {
          name: "Harmony Wedding Band",
          image: `${BASE_URL}/band-live.jpg`,
          category: "Music",
          rating: 4.8,
          location: "Zadar",
          priceRange: "$3,200",
          description:
            "A 7-piece live band specializing in wedding receptions.",
        },
        {
          name: "Bloom & Petal Designs",
          image: `${BASE_URL}/decoration-floral.jpg`,
          category: "Other",
          rating: 4.9,
          location: "Banja Luka",
          priceRange: "$1,800",
          description:
            "Bespoke floral arrangements and venue styling.",
        },
        {
          name: "Dream Day Planners",
          image: `${BASE_URL}/planner-working.jpg`,
          category: "Other",
          rating: 5.0,
          location: "Split",
          priceRange: "$4,500",
          description:
            "Full-service wedding planning from start to finish.",
        },
        {
          name: "Coastal Bliss Weddings",
          image: `${BASE_URL}/venue-beach.jpg`,
          category: "Wedding Halls",
          rating: 4.7,
          location: "Split",
          priceRange: "$4,200",
          description:
            "Beachfront ceremonies with stunning sunset views.",
        },
        {
          name: "True Moments Photography",
          image: `${BASE_URL}/photographer-candid.jpg`,
          category: "Photography",
          rating: 4.6,
          location: "Split",
          priceRange: "$2,000",
          description:
            "Natural, candid wedding photography.",
        },
        {
          name: "Feast & Fête Catering",
          image: `${BASE_URL}/catering-buffet.jpg`,
          category: "Catering",
          rating: 4.5,
          location: "Zagreb",
          priceRange: "$60/person",
          description:
            "Delicious buffet-style catering with a variety of cuisines.",
        },
      ])
      .returning({ id: serviceListings.id })
      .onConflictDoNothing()

    // 2️⃣ Insert tags
    const tagsMap = [
      ["Outdoor", "Garden", "Up to 300 guests"],
      ["Indoor", "Luxury", "Up to 500 guests"],
      ["Candid", "Editorial", "Drone shots"],
      ["Fine Dining", "Custom Menus", "Allergies-friendly"],
      ["Live Band", "DJ option", "Ceremony music"],
      ["Floral Design", "Venue Styling", "Custom themes"],
      ["Full Service", "Day-of Coordination", "Budget-friendly"],
      ["Beach", "Outdoor", "Up to 200 guests"],
      ["Candid", "Photojournalistic", "Same-day edits"],
      ["Buffet", "Variety of Cuisines", "Budget-friendly"],
    ]

    for (let i = 0; i < insertedListings.length; i++) {
      for (const tag of tagsMap[i]) {
        await db.insert(serviceTags).values({
          listingId: insertedListings[i].id,
          tag,
        }).onConflictDoNothing()
      }
    }

    // 3️⃣ Insert bookings
    const datesMap = [
      ["2026-09-15", "2026-10-20"],
      ["2026-11-05", "2026-12-15"],
      ["2026-08-10", "2026-09-25"],
      ["2026-07-15", "2026-08-30"],
      ["2026-10-01", "2026-11-15"],
      ["2026-09-20", "2026-10-30"],
      ["2026-08-01", "2026-09-15"],
      ["2026-07-20", "2026-08-25"],
      ["2026-09-10", "2026-10-20"],
      ["2026-08-15", "2026-09-30"],
    ]

    for (let i = 0; i < insertedListings.length; i++) {
      for (const date of datesMap[i]) {
        await db.insert(bookings).values({
          serviceId: insertedListings[i].id,
          bookedDate: new Date(date),
        }).onConflictDoNothing()
      }
    }

    // 4️⃣ Insert wedding ideas (SADA JE UNUTAR seed())
    await db
      .insert(weddingIdeas)
      .values(
        WEDDING_IDEAS.map((idea) => ({
          id: idea.id,
          title: idea.title,
          description: idea.description,
          image: idea.image,
          category: idea.category,
        }))
      )
      .onConflictDoNothing()

    console.log("✅ Database seeded successfully!")
    process.exit(0)

  } catch (err) {
    console.error("❌ Seeding failed:", err)
    process.exit(1)
  }
}

seed()