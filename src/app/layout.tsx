import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ToasterProvider } from "@/providers/toast-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Okessapar // Site Officiel",
  description:
    "Découvrez les dernières nouvelles, les dates de concerts, les vidéos et la musique de Okessapar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToasterProvider />
        <div className="max-w-screen-2xl mx-auto w-full grid min-h-screen grid-rows-[auto_1fr_auto] overflow-x-hidden">
          <Navbar />

          <main>
            {children}
            <SpeedInsights />
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
