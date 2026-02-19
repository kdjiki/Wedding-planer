export interface Page {
  title: string
  path: string
}

export const weddingServicePages: Page[] = [
  { title: "All Services", path: "/services" },
  { title: "Venues", path: "/services/venues" },
  { title: "Photography", path: "/services/photography" },
  { title: "Catering", path: "/services/catering" },
  { title: "Music & Entertainment", path: "/services/entertainment" },
  { title: "Decorations", path: "/services/decorations" },
  { title: "Wedding Planning", path: "/services/planning" },
]
