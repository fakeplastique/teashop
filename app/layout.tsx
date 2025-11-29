import type { Metadata } from "next";
import "./globals.scss";
import Navbar from "@/components/layout/Navbar";
import { Providers } from "./providers";

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
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
