import Image from "next/image";

import { CmsPageSections, RichTextContent } from "@/components/cms-content";
import { MainLayout, PageHero } from "@/components/legacy-site";
import { SiteEmptyState } from "@/components/site-empty-state";
import { stringList } from "@/lib/cms";
import { getAccommodations, getCmsPage } from "@/lib/public-content";
import { connection } from "next/server";

export const dynamic = "force-dynamic";

export default async function AccommodationPage() {
  await connection();

  const page = await getCmsPage("accommodation");
  const accommodations = await getAccommodations();
  const featuredAccommodation = accommodations[0];

  return (
    <MainLayout>
      <PageHero
        image={page?.heroImageUrl || featuredAccommodation?.image?.url || undefined}
        title={page?.title || featuredAccommodation?.title || "Accommodation"}
        subtitle={page?.summary || featuredAccommodation?.summary || "Accommodation details are being prepared for the coming season."}
        align="left"
      />
      {page?.sections.length ? <CmsPageSections sections={page.sections} /> : page?.body ? <article className="narrow-container py-14"><RichTextContent value={page.body} /></article> : null}
      <section className="site-container space-y-14 pb-20 sm:space-y-20">
        {accommodations.length === 0 ? (
          <SiteEmptyState
            actionHref="/#book-now"
            actionLabel="check availability"
            description="Accommodation options are being refreshed. Please contact the camp for current ger, dome, and cabin availability."
            title="No accommodation listed yet"
          />
        ) : (
          accommodations.map((item, index) => {
            const details = stringList(item.details);

            return (
              <article key={item.id} className="grid items-center gap-8 sm:gap-12 md:grid-cols-2">
                <div className={`relative aspect-[4/3] overflow-hidden ${index % 2 ? "md:order-2" : ""}`}>
                  {item.image?.url ? <Image src={item.image.url} alt={item.image.alt || item.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /> : null}
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold leading-tight text-[#414944]">{item.title}</h2>
                  <p className="mx-auto mt-5 max-w-[520px] text-sm leading-7 text-[#555f59]">{item.summary}</p>
                  <div className="mt-6 text-sm leading-7 text-[#7b847f]">
                    <p>Ger features & amenities</p>
                    {details.length === 0 ? (
                      <p>Details will be added soon.</p>
                    ) : (
                      details.map((detail) => <p key={detail}>{detail}</p>)
                    )}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </MainLayout>
  );
}
