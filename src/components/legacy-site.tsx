import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { contact, img } from "@/lib/site-data";

const nav = [
  ["Home", "/"],
  ["About us", "/about-us"],
  ["Accommodation", "/accommodation"],
  ["Amenities & Facilities", "/amenities-facilities"],
  ["Services", "/services"],
  ["Blog", "/blog"],
  ["Book now", "/#book-now"],
];

export function LegacyHeader() {
  return (
    <header className="bg-white">
      <div className="site-container flex min-h-[64px] items-center justify-between gap-6 py-3">
        <Link href="/" className="flex items-center gap-4">
          <Image src={img.logo} alt="Maikhan Tolgoi logo" width={42} height={36} priority className="h-9 w-auto" />
          <div className="hidden leading-5 text-[#59606a] sm:block">
            <div className="text-[12px] uppercase">{contact.email}</div>
            <div className="text-[12px]">{contact.phonesRaw}</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-[10px] font-medium uppercase tracking-[0.06em] text-[#4e5358] lg:flex">
          {nav.map(([label, href]) => (
            <Link key={label} href={href} className="hover:text-black">
              {label}
            </Link>
          ))}
        </nav>
        <nav className="flex items-center gap-4 text-[10px] uppercase text-[#4e5358] lg:hidden">
          <Link href="/accommodation">Rooms</Link>
          <Link href="/#book-now">Book</Link>
        </nav>
      </div>
    </header>
  );
}

export function LegacyFooter() {
  return (
    <footer>
      <div className="py-16 text-center text-[11px] text-[#a0a0a0]">
        Powered by <span className="font-semibold text-blue-600">HorecaSoft</span>
      </div>
      <section className="relative h-[300px] overflow-hidden text-center text-white">
        <Image src={img.footer} alt="Aerial view of Maikhan Tolgoi Tourist Camp" fill loading="eager" className="object-cover" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <h2 className="text-[34px] font-light tracking-[0.22em]">Maikhan Tolgoi</h2>
          <p className="mt-5 text-[18px] uppercase tracking-[0.1em]">Tourist Camp</p>
          <p className="mt-5 max-w-xl text-[15px] leading-7 tracking-[0.04em]">
            If you want to experience the beauty of Terkhiin Tsagaan Lake, choose us!
          </p>
          <div className="mt-7 flex gap-5">
            <span className="social-dot bg-[#4778c7]">f</span>
            <span className="social-dot bg-[#d6d2c8] text-[#705333]">◎</span>
            <span className="social-dot bg-[#e74b39]">▶</span>
            <span className="social-dot bg-[#2497c8]">✉</span>
          </div>
        </div>
      </section>
    </footer>
  );
}

export function PageHero({
  image,
  title,
  subtitle,
  logo = false,
  align = "center",
  tall = false,
}: {
  image: string;
  title?: string;
  subtitle?: string;
  logo?: boolean;
  align?: "center" | "left";
  tall?: boolean;
}) {
  return (
    <section className={`hero-strip ${tall ? "tall" : ""}`}>
        <Image src={image} alt={title || "Maikhan Tolgoi landscape"} fill priority className="object-cover" />
      <div className="hero-overlay" />
      <div
        className={`absolute inset-0 flex flex-col px-6 text-white ${
          align === "left" ? "items-start justify-center pl-[14%]" : "items-center justify-center text-center"
        }`}
      >
        {logo ? <Image src={img.logo} alt="Maikhan Tolgoi logo" width={76} height={64} className="mb-6 h-16 w-auto" /> : null}
        {title ? <h1 className="text-[27px] font-light uppercase leading-[1.55] tracking-[0.07em]">{title}</h1> : null}
        {subtitle ? <p className="mt-3 max-w-md text-[14px] leading-7 tracking-[0.04em]">{subtitle}</p> : null}
      </div>
    </section>
  );
}

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <LegacyHeader />
      <main>{children}</main>
      <LegacyFooter />
      <Link
        href="#"
        aria-label="Back to top"
        className="fixed bottom-7 right-7 z-40 flex size-12 items-center justify-center rounded-full bg-[#4ad360] text-2xl font-light text-white shadow-lg"
      >
        +
      </Link>
    </>
  );
}

export function ContactIcon({ type, title, body }: { type: "pin" | "phone" | "mail"; title: string; body: string }) {
  const icon =
    type === "pin" ? <MapPin className="size-12" /> : type === "phone" ? <Phone className="size-12" /> : <Mail className="size-12" />;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-[#34373b]">{icon}</div>
      <div className="mt-8 h-px w-20 bg-[#b8b8b8]" />
      <div className="mt-5 text-[11px] text-[#6b7077]">{title}</div>
      <p className="mt-4 max-w-[220px] text-[9px] leading-5 text-[#9a9da2]">{body}</p>
    </div>
  );
}
