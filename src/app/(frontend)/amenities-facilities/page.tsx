import { CmsPageSections, RichTextContent } from "@/components/cms-content";
import { MainLayout, PageHero } from "@/components/legacy-site";
import { SiteEmptyState } from "@/components/site-empty-state";
import { getCmsPage } from "@/lib/public-content";
import { connection } from "next/server";

export const dynamic = "force-dynamic";

export default async function AmenitiesPage() {
  await connection();

  const page = await getCmsPage("amenities-facilities");

  return (
    <MainLayout>
      <PageHero image={page?.heroImageUrl || undefined} title={page?.title || "Amenities & Facilities"} subtitle={page?.summary || undefined} />
      {page ? (
        page.sections.length > 0 ? (
          <CmsPageSections sections={page.sections} />
        ) : (
          <article className="narrow-container py-16"><RichTextContent value={page.body} /></article>
        )
      ) : (
        <section className="site-container py-20"><SiteEmptyState title="Amenities content missing" description="Amenities page content is not published in the CMS yet." /></section>
      )}
    </MainLayout>
  );
}
