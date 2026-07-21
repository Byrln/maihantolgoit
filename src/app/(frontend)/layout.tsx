import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "../globals.css";

const body = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Maikhan Tolgoi Tourist Camp",
  description:
    "Eco-friendly tourist camp on the northern shore of Terkhiin Tsagaan Lake in Khorgo-Terkh National Park, Mongolia.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={body.variable}>{children}</div>;
}
