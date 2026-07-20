import Image from "next/image";

import { MainLayout, PageHero } from "@/components/legacy-site";
import { img, posts } from "@/lib/site-data";

export default function BlogPage() {
  return (
    <MainLayout>
      <PageHero image={img.lake} title="Blog" />
      <section className="narrow-container py-16 text-center">
        <h1 className="page-title">Blog</h1>
        <p className="body-copy mt-8">Travel notes, route ideas, and seasonal stories from Maikhan Tolgoi Tourist Camp.</p>
      </section>
      <section className="site-container grid gap-16 pb-24 md:grid-cols-3">
        {posts.map(([category, title, excerpt, image]) => (
          <article key={title}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={image} alt={title} fill loading="eager" className="object-cover" />
            </div>
            <p className="mt-7 text-[10px] uppercase tracking-[0.18em] text-[#7b8086]">{category}</p>
            <h2 className="mt-4 text-[18px] font-medium leading-7 tracking-[0.08em] text-[#4e5359]">{title}</h2>
            <span className="thin-rule mt-5" />
            <p className="body-copy mt-6 text-left">{excerpt}</p>
          </article>
        ))}
      </section>
    </MainLayout>
  );
}
