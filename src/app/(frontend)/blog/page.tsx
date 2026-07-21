import Image from "next/image";
import Link from "next/link";

import { CmsPageSections } from "@/components/cms-content";
import { MainLayout, PageHero } from "@/components/legacy-site";
import { SiteEmptyState } from "@/components/site-empty-state";
import { getCmsPage, getPublishedPosts } from "@/lib/public-content";
import { connection } from "next/server";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  await connection();

  const page = await getCmsPage("blog");
  const visiblePosts = await getPublishedPosts();

  return (
    <MainLayout>
      <PageHero image={page?.heroImageUrl || undefined} title={page?.title || "Blog"} subtitle={page?.summary || undefined} />
      {page?.sections.length ? <CmsPageSections sections={page.sections} /> : null}
      <section className="site-container pb-24">
        {visiblePosts.length === 0 ? (
          <SiteEmptyState
            actionHref="/#book-now"
            actionLabel="plan your stay"
            description="New travel notes and seasonal stories are being prepared. For route help or trip planning, contact the camp directly."
            title="No blog posts yet"
          />
        ) : (
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <article>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {post.coverImage?.url ? <Image src={post.coverImage.url} alt={post.coverImage.alt || post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" /> : <div className="h-full bg-[#e8eee9]" />}
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase text-[#258542]">{post.category || "Travel"}</p>
                  <h2 className="mt-3 text-xl font-semibold leading-8 text-[#3f4943] transition group-hover:text-[#258542]">
                    {post.title}
                  </h2>
                  <span className="thin-rule mt-5" />
                  <p className="body-copy mt-6 text-left">{post.excerpt}</p>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
}
