import Image from "next/image";
import { Coffee, Gift, ParkingCircle, Plug, Shirt, Wifi } from "lucide-react";
import type { ReactNode } from "react";

import { MainLayout, PageHero } from "@/components/legacy-site";
import { activityCards, img } from "@/lib/site-data";

const serviceIcons = [
  ["Free Wi-Fi in common areas", Wifi],
  ["Electricity and charging stations for guests", Plug],
  ["Souvenir shop with locally handcrafted goods", Gift],
  ["Laundry services available upon request", Shirt],
  ["Secure parking for private vehicles and tour buses", ParkingCircle],
];

export default function AmenitiesPage() {
  return (
    <MainLayout>
      <PageHero image={img.amenitiesHero} title="Amenities & Facilities" />
      <section className="narrow-container py-8 text-center">
        <p className="body-copy">
          At Maikhan Tolgoi Tourist Camp, we strive to provide a comfortable and authentic Mongolian experience while
          keeping you close to nature. Whether you seek adventure, relaxation, or cultural immersion, our camp is fully
          equipped to meet your needs.
        </p>
      </section>
      <section className="narrow-container py-8 text-center">
        <h2 className="section-title">Dining & Food Services</h2>
        <p className="body-copy mx-auto mt-8 max-w-[520px]">
          Savor the flavors of Mongolia at our on-site restaurant, where we serve a variety of traditional and
          international dishes. Our meals are prepared with fresh, locally sourced ingredients.
        </p>
        <div className="relative mx-auto mt-8 aspect-[1.55/1] max-w-[470px] overflow-hidden">
          <Image src={img.dining} alt="Dining at Maikhan Tolgoi" fill loading="eager" className="object-cover" />
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {["Traditional khorkhog (Mongolian-style stone pot cooking)", "Barbecue nights by the campfire", "Vegetarian and dietary-friendly options upon request"].map((text) => (
            <div key={text} className="flex flex-col items-center">
              <Coffee className="size-8 text-[#34373b]" />
              <p className="mt-4 max-w-[180px] text-[9px] uppercase leading-4 text-[#5f646a]">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="site-container py-10 text-center">
        <h2 className="font-serif text-[26px] italic tracking-[0.12em] text-[#42484f]">Activities & Recreation</h2>
        <p className="mt-6 text-[10px] uppercase tracking-[0.08em] text-[#6f7379]">
          Explore the stunning landscapes surrounding Maikhan Tolgoi with our exciting outdoor activities:
        </p>
        <div className="mx-auto mt-10 grid max-w-[920px] grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-5">
          {activityCards.map(([name, src]) => (
            <article key={name} className="text-left">
              <div className="relative aspect-[1.25/1] overflow-hidden">
                <Image src={src} alt={name} fill loading="eager" className="object-cover" />
              </div>
              <p className="mt-4 text-[12px] italic tracking-[0.08em] text-[#5c6167]">{name}</p>
              <span className="thin-rule mt-5 w-14 bg-[#555]" />
            </article>
          ))}
        </div>
      </section>
      <TextImageBand image={img.volcano} title="Khorgo Volcano">
        Khorgo Volcano, an extinct volcano at 2,240 meters, last erupted thousands of years ago, shaping the stunning
        landscape of Arkhangai province. The 200-meter-wide crater offers panoramic views of rugged volcanic terrain,
        lava fields, and basalt formations. Hiking to the crater, you&apos;ll discover lava caves and tunnels, adding to
        the area&apos;s mystique.
      </TextImageBand>
      <section className="narrow-container py-16 text-center">
        <h2 className="section-title text-[14px]">Relaxation & Entertainment</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            ["Boating", "on the lake's crystal-clear waters", img.boating],
            ["Stargazing sessions", "in the pristine night sky", img.stargazing],
          ].map(([title, subtitle, src]) => (
            <article key={title}>
              <div className="relative aspect-square overflow-hidden">
                <Image src={src} alt={title} fill loading="eager" className="object-cover" />
              </div>
              <p className="mt-5 text-[12px] text-[#777c82]">{title}</p>
              <p className="mt-3 text-[10px] text-[#a1a4a8]">{subtitle}</p>
            </article>
          ))}
        </div>
      </section>
      <TextImageBand image={img.lake} title="Terkhiin Tsagaan Lake">
        Terkhiin Tsagaan Lake, also known as the &quot;Great White Lake,&quot; is one of Mongolia&apos;s most stunning
        natural wonders. Stretching 16 kilometers in length, its crystal-clear waters are surrounded by hills, lava
        fields, and meadows. Perfect for fishing, boating, and swimming, Terkhiin Tsagaan Lake offers a peaceful retreat.
      </TextImageBand>
      <section className="narrow-container py-20 text-center">
        <h2 className="section-title text-[13px]">Essential Services & Extras</h2>
        <span className="thin-rule mx-auto mt-8 bg-[#555]" />
        <p className="mt-10 text-[12px] uppercase tracking-[0.08em] text-[#6c7076]">To ensure a seamless and comfortable stay, we offer:</p>
        <div className="mt-14 grid gap-12 md:grid-cols-3">
          {serviceIcons.map(([label, Icon]) => (
            <div key={label as string} className="flex flex-col items-center">
              <Icon className="size-8 text-[#4b5056]" />
              <p className="mt-5 max-w-[180px] text-[9px] uppercase leading-5 text-[#6a6f75]">{label as string}</p>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}

function TextImageBand({ image, title, children }: { image: string; title: string; children: ReactNode }) {
  return (
    <section className="relative h-[360px] overflow-hidden text-white">
      <Image src={image} alt={title} fill loading="eager" className="object-cover" />
      <div className="absolute inset-0 bg-black/24" />
      <div className="absolute bottom-14 left-[12%] max-w-[640px]">
        <h2 className="text-[31px] font-semibold tracking-[0.07em]">{title}</h2>
        <p className="mt-6 text-[11px] font-semibold leading-6 tracking-[0.03em]">{children}</p>
      </div>
    </section>
  );
}
