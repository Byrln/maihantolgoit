import { prisma } from "@/lib/prisma";
import { editorText, parsePageSections } from "@/lib/cms";

export const defaultNavLinks = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about-us" },
  { label: "Accommodation", href: "/accommodation" },
  { label: "Amenities & Facilities", href: "/amenities-facilities" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Book now", href: "http://booking.maikhantolgoi.mn/room-rates?arrivalDate=&departureDate=" },
];

export async function getHeaderContent() {
  const [customLinks, posts, services] = await Promise.all([
    prisma.navLink.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      select: { label: true, href: true },
    }),
    prisma.post.findMany({
      where: { publishedAt: { not: null, lte: new Date() } },
      orderBy: { publishedAt: "desc" },
      take: 6,
      select: { title: true, slug: true },
    }),
    prisma.service.findMany({
      where: { publishedAt: { not: null, lte: new Date() }, slug: { not: null } },
      orderBy: { publishedAt: "desc" },
      take: 6,
      select: { title: true, slug: true },
    }),
  ]);

  return {
    links: customLinks.length > 0 ? customLinks : defaultNavLinks,
    posts,
    services,
  };
}

export async function getCmsPage(slug: string) {
  const page = await prisma.page.findUnique({
    where: { slug },
    include: { heroImage: true },
  });

  if (!page) {
    return null;
  }

  return {
    ...page,
    bodyText: editorText(page.body),
    sections: parsePageSections(page.sections),
    heroImageUrl: page.heroImage?.url || null,
  };
}

export async function getPublishedPosts() {
  return prisma.post.findMany({
    where: { publishedAt: { not: null, lte: new Date() } },
    orderBy: { publishedAt: "desc" },
    include: { coverImage: true },
  });
}

export async function getPublishedServices() {
  return prisma.service.findMany({
    where: { publishedAt: { not: null, lte: new Date() }, slug: { not: null } },
    orderBy: { publishedAt: "desc" },
    include: { image: true },
  });
}

export async function getAccommodations() {
  return prisma.accommodation.findMany({
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    include: { image: true },
  });
}
