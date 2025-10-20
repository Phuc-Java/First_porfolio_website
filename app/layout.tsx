import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import MusicWidget from "@/components/MusicWidget";
import MobileBlock from "@/components/MobileBlock";
import MobileRedirect from "@/components/MobileRedirect";
import AnimatedTitle from "@/components/AnimatedTitle";
import OpeningOverlay from "@/components/OpeningOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio — Nguyễn Tuấn Phúc",
  description: "Personal portfolio of Nguyễn Tuấn Phúc — web developer, frontend engineer, and creative coder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <head>
        {/* Explicit favicon so browsers don't 404 for /favicon.ico on deploy */}
        <link rel="icon" href="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-black`}
      >
      {/* Opening overlay (client-only): shows animation and then fades out */}
      <OpeningOverlay />
  {/* Mobile redirect/enforcement (client-side) */}
  <MobileRedirect />
  {/* Mobile block overlay (client-side) */}
  <MobileBlock />
  {children}
  {/* Music widget: client-only persistent audio player */}
  <MusicWidget />
  {/* Animate document.title on the client */}
  <AnimatedTitle baseTitle="Portfolio" />
      </body>
    </html>
  );
}
