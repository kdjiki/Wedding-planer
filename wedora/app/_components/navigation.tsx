"use client"
import { Page } from "../navigationData"
import "../globals.css"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Navigation({ pages }: { pages: Page[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF69B4] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="font-bold text-lg text-[#1A1A1A] dark:text-white pr-6">Wedora</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {pages
              .filter((link) => link.title !== "Login")
              .map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="py-4 text-[#1A1A1A] dark:text-white hover:text-[#FF1493] dark:hover:text-[#FFB6C1] transition-colors text-center text-sm font-medium"
              >
                {link.title}
              </Link>
            ))}
            <button className="px-6 py-2 bg-[#FF69B4] text-white rounded-lg hover:bg-[#FF1493] transition-colors font-medium cursor-pointer">
              <a href="/login">
                Login
              </a>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-[#1A1A1A]">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#1E1E1E] border-t border-[#E0E0E0] dark:border-[#2D2D2D]">
          <div className="px-4 py-4 space-y-3">
            {pages.filter((link) => link.title !== "Login")
            .map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="block text-[#1A1A1A] dark:text-white hover:text-[#FF1493] dark:hover:text-[#FFB6C1] transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <button className="w-full px-6 py-2 bg-[#FF69B4] text-white rounded-lg hover:bg-[#FF1493] transition-colors font-medium">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
