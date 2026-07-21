import type { Media, Service } from "@prisma/client";

import { saveService } from "@/app/admin/actions";
import { CoverImageField } from "@/components/cms/cover-image-field";
import { TiptapEditor } from "@/components/cms/tiptap-editor";
import { SubmitButton } from "@/components/cms/submit-button";
import { TourWizard } from "@/components/cms/tour-wizard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ServiceFormProps = {
  service?: (Service & { image?: Media | null }) | null;
};

export function ServiceForm({ service }: ServiceFormProps) {
  return (
    <form action={saveService} className="grid gap-6">
      <input name="id" type="hidden" value={service?.id || ""} />
      <Card>
        <CardHeader className="flex-row items-center justify-between gap-3">
          <CardTitle>{service ? "Үйлчилгээ засах" : "Шинэ үйлчилгээ"}</CardTitle>
          <TourWizard
            storageKey="service-form"
            steps={[
              {
                selectorId: "service-cover-image",
                title: "Cover зураг",
                body: "Энэ зураг үйлчилгээний карт болон дэлгэрэнгүй хуудасны дээд хэсэгт харагдана. Editor дотор автоматаар нэмэгдэхгүй.",
              },
              {
                selectorId: "service-body-editor",
                title: "Агуулгын editor",
                body: "Доорх editor дээр бичсэн текст, холбоос, editor-оос оруулсан зураг л нийтлэлийн үндсэн хэсэгт харагдана.",
              },
              {
                selectorId: "publishedAt",
                title: "Нийтлэх огноо",
                body: "Огноо бөглөсөн, өнөөдрөөс өмнөх үйлчилгээ л public сайт дээр гарна. Хоосон бол нуугдсан хэвээр байна.",
              },
            ]}
          />
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="title">Гарчиг</Label>
            <Input id="title" name="title" required defaultValue={service?.title || ""} />
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="excerpt">Товч тайлбар</Label>
              <Textarea id="excerpt" name="excerpt" defaultValue={service?.excerpt || ""} rows={3} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="publishedAt">Нийтлэх огноо</Label>
              <Input
                id="publishedAt"
                name="publishedAt"
                type="date"
                defaultValue={service?.publishedAt ? service.publishedAt.toISOString().slice(0, 10) : ""}
              />
              <p className="text-xs text-muted-foreground">Хоосон бол вэбсайт дээр харагдахгүй.</p>
            </div>
          </div>
          <div id="service-cover-image">
            <CoverImageField
              currentImage={service?.image || null}
              fileInputName="image"
              label="Cover зураг"
              mediaIdName="imageId"
              removeName="removeImage"
              title={service?.title || "Үйлчилгээ"}
            />
          </div>
          <div id="service-body-editor" className="grid gap-2">
            <Label>Агуулга</Label>
            <TiptapEditor name="body" initialValue={service?.body as never} />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <SubmitButton pendingLabel="Үйлчилгээ хадгалж байна...">Үйлчилгээ хадгалах</SubmitButton>
      </div>
    </form>
  );
}
