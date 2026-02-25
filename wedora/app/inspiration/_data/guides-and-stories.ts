export type GuideTag = "Trending" | "Guide" | "Tips"

export type GuideArticle = {
  id: string
  tag: GuideTag
  category: string
  title: string
  description: string
  readTime: number
  image: string
}

export type RealWeddingStory = {
  id: string
  tag: string
  couple: string
  location: string
  date: string
  guests: number
  description: string
  image: string
}

export const FEATURED_GUIDE: GuideArticle = {
  id: "earthy-minimalism-terracotta-neutrals",
  tag: "Trending",
  category: "Color Trends",
  title: "Earthy Minimalism: The Rise of Terracotta & Neutrals",
  description:
    "Couples in 2025 are embracing warm earth tones with terracotta, sand, and sage. Paired with dried palms and clean geometric shapes, this trend brings a modern yet organic feel.",
  readTime: 5,
  image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
}

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    id: "sustainable-celebrations-eco-guide",
    tag: "Guide",
    category: "Sustainability",
    title: "Sustainable Celebrations: Eco-Friendly Wedding Guide",
    description:
      "From living plant centerpieces to biodegradable confetti and locally sourced menus, discover how to plan a day that’s kind to the planet.",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
  },
  {
    id: "micro-weddings-smaller-grand",
    tag: "Tips",
    category: "Planning Tips",
    title: "Micro Weddings: Why Smaller is the New Grand",
    description:
      "Intimate gatherings of 30 or fewer guests are redefining what it means to celebrate. Learn how micro weddings create deeper connections.",
    readTime: 4,
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600",
  },
  {
    id: "bold-jewel-tone-palettes-2025",
    tag: "Trending",
    category: "Color Trends",
    title: "Bold & Vibrant: Jewel-Tone Palettes for 2025",
    description:
      "Deep burgundy, emerald green, and rich gold are making a dramatic comeback. Explore how to bring jewel tones to your day.",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600",
  },
]

export const REAL_WEDDING_STORIES: RealWeddingStory[] = [
  {
    id: "sarah-michael-napa-valley",
    tag: "Garden",
    couple: "Sarah & Michael",
    location: "Napa Valley, California",
    date: "June 2025",
    guests: 120,
    description:
      "A golden-hour garden celebration surrounded by rolling vineyards and lush greenery, blending rustic charm with elegant simplicity.",
    image: "https://images.unsplash.com/photo-1606800052302-4a5b3ad426a0?w=600",
  },
  {
    id: "emily-james-tuscany",
    tag: "Vineyard",
    couple: "Emily & James",
    location: "Tuscany, Italy",
    date: "September 2025",
    guests: 85,
    description:
      "An intimate vineyard ceremony under the warm Italian sun, with locally sourced flowers and a farm-to-table feast.",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600",
  },
]

