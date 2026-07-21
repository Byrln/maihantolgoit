import { ArrowUpRight, BedDouble, FileText, ImageIcon, Layers3, ListTree, PanelsTopLeft, Plus, Sparkles } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const [posts, services, media, pages, navLinks, accommodations] = await Promise.all([
    prisma.post.count(),
    prisma.service.count(),
    prisma.media.count(),
    prisma.page.count(),
    prisma.navLink.count(),
    prisma.accommodation.count(),
  ]);
  const hasNoContent = posts === 0 && services === 0 && media === 0 && pages === 0;

  return (
    <main className="flex flex-1 flex-col gap-6 bg-[#f6f8f7] p-4 sm:p-6">
      <div className="overflow-hidden rounded-md border bg-card shadow-sm">
        <div className="grid gap-6 border-b bg-white p-5 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-md border bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">
              <Sparkles className="size-3.5" />
              Maikhan Tolgoi
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Хянах самбар</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Хуудас, байр, үйлчилгээ, блог болон медиа сангийн төлөвийг нэг дороос удирдана.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/admin/pages/new">
                <Plus />
                Хуудас нэмэх
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/posts/new">
                <Plus />
                Блог нэмэх
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid gap-px bg-border md:grid-cols-4">
          <QuickLink href="/admin/media" label="Медиа upload" />
          <QuickLink href="/admin/navigation" label="Цэс засах" />
          <QuickLink href="/admin/accommodations" label="Байр удирдах" />
          <QuickLink href="/" label="Сайт харах" external />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Өнөөдрийн байдал</h2>
          <p className="text-sm text-muted-foreground">URL нэр, эрэмбэ, зургийн холбоос бичихгүйгээр вэбсайтын агуулгаа удирдана.</p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <StatCard icon={PanelsTopLeft} label="Хуудас" value={pages} href="/admin/pages" helper="Нүүр, about, service landing" />
        <StatCard icon={BedDouble} label="Байр" value={accommodations} href="/admin/accommodations" helper="Ger, dome, cabin төрлүүд" />
        <StatCard icon={FileText} label="Блог" value={posts} href="/admin/posts" helper="Мэдээ, аяллын тэмдэглэл" />
        <StatCard icon={Layers3} label="Үйлчилгээ" value={services} href="/admin/services" helper="Camp service cards" />
        <StatCard icon={ImageIcon} label="Медиа" value={media} href="/admin/media" helper="Зураг болон видео сан" />
        <StatCard icon={ListTree} label="Цэс" value={navLinks} href="/admin/navigation" helper="Header navigation" />
      </div>

      {hasNoContent ? (
        <Card className="border-dashed bg-white/80">
          <CardContent className="grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">CMS хоосон байна</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Эхлээд зураг upload хийгээд дараа нь блог, үйлчилгээний агуулгаа нэмбэл редактороос зураг сонгоход амар болно.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline">
                <Link href="/admin/media">Зураг upload хийх</Link>
              </Button>
              <Button asChild>
                <Link href="/admin/posts/new">Блог нэмэх</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <Card className="border-primary/10 bg-white">
        <CardHeader>
          <CardTitle>Редакторын ажиллагаа</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <Badge variant="secondary">URL нэр автоматаар үүснэ</Badge>
          <Badge variant="secondary">Үйлчилгээний эрэмбэ автомат</Badge>
          <Badge variant="secondary">Зураг upload хийнэ</Badge>
          <Badge variant="secondary">Агуулга Tiptap editor ашиглана</Badge>
        </CardContent>
      </Card>
    </main>
  );
}

function QuickLink({ external, href, label }: { external?: boolean; href: string; label: string }) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      className="flex items-center justify-between bg-white px-4 py-3 text-sm font-medium text-foreground transition hover:bg-emerald-50"
    >
      {label}
      <ArrowUpRight className="size-4 text-muted-foreground" />
    </Link>
  );
}

function StatCard({
  href,
  icon: Icon,
  label,
  value,
  helper,
}: {
  href: string;
  helper: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <Link href={href}>
      <Card className="border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
        <CardContent className="flex items-start justify-between gap-4 p-5">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{helper}</p>
          </div>
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
            <Icon className="size-5" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
