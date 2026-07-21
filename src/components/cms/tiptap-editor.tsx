"use client";

import { forwardRef, useEffect, useRef, useState, type ReactNode } from "react";
import type { JSONContent } from "@tiptap/react";
import { EditorContent, useEditor } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  ImageIcon,
  Italic,
  LinkIcon,
  Loader2,
  List,
  ListOrdered,
  Quote,
  Upload,
  UnderlineIcon,
} from "lucide-react";

import { ToolbarProvider } from "@/components/toolbars/toolbar-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { emptyEditorContent } from "@/lib/cms";

type TiptapEditorProps = {
  initialValue?: JSONContent | null;
  name: string;
};

type MediaItem = {
  id: string;
  alt: string;
  url: string;
};

export function TiptapEditor({ initialValue, name }: TiptapEditorProps) {
  const [value, setValue] = useState(() => JSON.stringify(initialValue || emptyEditorContent));
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const [imageOpen, setImageOpen] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [imageMessage, setImageMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        link: false,
        underline: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {
          class: "tiptap-heading",
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-md border",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Агуулгаа энд бичнэ үү...",
      }),
    ],
    content: initialValue || emptyEditorContent,
    editorProps: {
      attributes: {
        class:
          "min-h-[320px] rounded-md border bg-background px-4 py-3 text-sm leading-7 text-foreground outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      setValue(JSON.stringify(editor.getJSON()));
    },
  });

  useEffect(() => {
    setValue(JSON.stringify(initialValue || emptyEditorContent));
  }, [initialValue]);

  useEffect(() => {
    if (!imageOpen) {
      return;
    }

    setMediaLoaded(false);
    fetch("/api/admin/media")
      .then((response) => response.json())
      .then((data: { media?: MediaItem[] }) => setMedia(data.media || []))
      .catch(() => setImageMessage("Зургийн жагсаалт ачаалсангүй."))
      .finally(() => setMediaLoaded(true));
  }, [imageOpen]);

  if (!editor) {
    return <div className="min-h-[320px] rounded-md border bg-muted/30" />;
  }

  const applyLink = () => {
    const url = linkValue.trim();

    if (!url) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }

    setLinkOpen(false);
  };

  const openLinkPopover = (open: boolean) => {
    setLinkOpen(open);

    if (open) {
      setLinkValue((editor.getAttributes("link").href as string | undefined) || "");
    }
  };

  const insertImage = (item: MediaItem) => {
    editor.chain().focus().setImage({ src: item.url, alt: item.alt }).run();
    setImageOpen(false);
  };

  const uploadImage = async () => {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      setImageMessage("Эхлээд зураг сонгоно уу.");
      return;
    }

    setUploading(true);
    setImageMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("alt", file.name);

    const response = await fetch("/api/admin/media", {
      method: "POST",
      body: formData,
    });
    const data = (await response.json()) as { media?: MediaItem; error?: string };

    setUploading(false);

    if (!response.ok || !data.media) {
      setImageMessage(data.error || "Зураг оруулж чадсангүй.");
      return;
    }

    setMedia((items) => [data.media as MediaItem, ...items]);
    insertImage(data.media);
  };

  return (
    <ToolbarProvider editor={editor}>
      <input name={name} type="hidden" value={value} readOnly />
      <div className="rounded-md border bg-card">
        <div className="flex flex-wrap items-center gap-1 border-b p-2">
          <ToolbarButton active={editor.isActive("heading", { level: 1 })} label="Гарчиг 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
            <Heading1 />
          </ToolbarButton>
          <ToolbarButton active={editor.isActive("heading", { level: 2 })} label="Гарчиг 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <Heading2 />
          </ToolbarButton>
          <ToolbarButton active={editor.isActive("bold")} label="Тод" onClick={() => editor.chain().focus().toggleBold().run()}>
            <Bold />
          </ToolbarButton>
          <ToolbarButton active={editor.isActive("italic")} label="Налуу" onClick={() => editor.chain().focus().toggleItalic().run()}>
            <Italic />
          </ToolbarButton>
          <ToolbarButton active={editor.isActive("underline")} label="Доогуур зураас" onClick={() => editor.chain().focus().toggleUnderline().run()}>
            <UnderlineIcon />
          </ToolbarButton>
          <ToolbarButton active={editor.isActive("bulletList")} label="Жагсаалт" onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <List />
          </ToolbarButton>
          <ToolbarButton active={editor.isActive("orderedList")} label="Дугаартай жагсаалт" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            <ListOrdered />
          </ToolbarButton>
          <ToolbarButton active={editor.isActive("blockquote")} label="Ишлэл" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
            <Quote />
          </ToolbarButton>
          <ToolbarButton active={editor.isActive({ textAlign: "left" })} label="Зүүн тийш" onClick={() => editor.chain().focus().setTextAlign("left").run()}>
            <AlignLeft />
          </ToolbarButton>
          <ToolbarButton active={editor.isActive({ textAlign: "center" })} label="Голлуулах" onClick={() => editor.chain().focus().setTextAlign("center").run()}>
            <AlignCenter />
          </ToolbarButton>
          <ToolbarButton active={editor.isActive({ textAlign: "right" })} label="Баруун тийш" onClick={() => editor.chain().focus().setTextAlign("right").run()}>
            <AlignRight />
          </ToolbarButton>
          <Popover open={linkOpen} onOpenChange={openLinkPopover}>
            <PopoverTrigger asChild>
              <ToolbarButton active={editor.isActive("link")} label="Холбоос">
                <LinkIcon />
              </ToolbarButton>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-80">
              <div className="grid gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Холбоос</p>
                  <p className="text-xs text-muted-foreground">Холбох хаягаа бичээд хадгална.</p>
                </div>
                <Input value={linkValue} onChange={(event) => setLinkValue(event.target.value)} placeholder="https://example.com" />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setLinkValue("")}>
                    Арилгах
                  </Button>
                  <Button type="button" onClick={applyLink}>
                    Хадгалах
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Popover open={imageOpen} onOpenChange={setImageOpen}>
            <PopoverTrigger asChild>
              <ToolbarButton label="Зураг">
                <ImageIcon />
              </ToolbarButton>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[360px]">
              <div className="grid gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Зураг оруулах</p>
                  <p className="text-xs text-muted-foreground">Шинэ файл оруулах эсвэл өмнөх зургаас сонгоно.</p>
                </div>
                <div className="grid gap-2">
                  <Input ref={fileInputRef} accept="image/*" type="file" />
                  <Button disabled={uploading} type="button" onClick={uploadImage}>
                    {uploading ? <Loader2 className="animate-spin" /> : <Upload />}
                    Зураг оруулах
                  </Button>
                  {imageMessage ? <p className="text-xs text-destructive">{imageMessage}</p> : null}
                </div>
                <div className="grid gap-2">
                  <p className="text-xs font-medium text-muted-foreground">CMS зураг</p>
                  {!mediaLoaded ? (
                    <div className="flex min-h-24 items-center justify-center rounded-md border border-dashed bg-muted/30 text-xs text-muted-foreground">
                      Зургуудыг ачаалж байна...
                    </div>
                  ) : media.length === 0 ? (
                    <div className="rounded-md border border-dashed bg-muted/30 px-4 py-5 text-center">
                      <ImageIcon className="mx-auto size-5 text-muted-foreground" />
                      <p className="mt-2 text-xs font-medium text-foreground">Сонгох зураг алга</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">Дээрээс зураг оруулаад агуулгадаа шууд ашиглана.</p>
                    </div>
                  ) : (
                    <div className="grid max-h-56 grid-cols-3 gap-2 overflow-auto">
                      {media.map((item) => (
                        <button
                          key={item.id}
                          className="overflow-hidden rounded-md border bg-muted text-left transition hover:border-primary"
                          title={item.alt}
                          type="button"
                          onClick={() => insertImage(item)}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.url} alt={item.alt} className="aspect-square w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <EditorContent editor={editor} />
      </div>
    </ToolbarProvider>
  );
}

type ToolbarButtonProps = {
  active?: boolean;
  children: ReactNode;
  label: string;
  onClick?: () => void;
};

const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(function ToolbarButton(
  { active, children, label, onClick },
  ref,
) {
  return (
    <Button
      aria-label={label}
      className={active ? "bg-accent text-accent-foreground" : undefined}
      onClick={onClick}
      ref={ref}
      size="icon-sm"
      title={label}
      type="button"
      variant="ghost"
    >
      {children}
    </Button>
  );
});
