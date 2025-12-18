import { inspirationPages } from "../navigationData"
import { SubNavigation } from "../_components/subnavigation"

export default function InspirationLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SubNavigation pages={inspirationPages} />
      <main className="pt-4">
        {children}
      </main>
    </>
  )
}
