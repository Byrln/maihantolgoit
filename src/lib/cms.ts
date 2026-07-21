import type { JSONContent } from "@tiptap/react";

export type PageSectionItem = {
  id: string;
  title: string;
  subtitle?: string;
  body?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type PageSection = {
  id: string;
  type: "text" | "imageText" | "gallery" | "feature" | "html";
  title: string;
  body?: string;
  html?: string;
  imageUrl?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  items?: PageSectionItem[];
};

export const emptyEditorContent: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
};

export function parseEditorContent(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !value.trim()) {
    return emptyEditorContent;
  }

  try {
    return JSON.parse(value) as JSONContent;
  } catch {
    return emptyEditorContent;
  }
}

export function parsePageSections(value: FormDataEntryValue | unknown): PageSection[] {
  try {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((section): section is PageSection => {
      if (!section || typeof section !== "object") {
        return false;
      }

      const candidate = section as Partial<PageSection>;
      return (
        typeof candidate.id === "string" &&
        typeof candidate.title === "string" &&
        ["text", "imageText", "gallery", "feature", "html"].includes(String(candidate.type))
      );
    });
  } catch {
    return [];
  }
}

export function slugify(value: string) {
  return (
    value
      .normalize("NFKD")
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "") || "item"
  );
}

export function editorText(value: unknown) {
  const parts: string[] = [];

  function visit(node: unknown) {
    if (!node || typeof node !== "object") {
      return;
    }

    const current = node as { content?: unknown[]; text?: unknown };

    if (typeof current.text === "string") {
      parts.push(current.text);
    }

    current.content?.forEach(visit);
  }

  visit(value);

  return parts.join(" ").replace(/\s+/g, " ").trim();
}

export function stringList(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}
