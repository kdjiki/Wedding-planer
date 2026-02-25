"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { Page } from "../navigationData"
import { supabase } from "@/lib/supabase" 
import "../globals.css"

export function Navigation({ pages }: { pages: Page[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname();
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    window.location.reload()
     localStorage.removeItem("wedding_favs")

    router.refresh()
    router.push("/")
    }

  return (
   <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-white/20">
     <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
                <Image src="/wedoraLogoW.png" alt="Wedora Logo" width={32} height={32} />
            <span className="font-bold text-lg text-[#1A1A1A] dark:text-white pr-6">Wedora</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {pages
              .filter((link) => {
                  // rm login link from desktop nav, it will be shown as button on the right
                  if (link.title === "Login") return false;
                  
                  // only show "My Account" if user is logged in
                  if (link.title === "My account") {
                    return !!user;
                  }
                  
                  return true;
              })
              .map((link) => {
                const isActive =
                pathname === link.path ||
                pathname.startsWith(link.path + "/")

              return (  
                <Link
                  key={link.path}
                  href={link.path}
                  className={`
                    relative py-4 text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "text-[#FF1493] dark:text-[#FFB6C1]"
                        : "text-[#1A1A1A] dark:text-white hover:text-[#FF1493] dark:hover:text-[#FFB6C1]"
                    }
                  `}
                >
                  {link.title}

                  {/* Active underline */}
                  {isActive && (
                    <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#FF1493] dark:bg-[#FFB6C1] rounded-full" />
                  )}
                </Link>
              )})}
            {user ? (
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-[#FF69B4] text-white rounded-lg hover:bg-[#FF1493] transition-colors font-medium"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2 bg-[#FF69B4] text-white rounded-lg hover:bg-[#FF1493] transition-colors font-medium"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-[#1A1A1A] dark:text-white hover:text-[#FF1493] dark:hover:text-[#FFB6C1] transition-colors">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#1E1E1E] border-t border-[#E0E0E0] dark:border-[#2D2D2D]">
          <div className="px-4 py-4 space-y-3">
            {pages.filter((link) => {
                  // rm login link from desktop nav, it will be shown as button on the right
                  if (link.title === "Login") return false;
                  
                  // only show "My Account" if user is logged in
                  if (link.title === "My account") {
                    return !!user;
                  }
                  
                  return true;
              })
            .map((link) => {
                const isActive =
                pathname === link.path ||
                pathname.startsWith(link.path + "/")
              return (
              <Link
                key={link.path}
                href={link.path}
                className={`
                  block transition-colors font-medium
                  ${isActive
                    ? "text-[#FF1493] dark:text-[#FFB6C1]"
                    : "text-[#1A1A1A] dark:text-white hover:text-[#FF1493] dark:hover:text-[#FFB6C1]"
                  }
                `}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            )})}
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full px-6 py-2 bg-[#FF69B4] text-white rounded-lg hover:bg-[#FF1493] transition-colors font-medium"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="block w-full px-6 py-2 bg-[#FF69B4] text-white rounded-lg hover:bg-[#FF1493] transition-colors font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
      </div>
    </nav>
  )
}
