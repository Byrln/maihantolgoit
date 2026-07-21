import { Mail, Pin, Smartphone } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site-header";
import { isVideoUrl } from "@/lib/media";
import { getHeaderContent } from "@/lib/public-content";
import { contact, img } from "@/lib/site-data";

export async function LegacyHeader() {
  const { links, posts, services } = await getHeaderContent();

  return (
    <SiteHeader
      email={contact.email}
      links={links}
      logo={img.logo}
      phone={contact.phones[0]}
      posts={posts}
      services={services}
    />
  );
}

export function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <LegacyHeader/>
      <main>{children}</main>
    </>
  );
}

export function LegacyFooter() {
  return (
   <footer>
         <section className="relative h-[300px] overflow-hidden text-center text-white">
                 {/* <Image src={img.footer} alt="Aerial view of Maikhan Tolgoi Tourist Camp" fill loading="eager" className="object-cover" /> */}
                  <video
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    poster={img.footer}
    className="absolute inset-0 h-full w-full object-cover"
  >
    <source src="/home-book.mp4" type="video/mp4" />
  </video>
                 <div className="absolute inset-0 bg-black/35" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                   <h2 className="text-[30px] font-light tracking-[0.22em]">Maikhan Tolgoi</h2>
                   <p className="mt-4 text-[15px] uppercase tracking-[0.1em]">Tourist Camp</p>
                   <p className="mt-4 max-w-xl text-[12px] leading-6 tracking-[0.04em]">
                     If you want to experience the beauty of Terkhiin Tsagaan Lake, choose us!
                   </p>
                   <div className="mt-6 flex gap-5">
                     <a href="https://www.facebook.com/MaikhanTolgoi" target="_blank" rel="noreferrer" className="social-dot flex items-center justify-center bg-[#4778c7] text-white" aria-label="Facebook">
                       <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                         <path d="M13.5 20v-7h2.4l.4-2.8h-2.8V3.8c0-.8.2-1.4 1.4-1.4h1.5V.1c-.3-.1-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8.1V13h2.4v7h3Z" />
                       </svg>
                     </a>
                     <a href="https://www.instagram.com/maikhantolgoi.lodge/" target="_blank" rel="noreferrer" className="social-dot flex items-center justify-center bg-[#d6d2c8] text-[#705333]" aria-label="Instagram">
                       <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                         <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2Zm0 2A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2Zm5.2-3.4a1.2 1.2 0 1 1-1.2 1.2 1.2 1.2 0 0 1 1.2-1.2Z" />
                       </svg>
                     </a>
                     <a href="https://www.youtube.com/@Maikhantolgoi" target="_blank" rel="noreferrer" className="social-dot flex items-center justify-center bg-[#e74b39] text-white" aria-label="YouTube">
                       <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                         <path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.9 4.7 12 4.7 12 4.7s-5.9 0-7.6.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.7.5 7.6.5 7.6.5s5.9 0 7.6-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
                       </svg>
                     </a>
                     <a href="mailto:maikhantolgoicamp@gmail.com" className="social-dot flex items-center justify-center bg-[#2497c8] text-white" aria-label="Email">
                       <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                         <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.2-8 5.1-8-5.1V6l8 5.1L20 6v2.2Z" />
                       </svg>
                     </a>
                   </div>
                 </div>
               </section>
         <div className="py-6 text-center text-[10px] text-[#a0a0a0]">
           Powered by <a href="https://horecasoft.mn" className="font-semibold text-blue-600" target="_blank" rel="noopener noreferrer">
             HorecaSoft
           </a>
         </div>
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
  image?: string;
  title?: string;
  subtitle?: string;
  logo?: boolean;
  align?: "center" | "left";
  tall?: boolean;
}) {
  const homeLogoHero = logo && !title && !subtitle;

  return (
    <section className={`hero-strip bg-[#244b35] ${tall ? "tall" : ""}`}>
      {image ? (
        isVideoUrl(image) ? (
          <video src={image} className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline />
        ) : (
          <Image src={image} alt={title || "Maikhan Tolgoi landscape"} fill priority className="object-cover" />
        )
      ) : null}
      {homeLogoHero ? null : <div className="hero-overlay" />}
      <div
        className={`absolute inset-0 flex flex-col px-5 text-white sm:px-8 ${
          homeLogoHero
            ? "items-center justify-start pt-12 text-center"
            : align === "left"
              ? "items-start justify-center sm:pl-[8%]"
              : "items-center justify-center text-center"
        }`}
      >
        {logo ? <Image src={img.logo} alt="Maikhan Tolgoi logo" width={88} height={76} className="mb-4 h-16 w-auto sm:h-20" /> : null}
        {title ? <h1 className="max-w-4xl whitespace-pre-line text-3xl font-semibold uppercase leading-tight sm:text-4xl">{title}</h1> : null}
        {subtitle ? <p className="mt-4 max-w-2xl text-sm leading-7 text-white/92 sm:text-base">{subtitle}</p> : null}
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
    </>
  );
}

export function ContactIcon({ type, title, body }: { type: "pin" | "phone" | "mail"; title: string; body: string }) {
  const icon =
    type === "pin" ? <Pin className="size-20" /> : type === "phone" ? <Smartphone className="size-20" /> : <Mail className="size-20" />;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-[#34373b]">{icon}</div>
      <div className="mt-5 text-sm text-black">{title}</div>
      <div className="mt-3 h-px w-20 bg-black" />
      <p className="mt-3 max-w-[220px] text-sm text-[#9a9da2]">{body}</p>
    </div>
  );
}
