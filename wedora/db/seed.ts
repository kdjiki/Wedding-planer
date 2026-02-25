import { db } from "./index"
import {
  serviceListings,
  serviceTags,
  bookings,
  weddingIdeas,
  guideArticles,
  realWeddingStories,
} from "./schema"
import { WEDDING_IDEAS } from "@/app/inspiration/_data/wedding-ideas"
import {
  FEATURED_GUIDE,
  GUIDE_ARTICLES,
  REAL_WEDDING_STORIES,
} from "@/app/inspiration/_data/guides-and-stories"

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
          description: "A stunning outdoor garden venue surrounded by rose bushes and ancient oak trees. Perfect for intimate and grand weddings alike.",
        },
        {
          name: "Grand Ballroom Venue",
          image: `${BASE_URL}/venue-ballroom.jpg`,
          category: "Wedding Halls",
          rating: 4.0,
          location: "Zagreb",
          priceRange: "$6,000",
          description: "An opulent ballroom with crystal chandeliers, marble floors, and world-class staff to make your celebration unforgettable.",
        },
        {
          name: "Elegant Events Photography",
          image: `${BASE_URL}/photographer-portrait.jpg`,
          category: "Photography",
          rating: 4.9,
          location: "Split",
          priceRange: "$2,500",
          description: "Award-winning wedding photography that captures every emotion. Candid and editorial styles with a quick turnaround time.",
        },
        {
          name: "Gourmet Catering Co.",
          image: `${BASE_URL}/catering-elegant.jpg`,
          category: "Catering",
          rating: 4.7,
          location: "Sarajevo",
          priceRange: "$75/person",
          description: "Exquisite multi-course menus crafted by our Michelin-trained chefs. From hors d'oeuvres to custom wedding cakes.",
        },
        {
          name: "Harmony Wedding Band",
          image: `${BASE_URL}/band-live.jpg`,
          category: "Music",
          rating: 4.8,
          location: "Zadar",
          priceRange: "$3,200",
          description: "A 7-piece live band specializing in wedding receptions. From jazz cocktail hours to dance floor hits that keep guests moving.",
        },
        {
          name: "Bloom & Petal Designs",
          image: `${BASE_URL}/decoration-floral.jpg`,
          category: "Other",
          rating: 4.9,
          location: "Banja Luka",
          priceRange: "$1,800",
          description: "Bespoke floral arrangements and venue styling. From romantic centerpieces to breathtaking ceremony arches.",
        },
        {
          name: "Dream Day Planners",
          image: `${BASE_URL}/planner-working.jpg`,
          category: "Other",
          rating: 5.0,
          location: "Split",
          priceRange: "$4,500",
          description: "Full-service wedding planning from start to finish. We handle every detail so you can enjoy the journey to your big day.",
        },
        {
          name: "Coastal Bliss Weddings",
          image: `${BASE_URL}/venue-beach.jpg`,
          category: "Wedding Halls",
          rating: 4.7,
          location: "Split",
          priceRange: "$4,200",
          description: "Say your vows with the ocean as your backdrop. Beachfront ceremonies and tented receptions with stunning sunset views.",
        },
        {
          name: "True Moments Photography",
          image: `${BASE_URL}/photographer-candid.jpg`,
          category: "Photography",
          rating: 4.6,
          location: "Split",
          priceRange: "$2,000",
          description: "Natural, candid wedding photography that tells your love story. We blend into the background to capture genuine moments.",
        },
        {
          name: "Feast & Fête Catering",
          image: `${BASE_URL}/catering-buffet.jpg`,
          category: "Catering",
          rating: 4.5,
          location: "Zagreb",
          priceRange: "$60/person",
          description: "Delicious buffet-style catering with a variety of cuisines. Perfect for casual and semi-formal weddings.",
        },
      ])
      .onConflictDoNothing()
      .returning({ id: serviceListings.id })

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
      const listingId = insertedListings[i].id
      const tags = tagsMap[i]

      for (const tag of tags) {
        await db.insert(serviceTags).values({
          listingId,
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

    // 4️⃣ Insert wedding ideas
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

    // 5️⃣ Insert guide articles (featured + regular)
    await db
      .insert(guideArticles)
      .values(
        [FEATURED_GUIDE, ...GUIDE_ARTICLES].map((article) => ({
          id: article.id,
          tag: article.tag,
          category: article.category,
          title: article.title,
          description: article.description,
          readTime: article.readTime,
          image: article.image,
        }))
      )
      .onConflictDoNothing()

    // 6️⃣ Insert real wedding stories
    await db
      .insert(realWeddingStories)
      .values(
        REAL_WEDDING_STORIES.map((story) => ({
          id: story.id,
          tag: story.tag,
          couple: story.couple,
          location: story.location,
          date: story.id === "sarah-michael-napa-valley"
              ? new Date("2025-06-01")
              : new Date("2025-09-01"),
          guests: story.guests,
          description: story.description,
          image: story.image,
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