import { vendorPages } from "../navigationData";
import { SubNavigation } from "../_components/subnavigation";


export default function VendorDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <SubNavigation pages={vendorPages} />
        {children}
    </>
  );
}