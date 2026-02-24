export default function InspirationLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="min-h-screen bg-[#F5F5F5] dark:bg-[#121212]">
      {children}
    </main>
  )
}
