import type { Metadata } from "next";
import "../styles/globals.css";
import { Anton } from "next/font/google";
import { mainMeta } from "@/metadata/mainMetadata";

export const antonFont = Anton({
  weight: ["400"],
});

export const metadata: Metadata = mainMeta;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${antonFont.className}`}>{children}</body>
    </html>
  );
}
