import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { mainMeta } from "@/metadata/mainMetadata";
import "../styles/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import StoreProvider from "@/contexts/StoreProvider";
import { Toaster } from "sonner";
import AuthContext from "@/contexts/AuthContext";

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
      <body className={`${inter.className}`}>
        <StoreProvider>
          <AuthContext>
            {children}{" "}
            <Toaster
              richColors={true}
              position="top-right"
              closeButton={true}
            />
          </AuthContext>
        </StoreProvider>
      </body>
    </html>
  );
}
