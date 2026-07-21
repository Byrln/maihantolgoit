import type { MetadataRoute } from "next";
import { connection } from "next/server";

import { prisma } from "@/lib/prisma";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maikhantolgoi.mn";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();

  const [posts, services, pages] = await Promise.all([
    prisma.post.findMany({
      where: { publishedAt: { not: null, lte: new Date() } },
      select: { slug: true, updatedAt: true },
    }),
    prisma.service.findMany({
      where: { publishedAt: { not: null, lte: new Date() }, slug: { not: null } },
      select: { slug: true, updatedAt: true },
    }),
    prisma.page.findMany({
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = ["/", "/about-us", "/accommodation", "/amenities-facilities", "/services", "/blog"].map(
    (route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: route === "/" ? 1 : 0.8,
    }),
  );

  return [
    ...staticRoutes,
    ...pages.map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified: page.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...services
      .filter((service): service is { slug: string; updatedAt: Date } => Boolean(service.slug))
      .map((service) => ({
        url: `${siteUrl}/services/${service.slug}`,
        lastModified: service.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  ];
}
