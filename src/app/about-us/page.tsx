import Image from "next/image";

import { MainLayout, PageHero } from "@/components/legacy-site";
import { img, team } from "@/lib/site-data";

export default function AboutPage() {
  return (
    <MainLayout>
      <PageHero image={img.aboutHero} title={"Maikhan Tolgoi\nTourist Camp"} logo align="left" />
      <section className="site-container grid gap-20 py-24 lg:grid-cols-2 lg:items-start">
        <div className="relative mx-auto aspect-[3/2] w-full max-w-[620px] overflow-hidden">
          <Image src={img.aboutIntro} alt="Maikhan Tolgoi sign" fill loading="eager" className="object-cover" />
        </div>
        <div className="mx-auto max-w-[560px]">
          <h1 className="page-title">About Us</h1>
          <p className="body-copy mt-8">
            In summer of 2004, the founders of the company, while traveling across our homeland with family, they camped
            on the northern shore of Terkhiin Tsagaan Lake in a beautiful place called &quot;Maikhan Tolgoi.&quot; Captivated
            by the breathtaking scenery and serene atmosphere, we realized that this was the perfect location for a
            tourist camp. That is how Maikhan Tolgoi Tourist Camp was founded.
          </p>
          <p className="body-copy mt-8">
            We prioritize the comfort and needs of our guests while operating in an eco-friendly and sustainable manner.
            From responsible energy and water use to waste sorting and disposal, we are committed to preserving the
            natural beauty of our surroundings. What sets our camp apart is not only the stunning landscape but also our
            high-quality professional service. To ensure an exceptional experience for our guests, 80% of our staff are
            skilled professionals in the tourism and hospitality industry. Our dedication has been recognized over the
            years, earning us the &quot;Two Flowers&quot; service rating in 2008 and the &quot;Eco-Ambassador&quot; award of
            Arkhangai province in 2019. Maikhan Tolgoi - A perfect retreat in harmony with nature!
          </p>
        </div>
      </section>
      <section className="site-container pb-28">
        <h2 className="mb-20 text-[15px] uppercase tracking-[0.15em] text-[#454b52]">Our team</h2>
        <div className="grid gap-x-20 gap-y-24 md:grid-cols-3">
          {team.map(([name, role, src]) => (
            <article key={name}>
              <div className="relative aspect-[1.25/1] overflow-hidden">
                <Image src={src} alt={name} fill loading="eager" className="object-cover" />
              </div>
              <h3 className="mt-7 text-[15px] font-medium uppercase tracking-[0.14em] text-[#4e5359]">{name}</h3>
              <span className="thin-rule mt-4" />
              <p className="mt-5 text-[11px] text-[#666b70]">{role}</p>
            </article>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
