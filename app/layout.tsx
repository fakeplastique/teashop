import type { Metadata } from "next";
import "./globals.scss";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Tea Shop - Premium Teas from Around the World",
  description: "Discover and enjoy premium teas from different regions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
