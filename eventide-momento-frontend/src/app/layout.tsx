import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { mainMeta } from "@/metadata/mainMetadata";
import "../styles/globals.css";
import "swiper/css";
import "swiper/css/pagination";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = mainMeta;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
