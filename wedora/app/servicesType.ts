import { LucideIcon } from "lucide-react";
import { Building2, Camera, UtensilsCrossed, Music, Sparkles } from "lucide-react"


export interface ServiceType {
  icon: LucideIcon
  title: string
  category: string          // must match the category field in listings.ts
  description: string
  href: string
}

export const services = [
    {
      icon: Building2,
      title: "Wedding Halls",
      id: "wedding-halls",
      description: "Find your perfect location",
      category: "Wedding Halls",
      href: "/wedding-service/wedding-halls",
    },
    {
      icon: Camera,
      title: "Photographers",
      id: "photographers",
      description: "Capture every precious moment",
      category: "Photography",
      href: "/wedding-service/photographers",
    },
    {
      icon: UtensilsCrossed,
      title: "Catering",
      id: "catering",
      description: "Delight your guests",
      category: "Catering",
      href: "/wedding-service/catering",
    },
    {
      icon: Music,
      title: "Music & Entertainment",
      id: "music-entertainment",
      description: "Set the perfect mood",
      category: "Music",
      href: "/wedding-service/music-entertainment",
    },
    {
      icon: Sparkles,
      title: "Other Services",
      id: "other-services",
      description: "Everything else you need for your big day",
      category: "Other",
      href: "/wedding-service/other-services",
    },
  ]

  export function getServiceType(id: string): ServiceType {
  const found = services.find((s) => s.id === id)
  if (!found) throw new Error(`Unknown service type: ${id}`)
  return found
}

export const location = [
    { id: "zagreb", name: "Zagreb" },
    { id: "split", name: "Split" },
    { id: "rijeka", name: "Rijeka" },
    { id: "mostar", name: "Mostar" },
    { id: "sarajevo", name: "Sarajevo" },
    { id: "banja-luka", name: "Banja Luka" },
    { id: "dubrovnik", name: "Dubrovnik" },
    { id: "zadar", name: "Zadar" },
  ]
