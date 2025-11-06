import { Navigation } from "../_components/navigation";
import { weddingServicePages } from "../navigationData";



export default function WeddingServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Navigation pages={weddingServicePages} />
        {children}
    </>
  );
}