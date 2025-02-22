import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import type { Viewport } from "next";

import "./globals.css";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
        <Script
          id="json-ld-global"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              name: "Okessapar",
              url: "https://okessapar.com",
              sameAs: [
                "https://www.instagram.com/okessapar",
                "https://www.facebook.com/okessapar",
                "https://open.spotify.com/artist/1n8P1ZPMaY61KWcfTG7l1Z",
                "https://music.apple.com/artist/1482952367",
              ],
              image: "https://okessapar.com/logo.png",
              description: "Une voix singulière, tantôt rappée, tantôt chantée, accompagne des textes en français doux comme percutants.",
              genre: "Pop slam alternatif",
              foundingDate: "2019",
              member: [
                {
                  "@type": "Person",
                  name: "Flavien Moutier",
                },
                {
                  "@type": "Person",
                  name: "Maxence Traina",
                },
                {
                  "@type": "Person",
                  name: "Lucas Murzeau",
                },
                {
                  "@type": "Person",
                  name: "Thomas Codis",
                },
              ],
            }),
          }}
        />
        <ToasterProvider />
        <div>
          {children}
          <SpeedInsights />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
