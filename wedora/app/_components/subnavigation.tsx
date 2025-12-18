import Link from "next/link"

import { Page } from "../navigationData"


export function SubNavigation({ pages }: { pages: Page[] }) {
  return (
    <div className="sticky top-16 z-40 bg-white flex">
      <div className="max-w-7xl mx-auto px-4 flex gap-6 h-12 items-center ">
        {pages.map((page) => (
          <Link
            key={page.path}
            href={page.path}
            className="text-sm font-medium text-gray-700 hover:text-pink-500"
          >
            {page.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
