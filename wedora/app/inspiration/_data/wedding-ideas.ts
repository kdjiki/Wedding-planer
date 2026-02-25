export type IdeaCategory =
  | "All"
  | "Wedding Themes"
  | "Bridal Style"
  | "Cakes & Desserts"
  | "Lighting"
  | "Floral Arrangements"
  | "Invitations"
  | "Outdoor Weddings"
  | "Decorations"
  | "Table Settings";

export type WeddingIdea = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
};

export const IDEA_CATEGORIES: IdeaCategory[] = [
  "All",
  "Wedding Themes",
  "Bridal Style",
  "Cakes & Desserts",
  "Lighting",
  "Floral Arrangements",
  "Invitations",
  "Outdoor Weddings",
  "Decorations",
  "Table Settings",
];

export const WEDDING_IDEAS: WeddingIdea[] = [
  {
    id: "minimalist-white-green",
    title: "Minimalist White & Green",
    description:
      "Clean lines with white florals and lush greenery for an elegant, modern aesthetic.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600",
    category: "Decorations",
  },
  {
    id: "romantic-blush-rose",
    title: "Romantic Blush & Rose",
    description:
      "Soft pink tones with roses and candlelight for a dreamy, romantic atmosphere.",
    image: "https://images.unsplash.com/photo-1606800052302-4a5b3ad426a0?w=600",
    category: "Floral Arrangements",
  },
  {
    id: "bohemian-sunset",
    title: "Bohemian Sunset Theme",
    description:
      "Warm terracotta, dried palms, and vintage elements for a free-spirited celebration.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
    category: "Wedding Themes",
  },
  {
    id: "garden-ceremony",
    title: "Garden Ceremony Décor",
    description:
      "Outdoor garden setting with arches, flowering vines, and natural seating.",
    image: "https://images.unsplash.com/photo-1594552072238-f6492c39e1e2?w=600",
    category: "Outdoor Weddings",
  },
  {
    id: "modern-geometric",
    title: "Modern Geometric Patterns",
    description:
      "Contemporary geometric designs with bold colors and clean shapes.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600",
    category: "Wedding Themes",
  },
  {
    id: "coastal-blue-white",
    title: "Coastal Blue & White",
    description:
      "Fresh coastal vibes with navy, white, and nautical accents perfect for beach weddings.",
    image: "https://images.unsplash.com/photo-1493514789556-586cb221d7a7?w=600",
    category: "Table Settings",
  },
  {
    id: "luxury-gold-black",
    title: "Luxury Gold & Black",
    description:
      "Elegant and sophisticated with gold accents, black elegance, and crystal details.",
    image: "https://images.unsplash.com/photo-1547480609-7b46ccc2737f?w=600",
    category: "Decorations",
  },
  {
    id: "vintage-garden-party",
    title: "Vintage Garden Party",
    description:
      "Antique details with vintage furniture, string lights, and heirloom touches.",
    image: "https://images.unsplash.com/photo-1519635613933-3b86b8f8f88b?w=600",
    category: "Wedding Themes",
  },
  {
    id: "sunset-beachfront",
    title: "Sunset Beachfront Wedding",
    description:
      "Real wedding featuring a stunning sunset ceremony on pristine sandy shores.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
    category: "Outdoor Weddings",
  },
  {
    id: "countryside-rustic",
    title: "Countryside Rustic",
    description:
      "Charming rustic setting with hay bales, wooden benches, and natural barn backdrop.",
    image: "https://images.unsplash.com/photo-1519514645848-2582c0c09d92?w=600",
    category: "Outdoor Weddings",
  },
  {
    id: "tropical-vibrant",
    title: "Tropical Vibrant",
    description:
      "Bright tropical colors with hibiscus flowers, palm leaves, and exotic fruits.",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600",
    category: "Floral Arrangements",
  },
  {
    id: "elegant-ballroom",
    title: "Elegant Ballroom",
    description:
      "Crystal chandeliers, marble floors, and formal arrangements for classic elegance.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
    category: "Decorations",
  },
];
