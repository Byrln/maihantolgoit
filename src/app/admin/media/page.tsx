import Image from "next/image";
import { ImageIcon } from "lucide-react";

import { EmptyState } from "@/components/cms/empty-state";
import { MediaUploadDialog } from "@/components/cms/media-upload-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function MediaPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Зураг</h1>
          <p className="text-sm text-muted-foreground">Блог, үйлчилгээ болон редакторт ашиглах зургаа эндээс upload хийнэ.</p>
        </div>
        <MediaUploadDialog />
      </div>

      {media.length === 0 ? (
        <EmptyState
          description="Зураг upload хийсний дараа блог, үйлчилгээ болон редакторын зураг сонголтод автоматаар харагдана."
          icon={ImageIcon}
          title="Одоогоор зураг алга"
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {media.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative aspect-[4/3] bg-muted">
                <Image src={item.url} alt={item.alt} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
              </div>
              <CardContent className="p-3">
                <p className="truncate text-sm font-medium text-foreground">{item.alt}</p>
                <p className="truncate text-xs text-muted-foreground">{item.url}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
