"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Page  } from "../navigationData";

function processPage(page: Page, index: number, currentPath?: string) {
  const isActive =
    page.path === "/"
      ? currentPath === page.path
      : currentPath?.startsWith(page.path);

  return (
    <li key={index}>
      <Link href={page.path} className={`px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${isActive ? "font-bold underline" : ""}`}>
        {page.title}
      </Link>
    </li>
  );
}


export function Navigation({ pages }: { pages: Page[] })  {
  const currentPath = usePathname();
  return (
    <nav className="w-full bg-gray-50 dark:bg-gray-900 shadow-md py-3 px-6">
    <ul className="flex justify-center space-x-6 text-gray-800 dark:text-gray-100">
      {pages.map((page, index) => processPage(page, index, currentPath))}
    </ul>
  </nav>
  );
}
