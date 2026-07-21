import { CmsPageSections, RichTextContent } from "@/components/cms-content";
import { MainLayout, PageHero } from "@/components/legacy-site";
import { SiteEmptyState } from "@/components/site-empty-state";
import { getCmsPage } from "@/lib/public-content";

export default async function HomePage() {
  const page = await getCmsPage("home");

  return (
    <MainLayout>
      <PageHero image={page?.heroImageUrl || undefined} title={page?.title || "Maikhan Tolgoi"} subtitle={page?.summary || undefined} logo align="left" />
      {page ? (
        page.sections.length > 0 ? (
          <CmsPageSections sections={page.sections} />
        ) : (
          <article className="narrow-container py-16">
            <RichTextContent value={page.body} />
          </article>
        )
      ) : (
        <section className="site-container py-20">
          <SiteEmptyState title="Home page is being prepared" description="The camp website content will be available here soon." />
        </section>
      )}
    </MainLayout>
  );
}
