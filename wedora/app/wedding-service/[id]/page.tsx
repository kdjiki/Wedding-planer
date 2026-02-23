import { notFound } from "next/navigation"
import Image from "next/image"
import { Heart, MapPin } from "lucide-react"

import { allListings } from "@app/_data/listings"
import { BackButton } from "@app/_components/back-button"

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const service = allListings.find((l) => l.id === id)

  if (!service) {
    notFound()
  }

  return (
    <div className="pt-16">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <BackButton />
        
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover"
          />
        </div>

        <h1 className="text-3xl font-bold mb-2">
          {service.name}
        </h1>

        <div className="flex gap-4 text-sm font-size-20 font-semibold text-[#1A1A1A] dark:text-white mb-4 gap-8">
            <div className="flex items-center gap-2 shrink-0">
                <Heart size={20} className="fill-[#FF69B4] text-[#FF69B4]" />
                <span className="text-sm  text-[#1A1A1A] dark:text-white">{service.rating}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <MapPin size={20} className=" shrink-0" />
                <span className="text-sm truncate">{service.location}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0"> 
                <span className="text-xs text-[#666666] dark:text-[#B0B0B0]">Starting at</span>
                <p className="text-base font-bold ">{service.priceRange}</p>
            </div>
        </div>

        <p className="text-lg text-[#666666] dark:text-[#B0B0B0]">
          {service.description}
        </p>
      </div>
    </div>
  )
}