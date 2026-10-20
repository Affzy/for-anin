import type { Metadata } from "next";
import { Playfair_Display, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fancy",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "A Special Letter",
  description: "A special message made just for you.",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${inter.variable} ${greatVibes.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-svh bg-[#0f0b1a] text-[#f5eef5] antialiased selection:bg-[#e8a0b4]/30 selection:text-[#f3d9c4]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
