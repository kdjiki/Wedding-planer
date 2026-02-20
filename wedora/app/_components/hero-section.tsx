"use client"

import { MapPin } from "lucide-react"
import {Select, SelectSection, SelectItem} from "@heroui/select";
import Image from "next/image"
import { useMemo, useState } from "react"
import { Selection } from "@react-types/shared"
import { useRouter } from "next/navigation"

import {services, location} from "../servicesType"
import { DatePicker } from "./date-picker";  

export function HeroSection() {
  const [selectedService, setSelectedService] = useState<Selection>(new Set([]));
  const [selectedLocation, setSelectedLocation] = useState<Selection>(new Set([]));
  const [weddingDate, setWeddingDate] = useState<Date | null>(null);

  const selectedValue = useMemo(() => {
    const key = Array.from(selectedService)[0];
    const service = services.find(s => s.id === key);
    return service?.title;
  }, [selectedService]);

  const selectedLocationValue = useMemo(() => {
    const key = Array.from(selectedLocation)[0];
    const loc = location.find(l => l.id === key);
    return loc?.name;
  }, [selectedLocation]);

  const activeFiltersCount =
  (Array.from(selectedService).length > 0 ? 1 : 0) +
  (Array.from(selectedLocation).length > 0 ? 1 : 0) +
  (weddingDate ? 1 : 0);

  const hasFilters = activeFiltersCount > 0;

  const router = useRouter();

  const handleSearch = () => {
  const serviceKey = Array.from(selectedService)[0]
  const locationKey = Array.from(selectedLocation)[0]

  const params = new URLSearchParams()

  if (locationKey) params.set("location", String(locationKey))
  if (weddingDate) {
    const year = weddingDate.getFullYear()
    const month = String(weddingDate.getMonth() + 1).padStart(2, "0")
    const day = String(weddingDate.getDate()).padStart(2, "0")

    params.set("date", `${year}-${month}-${day}`)
  }

  if (serviceKey) {
    router.push(`/wedding-service/${String(serviceKey)}?${params.toString()}`)
  } else {
    router.push(`/wedding-service?${params.toString()}`)
  }
}


  return (
    <section  className="pt-18 pb-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto">
        <div className="grid min-[1075px]:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] dark:text-white mb-4 leading-tight max-[410px]:text-center max-[410px]:px-2">
              Plan Your Dream Wedding in One Place
            </h1>
            <p className="text-lg text-[#666666] dark:text-[#B0B0B0] mb-2 leading-relaxed max-[410px]:text-justify max-[410px]:px-2">
              Browse, compare, and book wedding venues, photographers, catering and more — all with real-time
              availability
            </p>

            {/* Search Bar */}
            <div className="bg-white dark:bg-[#1E1E1E] border-2 border-[#E0E0E0] dark:border-[#2D2D2D] rounded-xl p-4 shadow-lg ">
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center bg-[#F5F5F5] dark:bg-[#121212] rounded-lg cursor-pointer">
                  <Select
                    selectedKeys={selectedService}
                    onSelectionChange={setSelectedService}
                    renderValue={() => selectedValue || "Service Type"}
                    placeholder="Service Type"
                    className="bg-transparent outline-none w-full text-sm text-[#1A1A1Ab8] dark:text-white placeholder:text-[#666666] dark:placeholder:text-[#B0B0B0]"
                    classNames={{
                      selectorIcon: "absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] dark:text-[#B0B0B0]",
                      value: "justify-start text-left",
                      trigger: "justify-start",
                    }}
                    >
                    <SelectSection className="bg-[#F5F5F5] dark:bg-[#121212] rounded-lg">
                    {services.map((service) => (
                      
                      <SelectItem key={service.id}  textValue={service.title} className="gap-2 px-2 py-1 hover:bg-[#E0E0E0] dark:hover:bg-[#2D2D2D] rounded-md flex ">
                        <div className="flex items-center gap-2 text-[#1A1A1A] dark:text-white justify-start">
                            {service.icon && <service.icon size={14} />}
                            <span className="flex justify-start">{service.title}</span>
                          </div>
                        </SelectItem>
                    ))}
                    </SelectSection>
                  </Select>
                </div>

                 {/* Location Select */}
                <div className="flex items-center justify-start gap-2 bg-[#F5F5F5] dark:bg-[#121212] rounded-lg cursor-pointer">
                  <Select
                    selectedKeys={selectedLocation}
                    onSelectionChange={setSelectedLocation}
                    renderValue={() => selectedLocationValue || "Location"}
                    selectorIcon={<MapPin size={16} className="text-[#666666] dark:text-[#B0B0B0]" />}
                    placeholder="Location"
                    className="bg-transparent outline-none justify-start w-full text-sm text-[#1A1A1Ab8] dark:text-white placeholder:text-[#666666] dark:placeholder:text-[#B0B0B0]"
                    classNames={{
                      selectorIcon: "absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] dark:text-[#B0B0B0]",                    }}
                    >
                    <SelectSection className="bg-[#F5F5F5] dark:bg-[#121212] rounded-lg ">
                    {location.map((location) => (
                      
                      <SelectItem key={location.id}  textValue={location.name} className="flex justify-start gap-2 px-2 py-1 hover:bg-[#E0E0E0] dark:hover:bg-[#2D2D2D] rounded-md flex">
                            <span className="text-[#1A1A1A] dark:text-white flex justify-start">{location.name}</span>
                            
                        </SelectItem>
                    ))}
                    </SelectSection>
                  </Select>
                </div>

                {/* Date Input */}
                <DatePicker
                    value={weddingDate}
                    onChange={setWeddingDate}
                    placeholder="Wedding Date"
                  />
              </div>

              
                <button
                  onClick={handleSearch}
                  className={`w-full py-3 rounded-lg transition-colors font-medium cursor-pointer
                    ${hasFilters
                      ? "bg-[#FF69B4] hover:bg-[#FF1493] text-white"
                      : "bg-[#FF69B4] text-[#1A1A1A] text-white hover:bg-[#FF1493] "
                    }
                  `}
                >
                  {hasFilters ? (
                    <>
                      Search
                      <span className="ml-2 text-sm opacity-80">
                        · {activeFiltersCount}
                      </span>
                    </>
                  ) : (
                    "Explore all services"
                  )}
                </button>

            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-[5/5] rounded-2xl overflow-hidden shadow-2xl relative max-[1075px]:hidden">
              <Image
                src="/bride-holding-wedding-bouquet-with-soft-lighting.jpg"
                alt="Bride with wedding bouquet"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
