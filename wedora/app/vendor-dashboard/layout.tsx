import { Navigation } from "../_components/navigation";
import { vendorPages } from "../navigationData";


export default function VendorDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Navigation pages={vendorPages} />
        {children}
    </>
  );
}