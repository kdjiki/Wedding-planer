"use client"

import { X } from "lucide-react"
import { useMemo } from "react"
import { location } from "../../servicesType"
import { DatePicker } from "@/app/_components/date-picker" // prilagodi putanju

interface FilterPanelProps {
  isOpen: boolean
  onClose: () => void
  selectedFilters: Record<string, string[]>
  onFilterChange: (category: string, value: string) => void
  onClearAll: () => void
}

const FILTER_OPTIONS = {
  Location: location.map(loc => loc.name),
  Rating: ["4.5+", "4.0+", "3.5+", "Any"],
}

export function FilterPanel({
  isOpen,
  onClose,
  selectedFilters,
  onFilterChange,
  onClearAll
}: FilterPanelProps) {

  const totalActive = Object.values(selectedFilters).flat().length

  // Pretvori string u Date
  const selectedDate = useMemo(() => {
    const value = selectedFilters["Availability"]?.[0]
    return value ? new Date(value) : null
  }, [selectedFilters])

  if (!isOpen) return null

  const handleDateChange = (date: Date) => {
    const isoDate = date.toISOString().split("T")[0]
    onFilterChange("Availability", isoDate)
  }

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#2D2D2D] rounded-xl p-5 animate-in fade-in slide-in-from-top-2 duration-200">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-semibold text-[#1A1A1A] dark:text-white">
            Filters
          </h3>

          {totalActive > 0 && (
            <span className="px-2.5 py-0.5 bg-[#FF69B4] text-white text-xs font-semibold rounded-full">
              {totalActive}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {totalActive > 0 && (
            <button
              onClick={onClearAll}
              className="text-sm text-[#FF69B4] hover:text-[#FF1493] font-medium transition-colors"
            >
              Clear all
            </button>
          )}

          <button
            onClick={onClose}
            className="p-1.5 text-[#666666] dark:text-[#B0B0B0] hover:text-[#1A1A1A] dark:hover:text-white rounded-lg hover:bg-[#F5F5F5] dark:hover:bg-[#2D2D2D] transition-colors"
            aria-label="Close filters"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* FILTER GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* STANDARD FILTERI */}
        {Object.entries(FILTER_OPTIONS).map(([category, options]) => (
          <div key={category}>
            <h4 className="text-sm font-semibold text-[#1A1A1A] dark:text-white mb-2.5">
              {category}
            </h4>

            <div className="flex flex-wrap gap-2">
              {options.map((option) => {
                const isSelected = selectedFilters[category]?.includes(option)

                return (
                  <button
                    key={option}
                    onClick={() => onFilterChange(category, option)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-[#FF69B4] text-white"
                        : "bg-[#F5F5F5] dark:bg-[#2D2D2D] text-[#666666] dark:text-[#B0B0B0] hover:bg-[#FFB6C1]/30 hover:text-[#FF69B4]"
                    }`}
                    aria-pressed={isSelected}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {/* AVAILABILITY DATE PICKER */}
        <div>
          <h4 className="text-sm font-semibold text-[#1A1A1A] dark:text-white mb-2.5">
            Availability
          </h4>

          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            placeholder="Select available date"
          />
        </div>

      </div>
    </div>
  )
}