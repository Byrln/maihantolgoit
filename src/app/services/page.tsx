import Image from "next/image";

import { MainLayout, PageHero } from "@/components/legacy-site";
import { img } from "@/lib/site-data";

const services = [
  ["Stay Planning", "Choose the right ger, dome, or wooden cabin for your group size, season, and preferred comfort level.", img.accommodationHero],
  ["Guided Day Trips", "Arrange horse routes, Khorgo Volcano trips, boating, fishing, herder family visits, and lake activities.", img.horseTour],
  ["Meals and Camp Hosting", "Enjoy Mongolian food services, khorkhog, barbecue nights, breakfast, and group dining support.", img.dining],
];

export default function ServicesPage() {
  return (
    <MainLayout>
      <PageHero image={img.footer} title="Services" />
      <section className="narrow-container py-16 text-center">
        <h1 className="page-title">Services</h1>
        <p className="body-copy mt-8">
          We support travelers, families, groups, and tour operators with accommodation, meals, outdoor experiences, and
          practical camp services at Terkhiin Tsagaan Lake.
        </p>
      </section>
      <section className="site-container grid gap-16 pb-24 md:grid-cols-3">
        {services.map(([title, body, image]) => (
          <article key={title} className="text-center">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={image} alt={title} fill loading="eager" className="object-cover" />
            </div>
            <h2 className="mt-8 text-[17px] font-medium uppercase tracking-[0.13em] text-[#555a60]">{title}</h2>
            <span className="thin-rule mx-auto mt-5" />
            <p className="body-copy mt-6">{body}</p>
          </article>
        ))}
      </section>
    </MainLayout>
  );
}
