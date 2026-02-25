"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Uvezi useRouter za preusmjeravanje
import { supabase } from "@/lib/supabase";

import { SubNavigation } from "../_components/subnavigation";
import { myAccountPages } from "../navigationData";

export default function MyAccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Dodajemo loading stanje
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Ako nema korisnika, odmah ga šalji na home
        router.push("/");
      } else {
        setUser(user);
        setLoading(false);
      }
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          // Ako se sesija ugasi (logout), šalji na home
          setUser(null);
          router.push("/");
        } else {
          setUser(session.user);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  // Ako se podaci još učitavaju, ne prikazujemo ništa (sprječava "flicker" zaštićenog sadržaja)
  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF69B4]"></div>
      </div>
    );
  }

  // Ako korisnik nije ulogiran, ne renderiramo ništa jer će ga router.push izbaciti
  if (!user) return null;

  return (
    <>
      <SubNavigation pages={myAccountPages} />
      <main className="min-h-screen pt-4">
        {children}
      </main>
    </>
  );
}