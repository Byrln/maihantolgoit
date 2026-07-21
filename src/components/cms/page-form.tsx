"use client";

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Code2, CopyPlus, Eye, ImageIcon, Laptop, Plus, Smartphone, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { savePage } from "@/app/admin/actions";
import { CmsPageSections } from "@/components/cms-content";
import { MediaPickerDialog } from "@/components/cms/media-picker-dialog";
import { SubmitButton } from "@/components/cms/submit-button";
import { TourWizard } from "@/components/cms/tour-wizard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { emptyEditorContent, parsePageSections, type PageSection, type PageSectionItem } from "@/lib/cms";
import { isVideoUrl, mediaAccept } from "@/lib/media";
import { cn } from "@/lib/utils";

type BuilderPage = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  body: unknown;
  sections: unknown;
  heroImageId: string | null;
  heroImage?: { id: string; url: string; alt: string } | null;
};

type PageFormProps = {
  page?: BuilderPage | null;
};

const sectionLabels: Record<PageSection["type"], string> = {
  text: "Текст",
  imageText: "Зураг + текст",
  gallery: "Картын жагсаалт",
  feature: "Том зурагтай хэсэг",
  html: "HTML",
};

export function PageForm({ page }: PageFormProps) {
  const initialSections = useMemo(() => parsePageSections(page?.sections), [page?.sections]);
  const [title, setTitle] = useState(page?.title || "");
  const [slug, setSlug] = useState(page?.slug || "");
  const [summary, setSummary] = useState(page?.summary || "");
  const [sections, setSections] = useState<PageSection[]>(initialSections);
  const [selectedId, setSelectedId] = useState(initialSections[0]?.id || "");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [hero, setHero] = useState({
    id: page?.heroImage?.id || page?.heroImageId || "",
    url: page?.heroImage?.url || "",
    alt: page?.heroImage?.alt || page?.title || "",
  });
  const [heroFileUrl, setHeroFileUrl] = useState("");
  const selected = sections.find((section) => section.id === selectedId) || null;

  useEffect(() => {
    return () => {
      if (heroFileUrl) URL.revokeObjectURL(heroFileUrl);
    };
  }, [heroFileUrl]);

  const updateSection = (changes: Partial<PageSection>) => {
    setSections((items) => items.map((section) => (section.id === selectedId ? { ...section, ...changes } : section)));
  };

  const addSection = (type: PageSection["type"]) => {
    const id = crypto.randomUUID();
    const next: PageSection = {
      id,
      type,
      title: sectionLabels[type],
      body: "",
      html: type === "html" ? "<div>\n  \n</div>" : undefined,
      imagePosition: "left",
      items: type === "gallery" ? [] : undefined,
    };
    setSections((items) => [...items, next]);
    setSelectedId(id);
  };

  const moveSection = (direction: -1 | 1) => {
    setSections((items) => {
      const index = items.findIndex((section) => section.id === selectedId);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= items.length) return items;
      const next = [...items];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const removeSection = () => {
    setSections((items) => {
      const index = items.findIndex((section) => section.id === selectedId);
      const next = items.filter((section) => section.id !== selectedId);
      setSelectedId(next[Math.max(0, index - 1)]?.id || "");
      return next;
    });
  };

  const duplicateSection = () => {
    if (!selected) return;
    const id = crypto.randomUUID();
    const duplicate: PageSection = {
      ...selected,
      id,
      title: `${selected.title} хуулбар`,
      items: selected.items?.map((item) => ({ ...item, id: crypto.randomUUID() })),
    };
    setSections((items) => {
      const index = items.findIndex((section) => section.id === selectedId);
      const next = [...items];
      next.splice(index + 1, 0, duplicate);
      return next;
    });
    setSelectedId(id);
  };

  const updateGalleryItem = (id: string, changes: Partial<PageSectionItem>) => {
    if (!selected) return;
    updateSection({ items: (selected.items || []).map((item) => (item.id === id ? { ...item, ...changes } : item)) });
  };

  const addGalleryItem = () => {
    if (!selected) return;
    updateSection({
      items: [...(selected.items || []), { id: crypto.randomUUID(), title: "Шинэ карт", subtitle: "", body: "" }],
    });
  };

  const heroPreview = heroFileUrl || hero.url;

  return (
    <form action={savePage} className="grid gap-5">
      <input name="id" type="hidden" value={page?.id || ""} />
      <input name="body" type="hidden" value={JSON.stringify(page?.body || emptyEditorContent)} readOnly />
      <input name="sections" type="hidden" value={JSON.stringify(sections)} readOnly />
      <input name="heroImageId" type="hidden" value={hero.id} readOnly />

      <div className="sticky top-14 z-30 flex flex-wrap items-center justify-between gap-3 border-b bg-background/95 px-1 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="ghost">
            <Link href="/admin/pages"><ArrowLeft />Буцах</Link>
          </Button>
          <TourWizard
            storageKey="page-builder"
            steps={[
              {
                selectorId: "page-basic-info",
                title: "Үндсэн мэдээлэл",
                body: "Гарчиг, тайлбар, вэб хаяг, нүүр зургийг энд засна. Эдгээр нь хуудасны дээд cover хэсэгт харагдана.",
              },
              {
                selectorId: "page-section-list",
                title: "Хуудасны хэсгүүд",
                body: "Текст, зурагтай хэсэг, картын жагсаалт, том зурагтай хэсгийг нэмээд дарааллыг дээш доош зөөж болно.",
              },
              {
                selectorId: "page-section-editor",
                title: "Сонгосон хэсгийг засах",
                body: "Зүүн жагсаалтаас хэсэг сонгоход хажуугийн засварлах самбарт тухайн хэсгийн гарчиг, тайлбар, зураг, HTML болон картууд гарна.",
              },
              {
                selectorId: "page-live-preview",
                title: "Preview гүйлгэх",
                body: "Баруун талын preview нь тусдаа гүйлгэнэ. Desktop болон утасны товчоор харагдацаа сольж шалгаарай.",
                position: "left",
              },
            ]}
          />
          {page ? (
            <Button asChild size="sm" variant="outline">
              <Link href={page.slug === "home" ? "/" : `/${page.slug}`} target="_blank"><Eye />Вэб дээр харах</Link>
            </Button>
          ) : null}
        </div>
        <SubmitButton pendingLabel="Хадгалж байна...">Хуудсыг хадгалах</SubmitButton>
      </div>

      <div className="grid min-w-0 gap-5 xl:grid-cols-[320px_420px_minmax(0,1fr)]">
        <div className="grid min-w-0 content-start gap-4">
          <Card id="page-basic-info">
            <CardHeader>
              <CardTitle>Хуудасны үндсэн мэдээлэл</CardTitle>
              <p className="text-sm leading-6 text-muted-foreground">Энэ хэсэг хуудасны дээд cover, гарчиг, URL хаягийг удирдана.</p>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Хуудасны гарчиг</Label>
                <Input id="title" name="title" required value={title} onChange={(event) => setTitle(event.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="summary">Дээд хэсгийн тайлбар</Label>
                <Textarea id="summary" name="summary" value={summary} rows={4} onChange={(event) => setSummary(event.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Вэб хаяг</Label>
                <div className="flex items-center rounded-md border bg-muted/30 pl-3 focus-within:ring-2 focus-within:ring-ring">
                  <span className="text-sm text-muted-foreground">/</span>
                  <Input id="slug" name="slug" required value={slug} onChange={(event) => setSlug(event.target.value)} className="border-0 bg-transparent shadow-none focus-visible:ring-0" placeholder="about-us" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="heroImage">Нүүр зураг</Label>
                {heroPreview ? (
                  <div className="relative aspect-[16/8] overflow-hidden rounded-md border bg-muted">
                    <MediaPreview url={heroPreview} alt={hero.alt || title} />
                  </div>
                ) : (
                  <div className="grid aspect-[16/8] place-items-center rounded-md border border-dashed bg-muted/30 text-muted-foreground"><ImageIcon /></div>
                )}
                <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                  <MediaPickerDialog currentUrl={hero.url} triggerLabel="Сангаас сонгох" onSelect={(item) => setHero(item)} />
                  <Input
                    id="heroImage"
                    name="heroImage"
                    type="file"
                    accept={mediaAccept}
                    onChange={(event) => {
                      if (heroFileUrl) URL.revokeObjectURL(heroFileUrl);
                      const file = event.target.files?.[0];
                      setHeroFileUrl(file ? URL.createObjectURL(file) : "");
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card id="page-section-list">
            <CardHeader>
              <CardTitle>Хуудасны хэсгүүд</CardTitle>
              <p className="text-sm leading-6 text-muted-foreground">Доорх жагсаалтаас хэсэг сонгоод, дараа нь дэлгэрэнгүй засна.</p>
            </CardHeader>
            <CardContent className="grid gap-3">
              {sections.length === 0 ? <p className="rounded-md border border-dashed p-4 text-sm leading-6 text-muted-foreground">Доорх төрлөөс сонгож эхний хэсгээ нэмнэ үү.</p> : null}
              <div className="grid gap-2">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setSelectedId(section.id)}
                    className={cn("flex min-w-0 items-center gap-3 rounded-md border px-3 py-3 text-left transition", selectedId === section.id ? "border-primary bg-primary/5" : "hover:bg-muted/60")}
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded bg-muted text-xs font-semibold">{index + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">{section.title || "Гарчиггүй хэсэг"}</span>
                      <span className="block text-xs text-muted-foreground">{sectionLabels[section.type]}</span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(sectionLabels) as PageSection["type"][]).map((type) => (
                  <Button key={type} type="button" size="sm" variant="outline" onClick={() => addSection(type)}>
                    {type === "html" ? <Code2 /> : <Plus />}{sectionLabels[type]}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div id="page-section-editor" className="min-w-0 xl:sticky xl:top-[116px] xl:max-h-[calc(100vh-140px)] xl:overflow-y-auto xl:pr-1">
            {selected ? (
              <Card>
                <CardHeader className="flex-row items-center justify-between gap-3">
                  <CardTitle>{sectionLabels[selected.type]} засах</CardTitle>
                  <div className="flex items-center gap-1">
                    <Button aria-label="Дээш зөөх" size="icon-sm" type="button" variant="ghost" onClick={() => moveSection(-1)}><ArrowUp /></Button>
                    <Button aria-label="Доош зөөх" size="icon-sm" type="button" variant="ghost" onClick={() => moveSection(1)}><ArrowDown /></Button>
                    <Button aria-label="Хуулах" size="icon-sm" type="button" variant="ghost" onClick={duplicateSection}><CopyPlus /></Button>
                    <Button aria-label="Хэсэг устгах" size="icon-sm" type="button" variant="ghost" className="text-destructive" onClick={removeSection}><Trash2 /></Button>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Хэсгийн гарчиг</Label>
                  <Input value={selected.title} onChange={(event) => updateSection({ title: event.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label>Тайлбар</Label>
                  <Textarea value={selected.body || ""} rows={5} onChange={(event) => updateSection({ body: event.target.value })} />
                </div>
                {selected.type === "html" ? (
                  <div className="grid gap-2">
                    <Label>HTML код</Label>
                    <Textarea
                      className="min-h-[260px] font-mono text-xs leading-6"
                      value={selected.html || ""}
                      onChange={(event) => updateSection({ html: event.target.value })}
                      placeholder="<div class=&quot;custom-block&quot;>...</div>"
                    />
                    <p className="text-xs leading-5 text-muted-foreground">Энэ HTML нь хадгалагдаад detail page дээр шууд харагдана.</p>
                  </div>
                ) : null}
                {selected.type === "imageText" || selected.type === "feature" ? (
                  <>
                    {selected.imageUrl ? (
                      <div className="relative aspect-[16/8] overflow-hidden rounded-md border bg-muted">
                        <MediaPreview url={selected.imageUrl} alt={selected.imageAlt || selected.title} />
                      </div>
                    ) : null}
                    <MediaPickerDialog
                      currentUrl={selected.imageUrl}
                      onSelect={(item) => updateSection({ imageUrl: item.url, imageAlt: item.alt })}
                    />
                  </>
                ) : null}
                {selected.type === "imageText" ? (
                  <div className="grid grid-cols-2 gap-2">
                    <Button type="button" variant={selected.imagePosition !== "right" ? "default" : "outline"} onClick={() => updateSection({ imagePosition: "left" })}><ArrowLeft />Зураг зүүн</Button>
                    <Button type="button" variant={selected.imagePosition === "right" ? "default" : "outline"} onClick={() => updateSection({ imagePosition: "right" })}>Зураг баруун<ArrowRight /></Button>
                  </div>
                ) : null}
                {selected.type === "gallery" ? (
                  <div className="grid gap-3">
                    {(selected.items || []).map((item, index) => (
                      <div key={item.id} className="grid gap-3 rounded-md border bg-muted/20 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium">Карт {index + 1}</p>
                          <Button aria-label="Карт устгах" size="icon-sm" type="button" variant="ghost" className="text-destructive" onClick={() => updateSection({ items: (selected.items || []).filter((candidate) => candidate.id !== item.id) })}><Trash2 /></Button>
                        </div>
                        <Input value={item.title} placeholder="Нэр" onChange={(event) => updateGalleryItem(item.id, { title: event.target.value })} />
                        <Input value={item.subtitle || ""} placeholder="Дэд гарчиг" onChange={(event) => updateGalleryItem(item.id, { subtitle: event.target.value })} />
                        <Textarea value={item.body || ""} rows={3} placeholder="Тайлбар" onChange={(event) => updateGalleryItem(item.id, { body: event.target.value })} />
                        {item.imageUrl ? (
                          <div className="relative aspect-[16/8] overflow-hidden rounded-md border bg-muted">
                            <MediaPreview url={item.imageUrl} alt={item.imageAlt || item.title} />
                          </div>
                        ) : null}
                        <MediaPickerDialog currentUrl={item.imageUrl} onSelect={(media) => updateGalleryItem(item.id, { imageUrl: media.url, imageAlt: media.alt })} />
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addGalleryItem}><Plus />Карт нэмэх</Button>
                  </div>
                ) : null}
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed">
                <CardContent className="grid min-h-48 place-items-center p-6 text-center text-sm leading-6 text-muted-foreground">
                  Хэсэг сонгох эсвэл шинэ блок нэмээд эндээс дэлгэрэнгүй засна.
                </CardContent>
              </Card>
            )}
        </div>

        <div id="page-live-preview" className="min-w-0 xl:sticky xl:top-[116px] xl:h-[calc(100vh-140px)]">
          <div className="flex h-full min-h-[640px] flex-col overflow-hidden rounded-md border bg-[#e9eeeb] shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b bg-white px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-[#27302c]">Шууд харагдац</p>
                <p className="text-xs text-[#758078]">Таны өөрчлөлт энд шууд харагдана</p>
              </div>
              <div className="flex rounded-md border p-1">
                <Button aria-label="Компьютер харагдац" size="icon-sm" type="button" variant={previewMode === "desktop" ? "secondary" : "ghost"} onClick={() => setPreviewMode("desktop")}><Laptop /></Button>
                <Button aria-label="Утасны харагдац" size="icon-sm" type="button" variant={previewMode === "mobile" ? "secondary" : "ghost"} onClick={() => setPreviewMode("mobile")}><Smartphone /></Button>
              </div>
            </div>
            <div className="flex flex-1 items-start justify-center overflow-y-auto overscroll-contain p-3 sm:p-5">
              <div className={cn("cms-preview-canvas min-h-fit bg-white shadow-sm transition-all", previewMode === "mobile" ? "is-mobile w-[390px] max-w-full" : "w-full max-w-[1180px]")}>
                <div className="flex h-16 items-center border-b px-5 text-[#2e4737]">
                  <span className="text-sm font-bold">MAIKHAN TOLGOI</span>
                  <span className="ml-auto text-[10px] uppercase text-[#7b837e]">Website preview</span>
                </div>
                <section className="relative min-h-[300px] overflow-hidden bg-[#264a34] text-white">
                  {heroPreview ? (
                    <MediaPreview url={heroPreview} alt={hero.alt || title} className="absolute inset-0" />
                  ) : null}
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="relative flex min-h-[300px] flex-col justify-center px-[8%] py-12">
                    <h1 className="max-w-3xl break-words text-3xl font-semibold leading-tight sm:text-4xl">{title || "Хуудасны гарчиг"}</h1>
                    {summary ? <p className="mt-4 max-w-2xl text-sm leading-7 text-white/90">{summary}</p> : null}
                  </div>
                </section>
                <CmsPageSections sections={sections} />
                {sections.length === 0 ? <div className="grid min-h-48 place-items-center px-6 text-center text-sm text-[#7b837e]">Зүүн талын цэснээс хуудасны эхний хэсгийг нэмнэ үү.</div> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

function MediaPreview({ url, alt, className }: { alt: string; className?: string; url: string }) {
  if (isVideoUrl(url)) {
    return <video src={url} className={cn("h-full w-full object-cover", className)} controls muted playsInline />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={url} alt={alt} className={cn("h-full w-full object-cover", className)} />
  );
}
