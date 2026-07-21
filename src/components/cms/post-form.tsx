import type { Media, Post } from "@prisma/client";

import { CoverImageField } from "@/components/cms/cover-image-field";
import { TiptapEditor } from "@/components/cms/tiptap-editor";
import { SubmitButton } from "@/components/cms/submit-button";
import { TourWizard } from "@/components/cms/tour-wizard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { savePost } from "@/app/admin/actions";

type PostFormProps = {
  post?: (Post & { coverImage?: Media | null }) | null;
};

function dateInputValue(date?: Date | null) {
  if (date) {
    return date.toISOString().slice(0, 10);
  }

  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Ulaanbaatar",
    year: "numeric",
  }).formatToParts(new Date());
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${value.year}-${value.month}-${value.day}`;
}

export function PostForm({ post }: PostFormProps) {
  return (
    <form action={savePost} className="grid gap-6">
      <input name="id" type="hidden" value={post?.id || ""} />
      <Card>
        <CardHeader className="flex-row items-center justify-between gap-3">
          <CardTitle>{post ? "Блог засах" : "Шинэ блог"}</CardTitle>
          <TourWizard
            storageKey="post-form"
            steps={[
              {
                selectorId: "post-cover-image",
                title: "Онцлох зураг",
                body: "Онцлох зураг нь блогийн карт болон дэлгэрэнгүй хуудасны дээд cover хэсэгт ашиглагдана.",
              },
              {
                selectorId: "post-body-editor",
                title: "Editor-ийн агуулга",
                body: "Editor дотор гарах зураг зөвхөн editor-ийн зураг товчоор оруулсан үед харагдана. Cover зураг body хэсэгт дахин давтагдахгүй.",
              },
              {
                selectorId: "publishedAt",
                title: "Нийтлэх огноо",
                body: "Огноо бөглөж хадгалсны дараа блог public сайт дээр харагдана. Гарчиг өөрчлөгдвөл URL автоматаар шинэчлэгдэнэ.",
              },
            ]}
          />
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="title">Гарчиг</Label>
            <Input id="title" name="title" required defaultValue={post?.title || ""} />
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="category">Ангилал</Label>
              <Input id="category" name="category" defaultValue={post?.category || ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="publishedAt">Блог нийтлэх огноо</Label>
              <Input
                id="publishedAt"
                name="publishedAt"
                type="date"
                defaultValue={dateInputValue(post?.publishedAt)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="excerpt">Товч тайлбар</Label>
            <Textarea id="excerpt" name="excerpt" required defaultValue={post?.excerpt || ""} rows={3} />
          </div>
          <div id="post-cover-image">
            <CoverImageField
              currentImage={post?.coverImage || null}
              fileInputName="coverImage"
              label="Онцлох зураг"
              mediaIdName="coverImageId"
              removeName="removeCoverImage"
              title={post?.title || "Блог"}
            />
          </div>
          <div id="post-body-editor" className="grid gap-2">
            <Label>Агуулга</Label>
            <TiptapEditor name="body" initialValue={post?.body as never} />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <SubmitButton pendingLabel="Блог хадгалж байна...">Блог хадгалах</SubmitButton>
      </div>
    </form>
  );
}
