import type { Accommodation } from "@prisma/client";

import { saveAccommodation } from "@/app/admin/actions";
import { SubmitButton } from "@/components/cms/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { stringList } from "@/lib/cms";

type AccommodationFormProps = {
  accommodation?: Accommodation | null;
};

export function AccommodationForm({ accommodation }: AccommodationFormProps) {
  return (
    <form action={saveAccommodation} className="grid gap-6">
      <input name="id" type="hidden" value={accommodation?.id || ""} />
      <Card>
        <CardHeader>
          <CardTitle>{accommodation ? "Байр засах" : "Шинэ байр"}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="title">Гарчиг</Label>
              <Input id="title" name="title" required defaultValue={accommodation?.title || ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sortOrder">Эрэмбэ</Label>
              <Input id="sortOrder" name="sortOrder" type="number" defaultValue={accommodation?.sortOrder ?? 0} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="summary">Товч тайлбар</Label>
            <Textarea id="summary" name="summary" required defaultValue={accommodation?.summary || ""} rows={3} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="details">Дэлгэрэнгүй мэдээлэл</Label>
            <Textarea id="details" name="details" defaultValue={stringList(accommodation?.details).join("\n")} rows={8} />
            <p className="text-xs text-muted-foreground">Мөр бүр нэг мэдээлэл болно.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Зураг</Label>
            <Input id="image" name="image" type="file" accept="image/*" />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <SubmitButton pendingLabel="Байр хадгалж байна...">Байр хадгалах</SubmitButton>
      </div>
    </form>
  );
}
