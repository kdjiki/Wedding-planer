"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

interface DatePickerProps {
  value: Date | null
  onChange: (date: Date) => void
  placeholder?: string
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

export function DatePicker({ value, onChange, placeholder = "Select date" }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [showYearSelector, setShowYearSelector] = useState(false)
  const [showMonthSelector, setShowMonthSelector] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Close picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setShowYearSelector(false)
        setShowMonthSelector(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Get days in month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0-6)
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Check if date is in past
  const isPastDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    return date < today
  }

  // Handle date selection
  const handleDateClick = (day: number) => {
    if (isPastDate(day)) return
    const selectedDate = new Date(currentYear, currentMonth, day)
    onChange(selectedDate)
    setIsOpen(false)
  }

  // Navigate months
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Generate year options (current year to +10 years)
  const yearOptions = Array.from({ length: 11 }, (_, i) => today.getFullYear() + i)

  // Format display value in DD/MM/YYYY
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Render calendar days
  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    // Empty cells for days before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-9 h-9" />)
    }

    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const isDisabled = isPastDate(day)
      const isSelected = value && 
        value.getDate() === day && 
        value.getMonth() === currentMonth && 
        value.getFullYear() === currentYear
      const isToday = 
        today.getDate() === day && 
        today.getMonth() === currentMonth && 
        today.getFullYear() === currentYear

      days.push(
        <button
          key={day}
          type="button"
          disabled={isDisabled}
          onClick={() => handleDateClick(day)}
          className={`
            w-9 h-9 rounded-lg text-sm font-medium transition-all
            ${isDisabled 
              ? "text-[#CCCCCC] dark:text-[#444444] cursor-not-allowed" 
              : "hover:bg-[#FFB6C1]/30 dark:hover:bg-[#FF69B4]/20 cursor-pointer"
            }
            ${isSelected 
              ? "bg-[#FF69B4] text-white hover:bg-[#FF69B4]" 
              : ""
            }
            ${isToday && !isSelected 
              ? "border-2 border-[#FF69B4] text-[#FF69B4]" 
              : ""
            }
            ${!isDisabled && !isSelected && !isToday 
              ? "text-[#1A1A1A] dark:text-white" 
              : ""
            }
          `}
        >
          {day}
        </button>
      )
    }

    return days
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input field */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-4 px-4 py-3 bg-[#F5F5F5] dark:bg-[#121212] rounded-lg cursor-pointer"
      >
        <span className={ "text-sm text-[#1A1A1Ab8]  dark:text-white"}>
          {value ? formatDate(value) : placeholder}
        </span>
        <Calendar size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] dark:text-[#B0B0B0] " />
      </div>

      {/* Calendar dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-white dark:bg-[#1E1E1E] border-2 border-[#E0E0E0] dark:border-[#2D2D2D] rounded-xl shadow-xl p-4 w-[300px]">
          {/* Header with month/year selectors */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={goToPrevMonth}
              className="p-2 hover:bg-[#F5F5F5] dark:hover:bg-[#2D2D2D] rounded-lg transition-colors"
            >
              <ChevronLeft size={20} className="text-[#666666] dark:text-[#B0B0B0]" />
            </button>

            <div className="flex items-center gap-2">
              {/* Month selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowMonthSelector(!showMonthSelector)
                    setShowYearSelector(false)
                  }}
                  className="px-3 py-1 text-sm font-semibold text-[#1A1A1A] dark:text-white hover:bg-[#FFB6C1]/20 dark:hover:bg-[#FF69B4]/20 rounded-lg transition-colors"
                >
                  {MONTHS[currentMonth]}
                </button>
                
                {showMonthSelector && (
                  <div className="absolute top-full left-0 mt-1 bg-white dark:bg-[#1E1E1E] border-2 border-[#E0E0E0] dark:border-[#2D2D2D] rounded-lg shadow-lg p-2 w-36 max-h-48 overflow-y-auto z-50 scrollbar-thin scrollbar-thumb-[#FFB6C1] dark:scrollbar-thumb-[#FF69B4] scrollbar-track-[#F5F5F5] dark:scrollbar-track-[#2D2D2D] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                    {MONTHS.map((month, index) => (
                      <button
                        key={month}
                        type="button"
                        onClick={() => {
                          setCurrentMonth(index)
                          setShowMonthSelector(false)
                        }}
                        className={`
                          w-full px-3 py-1.5 text-sm text-left rounded-md transition-colors
                          ${currentMonth === index 
                            ? "bg-[#FF69B4] text-white" 
                            : "text-[#1A1A1A] dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#2D2D2D]"
                          }
                        `}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Year selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowYearSelector(!showYearSelector)
                    setShowMonthSelector(false)
                  }}
                  className="px-3 py-1 text-sm font-semibold text-[#1A1A1A] dark:text-white hover:bg-[#FFB6C1]/20 dark:hover:bg-[#FF69B4]/20 rounded-lg transition-colors"
                >
                  {currentYear}
                </button>
                
                {showYearSelector && (
                  <div className="absolute top-full right-0 mt-1 bg-white dark:bg-[#1E1E1E] border-2 border-[#E0E0E0] dark:border-[#2D2D2D] rounded-lg shadow-lg p-2 w-24 max-h-48 overflow-y-auto z-50 scrollbar-thin scrollbar-thumb-[#FFB6C1] dark:scrollbar-thumb-[#FF69B4] scrollbar-track-[#F5F5F5] dark:scrollbar-track-[#2D2D2D] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                    {yearOptions.map((year) => (
                      <button
                        key={year}
                        type="button"
                        onClick={() => {
                          setCurrentYear(year)
                          setShowYearSelector(false)
                        }}
                        className={`
                          w-full px-3 py-1.5 text-sm text-left rounded-md transition-colors
                          ${currentYear === year 
                            ? "bg-[#FF69B4] text-white" 
                            : "text-[#1A1A1A] dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#2D2D2D]"
                          }
                        `}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={goToNextMonth}
              className="p-2 hover:bg-[#F5F5F5] dark:hover:bg-[#2D2D2D] rounded-lg transition-colors"
            >
              <ChevronRight size={20} className="text-[#666666] dark:text-[#B0B0B0]" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((day) => (
              <div
                key={day}
                className="w-9 h-9 flex items-center justify-center text-xs font-medium text-[#666666] dark:text-[#B0B0B0]"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {renderDays()}
          </div>

          {/* Today button */}
          <div className="mt-4 pt-3 border-t border-[#E0E0E0] dark:border-[#2D2D2D]">
            <button
              type="button"
              onClick={() => {
                setCurrentMonth(today.getMonth())
                setCurrentYear(today.getFullYear())
              }}
              className="w-full py-2 text-sm font-medium text-[#FF69B4] hover:bg-[#FFB6C1]/20 dark:hover:bg-[#FF69B4]/20 rounded-lg transition-colors"
            >
              Go to Today
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
