"use client"

import { useEffect } from "react"
import { supabase as createClient} from "@lib/supabase" // Prilagodi putanju svom supabase klijentu

export function AuthSync() {
  useEffect(() => {
    const checkAuthAndClean = async () => {
      // Inicijaliziraj Supabase klijent (mora biti onaj za klijenta/browser)
      const supabase = createClient
      
      const { data: { session } } = await supabase.auth.getSession()

      // Ako nema sesije, a u localStorage-u postoje favoriti -> BRIŠI
      if (!session) {
        if (localStorage.getItem("wedding_favs")) {
          console.log("No session found, cleaning up favorites...")
          localStorage.removeItem("wedding_favs")
          
          // Osvježi stranicu samo ako smo na ruti koja prikazuje favorite 
          // (opcionalno, ali sigurnije za UX)
          if (window.location.pathname.includes("wedding-service")) {
             window.location.reload()
          }
        }
      }
    }

    checkAuthAndClean()
  }, [])

  return null // Ova komponenta ne crta ništa na ekranu
}