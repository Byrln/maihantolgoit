"use client";

import { Check, ImageIcon, Loader2, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type MediaItem = {
  id: string;
  alt: string;
  url: string;
};

export function MediaPickerDialog({
  currentUrl,
  onSelect,
  triggerLabel = "Зураг сонгох",
}: {
  currentUrl?: string;
  onSelect: (item: MediaItem) => void;
  triggerLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    setLoaded(false);
    setMessage("");
    fetch("/api/admin/media")
      .then((response) => response.json())
      .then((data: { media?: MediaItem[] }) => setMedia(data.media || []))
      .catch(() => setMessage("Зургийн санг ачаалж чадсангүй."))
      .finally(() => setLoaded(true));
  }, [open]);

  const choose = (item: MediaItem) => {
    onSelect(item);
    setOpen(false);
  };

  const upload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setMessage("Эхлээд зураг сонгоно уу.");
      return;
    }

    setUploading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("alt", file.name);

    try {
      const response = await fetch("/api/admin/media", { method: "POST", body: formData });
      const data = (await response.json()) as { media?: MediaItem; error?: string };

      if (!response.ok || !data.media) {
        setMessage(data.error || "Зураг оруулж чадсангүй.");
        return;
      }

      setMedia((items) => [data.media as MediaItem, ...items]);
      choose(data.media);
    } catch {
      setMessage("Зураг оруулж чадсангүй. Дахин оролдоно уу.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <ImageIcon />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[86vh] overflow-hidden sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Зургийн сан</DialogTitle>
          <DialogDescription>Бэлэн зураг сонгох эсвэл шинэ зураг оруулна.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 overflow-hidden">
          <div className="grid gap-2 rounded-md border bg-muted/30 p-3 sm:grid-cols-[1fr_auto]">
            <Input ref={fileRef} accept="image/*" type="file" />
            <Button disabled={uploading} type="button" onClick={upload}>
              {uploading ? <Loader2 className="animate-spin" /> : <Upload />}
              {uploading ? "Оруулж байна..." : "Шинэ зураг оруулах"}
            </Button>
          </div>
          {message ? <p className="text-sm text-destructive">{message}</p> : null}
          <div className="max-h-[52vh] overflow-y-auto pr-1">
            {!loaded ? (
              <div className="grid min-h-48 place-items-center rounded-md border border-dashed text-sm text-muted-foreground">
                <Loader2 className="size-5 animate-spin" />
              </div>
            ) : media.length === 0 ? (
              <div className="grid min-h-48 place-items-center rounded-md border border-dashed px-6 text-center text-sm text-muted-foreground">
                Зургийн сан хоосон байна. Дээрээс эхний зургаа оруулна уу.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {media.map((item) => (
                  <button
                    key={item.id}
                    className="group relative overflow-hidden rounded-md border bg-muted text-left outline-none transition hover:border-primary focus-visible:ring-2 focus-visible:ring-ring"
                    type="button"
                    onClick={() => choose(item)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt={item.alt} className="aspect-[4/3] w-full object-cover" />
                    <span className="block truncate px-2 py-2 text-xs text-foreground">{item.alt || "Тайлбаргүй зураг"}</span>
                    {currentUrl === item.url ? (
                      <span className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-primary text-primary-foreground">
                        <Check className="size-4" />
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
