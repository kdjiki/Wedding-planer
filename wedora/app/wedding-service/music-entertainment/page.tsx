"use client"

import { CategoryPage } from "../_components/category-page"
import { Suspense } from "react"

export default function BandsDJs() {
    return (
    <Suspense fallback={<div className="h-screen w-full bg-white dark:bg-[#1E1E1E]"></div>}>
        <CategoryPage serviceId="music-entertainment" />
    </Suspense>
    )
}

