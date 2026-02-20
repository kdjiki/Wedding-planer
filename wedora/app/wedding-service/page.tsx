
"use client"

import { Suspense} from "react" // Dodaj Suspense

import WeddingServicesContent from "./WeddingServicesContent"

export default function WeddingServicesPage() {
  return (
    <Suspense fallback={<div className="pt-24 text-center">Učitavanje usluga...</div>}>
      <WeddingServicesContent />
    </Suspense>
  )
}