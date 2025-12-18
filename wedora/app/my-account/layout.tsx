import { SubNavigation } from "../_components/subnavigation";
import { myAccountPages } from "../navigationData";


export default function MyAccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <SubNavigation pages={myAccountPages} />
        {children}
    </>
  );
}