import Image from "next/image";
import { ImageIcon, Video } from "lucide-react";

import { EmptyState } from "@/components/cms/empty-state";
import { MediaUploadDialog } from "@/components/cms/media-upload-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { isVideoUrl } from "@/lib/media";
import { prisma } from "@/lib/prisma";

export default async function MediaPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Медиа сан</h1>
          <p className="text-sm text-muted-foreground">Блог, үйлчилгээ болон редакторт ашиглах зураг, видеогоо эндээс upload хийнэ.</p>
        </div>
        <MediaUploadDialog />
      </div>

      {media.length === 0 ? (
        <EmptyState
          description="Медиа upload хийсний дараа блог, үйлчилгээ болон редакторын сонголтод автоматаар харагдана."
          icon={ImageIcon}
          title="Одоогоор медиа алга"
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {media.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative aspect-[4/3] bg-muted">
                {isVideoUrl(item.url) ? (
                  <>
                    <video src={item.url} className="h-full w-full object-cover" muted playsInline />
                    <span className="absolute left-2 top-2 grid size-8 place-items-center rounded-full bg-black/65 text-white">
                      <Video className="size-4" />
                    </span>
                  </>
                ) : (
                  <Image src={item.url} alt={item.alt} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
                )}
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
