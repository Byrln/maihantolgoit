import Image from "next/image";
import Link from "next/link";

import { MainLayout, PageHero } from "@/components/legacy-site";
import { accommodations, img } from "@/lib/site-data";

export default function AccommodationPage() {
  return (
    <MainLayout>
      <PageHero
        image={img.accommodationHero}
        title="Mongolian Traditional Ger"
        subtitle={accommodations[0].intro}
        align="left"
      />
      <section className="narrow-container py-14 text-center">
        <h1 className="section-title">Accommodation</h1>
        <p className="body-copy mt-6">
          Welcome to our accommodation options, where comfort meets tradition in a stunning natural setting.
          <br />
          We offer four distinct types of accommodation to suit your preferences:
        </p>
      </section>
      <section className="narrow-container space-y-20 pb-20">
        {accommodations.map((item, index) => (
          <article key={item.title} className="grid items-center gap-12 md:grid-cols-2">
            <div className={`relative aspect-[4/3] overflow-hidden ${index % 2 ? "md:order-2" : ""}`}>
              <Image src={item.image} alt={item.title} fill loading="eager" className="object-cover" />
            </div>
            <div className="text-center">
              <h2 className="text-[23px] font-semibold tracking-[0.08em] text-[#686b70]">{item.title}</h2>
              <p className="mx-auto mt-5 max-w-[360px] text-[11px] font-semibold leading-5 text-[#555a60]">{item.intro}</p>
              <div className="mt-6 text-[11px] leading-6 text-[#8b8f94]">
                <p>Ger features & amenities</p>
                {item.details.map((detail) => (
                  <p key={detail}>{detail}</p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="narrow-container pb-24 text-center">
        <h2 className="page-title text-[19px]">Plan Map</h2>
        <Link href="/#book-now" className="green-outline mt-5">
          check availability
        </Link>
        <div className="relative mx-auto mt-10 aspect-square max-w-[680px] overflow-hidden">
          <Image src={img.map} alt="Maikhan Tolgoi plan map" fill loading="eager" className="object-contain" />
        </div>
        <p className="body-copy mx-auto mt-8 max-w-[360px]">
          Each accommodation type is designed to ensure a restful and memorable stay, combining comfort, nature, and
          culture for an unforgettable experience.
        </p>
      </section>
    </MainLayout>
  );
}
