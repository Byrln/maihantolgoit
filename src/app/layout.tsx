import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { NavigationProgress } from "@/components/navigation-progress";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const body = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Maikhan Tolgoi Tourist Camp",
  description:
    "Eco-friendly tourist camp on the northern shore of Terkhiin Tsagaan Lake in Khorgo-Terkh National Park, Mongolia.",
  keywords: [
    "Maikhan Tolgoi",
    "Mongolia tourist camp",
    "Terkhiin Tsagaan Lake",
    "Khorgo Terkh National Park",
    "Mongolian ger camp",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Maikhan Tolgoi Tourist Camp",
    description:
      "Eco-friendly tourist camp on the northern shore of Terkhiin Tsagaan Lake in Khorgo-Terkh National Park, Mongolia.",
    url: "/",
    siteName: "Maikhan Tolgoi Tourist Camp",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maikhan Tolgoi Tourist Camp",
    description: "Ger, dome, cabin, dining, and outdoor experiences beside Terkhiin Tsagaan Lake.",
    images: ["/opengraph-image.png"],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-256x256.png", sizes: "256x256", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#008a48",
      },
    ],
  },
  other: {
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": "#ffffff",
    "theme-color": "#008a48",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={body.variable}>
        <NavigationProgress />
        {children}
      </body>
    </html>
  );
}
