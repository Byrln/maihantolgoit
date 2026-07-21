"use client";

import { useEffect, useRef, useState } from "react";
import { ImageIcon, Maximize2, Trash2 } from "lucide-react";

import { MediaPickerDialog } from "@/components/cms/media-picker-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CoverImage = {
  id: string;
  alt: string;
  url: string;
} | null;

type CoverImageFieldProps = {
  currentImage?: CoverImage;
  fileInputName: string;
  label: string;
  mediaIdName: string;
  removeName: string;
  title: string;
};

export function CoverImageField({
  currentImage,
  fileInputName,
  label,
  mediaIdName,
  removeName,
  title,
}: CoverImageFieldProps) {
  const [image, setImage] = useState<CoverImage>(currentImage || null);
  const [filePreview, setFilePreview] = useState("");
  const [removed, setRemoved] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrl = filePreview || image?.url || "";

  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [filePreview]);

  const clearFilePreview = () => {
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview("");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = () => {
    clearFilePreview();
    setImage(null);
    setRemoved(true);
    setFullscreen(false);
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor={fileInputName}>{label}</Label>
      <input name={mediaIdName} type="hidden" value={image?.id || ""} readOnly />
      <input name={removeName} type="hidden" value={removed ? "1" : ""} readOnly />

      {previewUrl ? (
        <div className="group relative w-full max-w-[360px] overflow-hidden rounded-md border bg-muted">
          <button
            type="button"
            className="block w-full cursor-zoom-in text-left"
            onClick={() => setFullscreen(true)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt={image?.alt || title} className="aspect-[16/9] w-full object-cover" />
          </button>
          <div className="absolute inset-x-2 bottom-2 flex translate-y-2 items-center justify-end gap-2 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
            <MediaPickerDialog
              currentUrl={image?.url}
              triggerLabel="Солих"
              onSelect={(item) => {
                clearFilePreview();
                setImage(item);
                setRemoved(false);
              }}
            />
            <Button type="button" variant="destructive" onClick={removeImage}>
              <Trash2 />
              Устгах
            </Button>
          </div>
          <div className="absolute left-2 top-2 rounded bg-black/55 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
            <Maximize2 className="mr-1 inline size-3" />
            Томоор харах
          </div>
        </div>
      ) : (
        <div className="grid aspect-[16/9] w-full max-w-[360px] place-items-center rounded-md border border-dashed bg-muted/30 text-muted-foreground">
          <ImageIcon />
        </div>
      )}

      <div className="grid gap-2 sm:max-w-[360px]">
        <Input
          id={fileInputName}
          name={fileInputName}
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(event) => {
            if (filePreview) {
              URL.revokeObjectURL(filePreview);
              setFilePreview("");
            }
            const file = event.target.files?.[0];
            setFilePreview(file ? URL.createObjectURL(file) : "");
            setImage(null);
            setRemoved(false);
          }}
        />
        {!previewUrl ? (
          <MediaPickerDialog
            triggerLabel="Сангаас сонгох"
            onSelect={(item) => {
              clearFilePreview();
              setImage(item);
              setRemoved(false);
            }}
          />
        ) : null}
      </div>
      <p className="text-xs text-muted-foreground">Cover зураг карт болон дээд хэсэгт л ашиглагдана.</p>

      {fullscreen && previewUrl ? (
        <div className="fixed inset-0 z-[120] grid place-items-center bg-black/85 p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 cursor-zoom-out" type="button" aria-label="Зураг хаах" onClick={() => setFullscreen(false)} />
          <div className="relative max-h-full max-w-5xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt={image?.alt || title} className="max-h-[88vh] w-auto rounded-md object-contain shadow-2xl" />
            <Button className="absolute right-3 top-3" type="button" variant="secondary" onClick={() => setFullscreen(false)}>
              Хаах
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
