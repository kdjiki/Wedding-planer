import { Navigation } from "../_components/navigation";
import { myAccountPages } from "../navigationData";


export default function MyAccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Navigation pages={myAccountPages} />
        {children}
    </>
  );
}