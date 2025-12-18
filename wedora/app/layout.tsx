import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Navigation } from "./_components/navigation";
import { mainPages } from "./navigationData";
import "./globals.css";
import { Footer } from "./_components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wedora",
  description: "Wedding Planning Made Easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation pages={mainPages} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
