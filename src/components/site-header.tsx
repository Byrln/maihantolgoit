"use client";

import { ChevronDown, Mail, Menu, Phone, TentTree } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type HeaderLink = { label: string; href: string };
type HeaderItem = { title: string; slug: string };

export function SiteHeader({
  email,
  links,
  logo,
  phone,
  posts,
  services,
}: {
  email: string;
  links: HeaderLink[];
  logo: string;
  phone: string;
  posts: HeaderItem[];
  services: { title: string; slug: string | null }[];
}) {
  const bookLink = links.find((link) => /book/i.test(link.label) || link.href.includes("booking.maikhantolgoi"));
  const mainLinks = links.filter((link) => link !== bookLink);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-[#dce5df] bg-white/96 backdrop-blur-md">
      <div className="hidden border-b border-[#e7ece8] bg-[#f5f8f6] lg:block">
        <div className="site-container flex h-8 items-center justify-between text-[11px] font-medium text-[#5c6860]">
          <p>Khorgo-Terkh National Park, Mongolia</p>
          <div className="flex items-center gap-5">
            <a href={`mailto:${email}`} className="inline-flex items-center gap-1.5 hover:text-[#087b32]"><Mail className="size-3.5" />{email}</a>
            <a href={`tel:${phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-[#087b32]"><Phone className="size-3.5" />{phone}</a>
          </div>
        </div>
      </div>
      <div className="site-container flex h-[70px] items-center gap-5 lg:h-[76px]">
        <Link href="/" className="flex shrink-0 items-center gap-3 text-[#173d27]" aria-label="Maikhan Tolgoi home">
          <Image src={logo} alt="Maikhan Tolgoi logo" width={46} height={42} priority className="h-11 w-auto" />
          <span className="hidden min-[1180px]:block">
            <span className="block text-[13px] font-bold uppercase leading-4">Maikhan Tolgoi</span>
            <span className="block text-[10px] font-medium uppercase text-[#6f7a73]">Tourist Camp</span>
          </span>
        </Link>

        <nav className="ml-auto hidden min-w-0 items-center justify-end gap-1 lg:flex" aria-label="Primary navigation">
          {mainLinks.map((item) => (
            <DesktopNavItem key={`${item.label}-${item.href}`} item={item} posts={posts} services={services} />
          ))}
        </nav>

        {bookLink ? (
          <Button asChild className="ml-1 hidden shrink-0 bg-[#087b32] px-5 text-white hover:bg-[#056728] lg:inline-flex">
            <Link href={bookLink.href}>{bookLink.label}</Link>
          </Button>
        ) : null}

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          {bookLink ? (
            <Button asChild size="sm" className="bg-[#087b32] text-white hover:bg-[#056728]">
              <Link href={bookLink.href}>Book now</Link>
            </Button>
          ) : null}
          <Sheet>
            <SheetTrigger asChild>
              <Button aria-label="Open menu" size="icon" variant="outline"><Menu /></Button>
            </SheetTrigger>
            <SheetContent className="w-[88vw] bg-white sm:max-w-[380px]">
              <SheetHeader className="border-b px-5 py-5">
                <SheetTitle className="flex items-center gap-3 text-[#173d27]">
                  <Image src={logo} alt="Maikhan Tolgoi logo" width={40} height={36} className="h-10 w-auto" />
                  <span>Maikhan Tolgoi</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col overflow-y-auto px-3 pb-5" aria-label="Mobile navigation">
                {mainLinks.map((item) => (
                  <MobileNavItem key={`${item.label}-${item.href}`} item={item} posts={posts} services={services} />
                ))}
              </nav>
              <div className="mt-auto border-t bg-[#f5f8f6] p-5 text-sm text-[#5c6860]">
                <a href={`tel:${phone.replace(/\D/g, "")}`} className="flex items-center gap-2 py-1"><Phone className="size-4" />{phone}</a>
                <a href={`mailto:${email}`} className="mt-2 flex min-w-0 items-center gap-2 break-all py-1"><Mail className="size-4 shrink-0" />{email}</a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function dropdownFor(item: HeaderLink, posts: HeaderItem[], services: { title: string; slug: string | null }[]) {
  const normalized = item.href.replace(/\/$/, "") || "/";
  const serviceItems = services.filter((service): service is HeaderItem => Boolean(service.slug));

  if (normalized === "/services" && serviceItems.length > 0 && serviceItems.length <= 5) {
    return serviceItems.map((service) => ({ label: service.title, href: `/services/${service.slug}` }));
  }

  if (normalized === "/blog" && posts.length > 0 && posts.length <= 5) {
    return posts.map((post) => ({ label: post.title, href: `/blog/${post.slug}` }));
  }

  return [];
}

function DesktopNavItem({ item, posts, services }: { item: HeaderLink; posts: HeaderItem[]; services: { title: string; slug: string | null }[] }) {
  const dropdown = dropdownFor(item, posts, services);

  if (dropdown.length === 0) {
    return <Link href={item.href} className="whitespace-nowrap rounded-md px-3 py-2 text-[12px] font-semibold text-[#465149] transition hover:bg-[#f0f5f1] hover:text-[#087b32]">{item.label}</Link>;
  }

  return (
    <div className="group relative">
      <Link href={item.href} className="inline-flex whitespace-nowrap items-center gap-1 rounded-md px-3 py-2 text-[12px] font-semibold text-[#465149] transition hover:bg-[#f0f5f1] hover:text-[#087b32]">
        {item.label}<ChevronDown className="size-3.5 transition group-hover:rotate-180" />
      </Link>
      <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="overflow-hidden rounded-md border border-[#dce5df] bg-white p-2 shadow-[0_18px_50px_rgba(32,61,43,0.14)]">
          {dropdown.map((link) => (
            <Link key={link.href} href={link.href} className="block rounded px-3 py-2.5 text-sm leading-5 text-[#536058] hover:bg-[#eef5f0] hover:text-[#087b32]">{link.label}</Link>
          ))}
          <Link href={item.href} className="mt-1 flex items-center gap-2 border-t border-[#e5ebe7] px-3 pt-3 text-xs font-semibold text-[#087b32]"><TentTree className="size-4" />Бүгдийг харах</Link>
        </div>
      </div>
    </div>
  );
}

function MobileNavItem({ item, posts, services }: { item: HeaderLink; posts: HeaderItem[]; services: { title: string; slug: string | null }[] }) {
  const dropdown = dropdownFor(item, posts, services);

  if (dropdown.length === 0) {
    return <SheetClose asChild><Link href={item.href} className="border-b px-3 py-4 text-base font-semibold text-[#34423a]">{item.label}</Link></SheetClose>;
  }

  return (
    <details className="border-b">
      <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-4 text-base font-semibold text-[#34423a]">{item.label}<ChevronDown className="size-4" /></summary>
      <div className="grid gap-1 pb-3 pl-3">
        {dropdown.map((link) => <SheetClose key={link.href} asChild><Link href={link.href} className="rounded px-3 py-2.5 text-sm text-[#5b675f] hover:bg-[#eef5f0]">{link.label}</Link></SheetClose>)}
        <SheetClose asChild><Link href={item.href} className="rounded px-3 py-2.5 text-sm font-semibold text-[#087b32]">Бүгдийг харах</Link></SheetClose>
      </div>
    </details>
  );
}
