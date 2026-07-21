import { notFound } from "next/navigation";

import { RichTextContent } from "@/components/cms-content";
import { MainLayout, PageHero } from "@/components/legacy-site";
import { prisma } from "@/lib/prisma";

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await prisma.service.findFirst({
    where: { slug, publishedAt: { not: null, lte: new Date() } },
    include: { image: true },
  });

  if (!service) notFound();

  return (
    <MainLayout>
      <PageHero image={service.image?.url || undefined} title={service.title} subtitle={service.excerpt || undefined} />
      <article className="narrow-container py-14 sm:py-20">
        <h1 className="page-title">{service.title}</h1>
        {service.excerpt ? <p className="body-copy mx-auto mt-8 max-w-[720px]">{service.excerpt}</p> : null}
        <div className="mx-auto mt-10 max-w-[760px]"><RichTextContent value={service.body} /></div>
      </article>
    </MainLayout>
  );
}
