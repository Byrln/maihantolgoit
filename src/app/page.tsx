import Image from "next/image";
import Link from "next/link";

import { ContactIcon, MainLayout, PageHero } from "@/components/legacy-site";
import { contact, gallery, img } from "@/lib/site-data";

export default function Home() {
  return (
    <MainLayout>
      <PageHero image={img.homeHero} logo tall />

      <section className="narrow-container py-14 text-center">
        <h1 className="page-title">Maikhan Tolgoi</h1>
        <p className="mt-5 text-[14px] font-light lowercase tracking-[0.09em] text-[#96999d]">tourist camp</p>
        <span className="thin-rule mx-auto mt-8" />
        <p className="body-copy mx-auto mt-8 max-w-[560px]">
          Situated within the untouched beauty of Khorgo-Terkh National Park, Maikhan Tolgoi tourist camp stands as a
          symbol of comfort amidst nature&apos;s splendor. It is located on the northern shore of Lake Tsagaan Nuur, has
          been continuously serving travelers and tourists since 2004. Offering stunning views of the surrounding
          landscape and convenient access to the park&apos;s natural attractions, Maikhan Tolgoi has gained recognition for
          its outstanding service, delightful cuisine, and peaceful atmosphere. This makes it a favorite destination for
          both international travelers and local visitors looking to explore the park&apos;s wonders.
        </p>
      </section>

      <section className="narrow-container pb-12 text-center">
        <h2 className="text-[15px] font-light text-[#595f65]">How to get to Maikhan Tolgoi camp?</h2>
        <p className="body-copy mx-auto mt-6 max-w-[620px]">
          Maikhan Tolgoi Tourist Camp was established is located 670 km from Ulaanbaatar,
          <br />
          15 km from the center of Tariat soum in Arkhangai province, on the northern shore of Lake Terkhiin Tsagaan.
        </p>
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          <ContactIcon type="pin" title="Head office" body={contact.headOffice} />
          <ContactIcon type="phone" title="Contact" body={`Tel: +976-${contact.phones[0]}; +976-${contact.phones[1]}`} />
          <ContactIcon type="mail" title="Email" body={contact.email} />
        </div>
      </section>

      <section id="book-now" className="narrow-container py-8">
        <div className="relative mx-auto h-[250px] max-w-[920px] overflow-hidden">
          <Image src={img.bookBanner} alt="Lake shore booking banner" fill loading="eager" className="object-cover" />
          <div className="absolute inset-0 bg-black/18" />
          <div className="absolute left-20 top-9 text-white">
            <Image src={img.logo} alt="Maikhan Tolgoi logo" width={70} height={60} />
            <h2 className="mt-5 max-w-[360px] text-[23px] font-light italic leading-9 tracking-[0.13em]">
              Book Your Stay at Maikhan Tolgoi
            </h2>
            <Link href={`mailto:${contact.email}`} className="green-outline mt-7 bg-white/90">
              book now
            </Link>
          </div>
        </div>
      </section>

      <section className="narrow-container py-8">
        <p className="body-copy mx-auto max-w-[690px]">
          We have prepared ger (yurt) for you, where you can enjoy the lake view from the inside and relax to the sound
          of the water. There are comfortable wooden houses that will not let you down even on rainy and cool days in the
          Khangai region. Our facility, built using modern German technology to purify wastewater, is a model for other
          resorts in the area, and we are also implementing many other environmentally friendly activities. If you want to
          choose the BEST COMFORT AND BEST LOCATION of Lake Tsagaan Nuur, visit us.
        </p>
      </section>

      <section className="site-container grid items-center gap-12 py-8 md:grid-cols-2">
        <div className="relative h-[220px] overflow-hidden">
          <Image src={img.review} alt="Guests at Maikhan Tolgoi" fill loading="eager" className="object-cover" />
        </div>
        <div className="text-center">
          <h2 className="section-title">Review</h2>
          <p className="mt-5 text-[9px] uppercase tracking-[0.12em] text-[#b1b3b6]">
            We are proud to provide our guests with an unforgettable experience. See what they say.
          </p>
        </div>
      </section>

      <section className="narrow-container py-10 text-center">
        <h2 className="section-title">Gallery</h2>
        <div className="mx-auto mt-10 grid max-w-[660px] grid-cols-3 gap-6">
          {gallery.map((src) => (
            <div key={src} className="relative aspect-square overflow-hidden">
              <Image src={src} alt="Maikhan Tolgoi gallery photo" fill loading="eager" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="narrow-container grid items-center gap-10 py-12 md:grid-cols-2">
        <div className="text-center">
          <Image src={img.logo} alt="Maikhan Tolgoi logo" width={60} height={52} className="mx-auto" />
          <p className="mt-4 text-[12px] lowercase tracking-[0.11em]">Maikhan tolgoi tourist camp</p>
          <p className="mt-2 text-[10px]">{contact.phones.join(", ")}</p>
          <div className="mx-auto mt-4 max-w-[260px] border border-[#222] px-4 py-2 text-[10px] lowercase tracking-[0.14em]">
            {contact.email}
          </div>
        </div>
        <MapPanel />
      </section>

      <section className="narrow-container py-8">
        <h2 className="text-center text-[16px] uppercase tracking-[0.15em] text-[#545960]">Explore Khorgo Volcano by Horse</h2>
        <div className="mx-auto mt-8 max-w-[660px] text-[11px] leading-7 text-[#63676d]">
          <p>Tour length: 16km</p>
          <p>Destination: Maikhan Tolgoi camp - Khorgo volcano</p>
          <p>📅 Time: Full-day trip</p>
          <p>💰 Price: 250,000 MNT (Includes horse rental & guide service)</p>
        </div>
        <div className="relative mx-auto mt-6 h-[260px] max-w-[660px] overflow-hidden">
          <Image src={img.horseTour} alt="Horse tour to Khorgo volcano" fill loading="eager" className="object-cover" />
        </div>
        <div className="mx-auto max-w-[660px] bg-[#f1f1f1] px-28 py-12 text-[11px] leading-7 text-[#666a70]">
          <h3 className="mb-5 text-[15px] font-light">Itinerary</h3>
          <p>09:00 - 09:10 - Safety briefing for the tour</p>
          <p>09:20 - Departure from the camp</p>
          <p>09:20 - 12:00 - Ride through breathtaking landscapes and arrive at Khorgo Volcano</p>
          <p>12:00 - 12:30 - Lunch break (boxed meal)</p>
          <p>12:40 - 14:00 - Hike up to Khorgo volcano and explore the area</p>
          <p>14:00 - 15:00 - Enjoy the panoramic views and capture stunning memories</p>
          <p>15:10 - Descend from the volcano and start the journey back to the camp</p>
          <p>17:30 - Arrival at the camp, time to relax</p>
          <Link href={`mailto:${contact.email}`} className="green-outline mt-7">
            book your tour now
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}

function MapPanel() {
  return (
    <div className="relative h-[190px] overflow-hidden bg-[#efe8dc]">
      <div className="absolute -left-10 top-0 h-64 w-72 rounded-full bg-[#8ed8e7]" />
      <div className="absolute right-0 top-0 h-full w-[62%] bg-[#f3ead9]" />
      <div className="absolute left-[45%] top-[38%]">
        <div className="relative flex flex-col items-center">
          <span className="flex size-7 items-center justify-center rounded-full bg-[#e04949] text-xs text-white">•</span>
          <span className="mt-1 text-[10px] font-semibold text-[#e0499a]">Maikhan Tolgoi tourist camp</span>
        </div>
      </div>
      <div className="absolute bottom-2 left-2 text-[9px] text-[#77a6b8]">Google</div>
    </div>
  );
}
