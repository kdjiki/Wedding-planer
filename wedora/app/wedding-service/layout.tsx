import { SubNavigation } from "../_components/subnavigation";
import { weddingServicePages } from "../navigationData";


export default function WeddingServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <SubNavigation pages={weddingServicePages} />
        <main className="min-h-screen bg-[#F5F5F5] dark:bg-[#121212]">
        {children}
      </main>
    </>
  );
}