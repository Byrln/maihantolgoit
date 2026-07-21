import Link from "next/link";
import { BedDouble, FileText, ImageIcon, Layers3, ListTree, PanelsTopLeft, Plus, Sparkles } from "lucide-react";

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
    <main className="flex flex-1 flex-col gap-6 bg-[linear-gradient(180deg,_rgba(16,185,129,0.08),_transparent_280px)] p-6">
      <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
        <div className="grid gap-6 bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.34),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.24),_transparent_32%),linear-gradient(135deg,_#064e3b,_#0f172a)] p-6 text-white md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-medium text-emerald-50">
              <Sparkles className="size-3.5" />
              Майхан Толгой агуулгын төв
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">Хянах самбар</h1>
            <p className="mt-2 text-sm leading-6 text-emerald-50/85">
              Блог, үйлчилгээ, зураг болон хэрэглэгчийн бүртгэлээ нэг газраас удирдана.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild className="bg-white text-slate-950 hover:bg-emerald-50">
              <Link href="/admin/posts/new">
                <Plus />
                Блог нэмэх
              </Link>
            </Button>
            <Button asChild className="border-white/30 bg-white/10 text-white hover:bg-white/20" variant="outline">
              <Link href="/admin/services/new">Үйлчилгээ нэмэх</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Өнөөдрийн байдал</h2>
          <p className="text-sm text-muted-foreground">URL нэр, эрэмбэ, зургийн холбоос бичихгүйгээр вэбсайтын агуулгаа удирдана.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <StatCard accent="bg-violet-500/12 text-violet-700" icon={PanelsTopLeft} label="Хуудас" value={pages} href="/admin/pages" />
        <StatCard accent="bg-lime-500/12 text-lime-700" icon={BedDouble} label="Байр" value={accommodations} href="/admin/accommodations" />
        <StatCard accent="bg-sky-500/12 text-sky-700" icon={FileText} label="Блог" value={posts} href="/admin/posts" />
        <StatCard accent="bg-emerald-500/12 text-emerald-700" icon={Layers3} label="Үйлчилгээ" value={services} href="/admin/services" />
        <StatCard accent="bg-amber-500/14 text-amber-700" icon={ImageIcon} label="Зураг" value={media} href="/admin/media" />
        <StatCard accent="bg-rose-500/12 text-rose-700" icon={ListTree} label="Цэс" value={navLinks} href="/admin/navigation" />
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

      <Card className="border-primary/10 bg-gradient-to-br from-white to-emerald-50/60">
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

function StatCard({
  href,
  icon: Icon,
  label,
  value,
  accent,
}: {
  accent: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <Link href={href}>
      <Card className="transition hover:-translate-y-0.5 hover:shadow-md">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
          </div>
          <div className={`flex size-11 items-center justify-center rounded-lg ${accent}`}>
            <Icon className="size-5" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
