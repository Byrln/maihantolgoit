import Image from "next/image";
import Link from "next/link";

import { CmsPageSections } from "@/components/cms-content";
import { MainLayout, PageHero } from "@/components/legacy-site";
import { SiteEmptyState } from "@/components/site-empty-state";
import { getCmsPage, getPublishedServices } from "@/lib/public-content";
import { editorText } from "@/lib/cms";
import { connection } from "next/server";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  await connection();

  const page = await getCmsPage("services");
  const visibleServices = await getPublishedServices();

  return (
    <MainLayout>
      <PageHero image={page?.heroImageUrl || undefined} title={page?.title || "Services"} subtitle={page?.summary || undefined} />
      {page?.sections.length ? <CmsPageSections sections={page.sections} /> : null}
      <section className="site-container pb-24">
        {visibleServices.length === 0 ? (
          <SiteEmptyState
            actionHref="/#book-now"
            actionLabel="contact camp"
            description="Service details are being updated. Our team can still help with accommodation, meals, and local activities."
            title="No services listed yet"
          />
        ) : (
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {visibleServices.map((service) => (
              <Link key={service.id} href={`/services/${service.slug}`} className="group block text-center">
                <article>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {service.image?.url ? <Image src={service.image.url} alt={service.image.alt || service.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" /> : <div className="h-full bg-[#e8eee9]" />}
                  </div>
                  <h2 className="mt-7 text-xl font-semibold leading-8 text-[#3f4943] transition group-hover:text-[#258542]">
                    {service.title}
                  </h2>
                  <span className="thin-rule mx-auto mt-5" />
                  <p className="body-copy mt-6">{service.excerpt || editorText(service.body) || "Service details will be added soon."}</p>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
}
