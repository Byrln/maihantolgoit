import { notFound } from "next/navigation";

import { CmsPageSections, RichTextContent } from "@/components/cms-content";
import { MainLayout, PageHero } from "@/components/legacy-site";
import { getCmsPage } from "@/lib/public-content";

export default async function CmsPublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getCmsPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <MainLayout>
      <PageHero image={page.heroImageUrl || undefined} title={page.title} subtitle={page.summary || undefined} />
      {page.sections.length > 0 ? <CmsPageSections sections={page.sections} /> : <article className="narrow-container py-16"><RichTextContent value={page.body} /></article>}
    </MainLayout>
  );
}
