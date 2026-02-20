
export interface ServiceListing {
  id: string
  image: string
  name: string
  category: string
  rating: number
  location: string
  priceRange: string
  description: string
  isFavorited?: boolean
  dateBooked?: Date[]
  tags?: string[]
}


export const allListings: ServiceListing[] = [
  {
    id: "1",
    image: "/services/venue-garden.jpg",
    name: "Rose Garden Estate",
    category: "Wedding Halls",
    rating: 4.9,
    location: "Split",
    priceRange: "$3,500",
    description: "A stunning outdoor garden venue surrounded by rose bushes and ancient oak trees. Perfect for intimate and grand weddings alike.",
    isFavorited: false,
    dateBooked: [ new Date("2026-09-15"), new Date("2026-10-20") ],
    tags: ["Outdoor", "Garden", "Up to 300 guests"],
  },
  {
    id: "2",
    image: "/services/venue-ballroom.jpg",
    name: "Grand Ballroom Venue",
    category: "Wedding Halls",
    rating: 4.0,
    location: "Zagreb",
    priceRange: "$6,000",
    description: "An opulent ballroom with crystal chandeliers, marble floors, and world-class staff to make your celebration unforgettable.",
    isFavorited: true,
    dateBooked: [ new Date("2026-11-05"), new Date("2026-12-15") ],
    tags: ["Indoor", "Luxury", "Up to 500 guests"],
  },
  {
    id: "3",
    image: "/services/photographer-portrait.jpg",
    name: "Elegant Events Photography",
    category: "Photography",
    rating: 4.9,
    location: "Split",
    priceRange: "$2,500",
    description: "Award-winning wedding photography that captures every emotion. Candid and editorial styles with a quick turnaround time.",
    isFavorited: false,
    dateBooked: [ new Date("2026-08-10"), new Date("2026-09-25") ],
    tags: ["Candid", "Editorial", "Drone shots"],
  },
  {
    id: "4",
    image: "/services/catering-elegant.jpg",
    name: "Gourmet Catering Co.",
    category: "Catering",
    rating: 4.7,
    location: "Sarajevo",
    priceRange: "$75/person",
    description: "Exquisite multi-course menus crafted by our Michelin-trained chefs. From hors d'oeuvres to custom wedding cakes.",
    isFavorited: false,
    dateBooked: [ new Date("2026-07-15"), new Date("2026-08-30") ],
    tags: ["Fine Dining", "Custom Menus", "Allergies-friendly"],
  },
  {
    id: "5",
    image: "/services/band-live.jpg",
    name: "Harmony Wedding Band",
    category: "Music",
    rating: 4.8,
    location: "Zadar",
    priceRange: "$3,200",
    description: "A 7-piece live band specializing in wedding receptions. From jazz cocktail hours to dance floor hits that keep guests moving.",
    isFavorited: false,
    dateBooked: [ new Date("2026-10-01"), new Date("2026-11-15") ],
    tags: ["Live Band", "DJ option", "Ceremony music"],
  },
  {
    id: "6",
    image: "/services/decoration-floral.jpg",
    name: "Bloom & Petal Designs",
    category: "Other",
    rating: 4.9,
    location: "Banja Luka",
    priceRange: "$1,800",
    description: "Bespoke floral arrangements and venue styling. From romantic centerpieces to breathtaking ceremony arches.",
    isFavorited: true,
    dateBooked: [ new Date("2026-09-20"), new Date("2026-10-30") ],
    tags: ["Floral Design", "Venue Styling", "Custom themes"],
  },
  {
    id: "7",
    image: "/services/planner-working.jpg",
    name: "Dream Day Planners",
    category: "Other",
    rating: 5.0,
    location: "Split",
    priceRange: "$4,500",
    description: "Full-service wedding planning from start to finish. We handle every detail so you can enjoy the journey to your big day.",
    isFavorited: false,
    dateBooked: [ new Date("2026-08-01"), new Date("2026-09-15") ],
    tags: ["Full Service", "Day-of Coordination", "Budget-friendly"],
  },
  {
    id: "8",
    image: "/services/venue-beach.jpg",
    name: "Coastal Bliss Weddings",
    category: "Wedding Halls",
    rating: 4.7,
    location: "Split",
    priceRange: "$4,200",
    description: "Say your vows with the ocean as your backdrop. Beachfront ceremonies and tented receptions with stunning sunset views.",
    isFavorited: false,
    dateBooked: [ new Date("2026-07-20"), new Date("2026-08-25") ],
    tags: ["Beach", "Outdoor", "Up to 200 guests"],
  },
  {
    id: "9",
    image: "/services/photographer-candid.jpg",
    name: "True Moments Photography",
    category: "Photography",
    rating: 4.6,
    location: "Split",
    priceRange: "$2,000",
    description: "Natural, candid wedding photography that tells your love story. We blend into the background to capture genuine moments.",
    isFavorited: false,
    dateBooked: [ new Date("2026-09-10"), new Date("2026-10-20") ],
    tags: ["Candid", "Photojournalistic", "Same-day edits"],
  },
  {
    id: "10",
    image: "/services/catering-buffet.jpg",
    name: "Feast & Fête Catering",
    category: "Catering",
    rating: 4.5,
    location: "Zagreb",
    priceRange: "$60/person",
    description: "Delicious buffet-style catering with a variety of cuisines. Perfect for casual and semi-formal weddings.",
    isFavorited: false,
    dateBooked: [ new Date("2026-08-15"), new Date("2026-09-30") ],
    tags: ["Buffet", "Variety of Cuisines", "Budget-friendly"],
  }
]
