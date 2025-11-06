import { Navigation } from "../_components/navigation";
import { inspirationPages } from "../navigationData";


export default function InspirationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Navigation pages={inspirationPages} />
        {children}
    </>
  );
}