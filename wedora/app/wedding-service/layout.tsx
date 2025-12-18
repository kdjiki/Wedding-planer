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
        {children}
    </>
  );
}