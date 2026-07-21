import { notFound } from "next/navigation";

import { RichTextContent } from "@/components/cms-content";
import { MainLayout, PageHero } from "@/components/legacy-site";
import { prisma } from "@/lib/prisma";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findFirst({
    where: { slug, publishedAt: { not: null, lte: new Date() } },
    include: { coverImage: true },
  });

  if (!post) notFound();

  return (
    <MainLayout>
      <PageHero image={post.coverImage?.url || undefined} title={post.title} subtitle={post.excerpt} />
      <article className="narrow-container py-14 sm:py-20">
        <p className="text-center text-xs font-semibold uppercase text-[#258542]">{post.category || "Travel"}</p>
        <h1 className="page-title mt-5">{post.title}</h1>
        <p className="body-copy mx-auto mt-8 max-w-[720px]">{post.excerpt}</p>
        <div className="mx-auto mt-10 max-w-[760px]"><RichTextContent value={post.body} /></div>
      </article>
    </MainLayout>
  );
}
