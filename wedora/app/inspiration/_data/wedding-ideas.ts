export const IDEA_CATEGORIES = [
  "All",
  "Decorations",
  "Table Settings",
  "Wedding Themes",
  "Outdoor Weddings",
  "Bridal Style",
  "Lighting",
  "Floral Arrangements",
  "Cakes & Desserts",
  "Invitations",
] as const

export type IdeaCategory = (typeof IDEA_CATEGORIES)[number]

export type WeddingIdea = {
  id: string
  title: string
  description: string
  image: string
  category: string
}

export const WEDDING_IDEAS: WeddingIdea[] = [
  {
    id: "classic-peony-bouquet",
    title: "Classic Peony Bridal Bouquet",
    description: "White peonies and blush roses with trailing eucalyptus for a timeless look.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600",
    category: "Floral Arrangements",
  },
  {
    id: "rustic-aisle-decorations",
    title: "Rustic Aisle Decorations",
    description: "Lanterns, rose petals, and lavender along a charming garden aisle.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
    category: "Decorations",
  },
  {
    id: "outdoor-ceremony-arch",
    title: "Outdoor Ceremony Arch",
    description: "Lush floral arch with white blooms and greenery for an outdoor ceremony.",
    image: "https://images.unsplash.com/photo-1606800052302-4a5b3ad426a0?w=600",
    category: "Outdoor Weddings",
  },
  {
    id: "elegant-wedding-cake",
    title: "Elegant Tiered Wedding Cake",
    description: "White cake with gold leaf accents and sugar pearl details.",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600",
    category: "Cakes & Desserts",
  },
  {
    id: "bridal-lace-dress",
    title: "Romantic Lace Bridal Gown",
    description: "Delicate lace and soft tulle for a dreamy bridal look.",
    image: "https://images.unsplash.com/photo-1594552072238-f6492c39e1e2?w=600",
    category: "Bridal Style",
  },
  {
    id: "table-settings-greenery",
    title: "Greenery Table Centerpieces",
    description: "Eucalyptus runners and candlelight for a fresh, romantic tablescape.",
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600",
    category: "Table Settings",
  },
  {
    id: "fairy-lights-reception",
    title: "Fairy Light Reception",
    description: "String lights and candles for a magical evening atmosphere.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600",
    category: "Lighting",
  },
  {
    id: "bohemian-wedding-theme",
    title: "Bohemian Wedding Theme",
    description: "Natural textures, macramé, and dried flowers for a boho vibe.",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600",
    category: "Wedding Themes",
  },
  {
    id: "lavender-bridal-bouquet",
    title: "Lavender & Wildflower Bouquet",
    description: "Soft purple lavender with wildflowers for a rustic, romantic feel.",
    image: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=600",
    category: "Floral Arrangements",
  },
  {
    id: "minimal-invitation",
    title: "Minimalist Wedding Invitation",
    description: "Clean typography and soft neutrals for a modern invitation suite.",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600",
    category: "Invitations",
  },
]
