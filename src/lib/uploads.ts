import { mkdir, writeFile } from "fs/promises";
import path from "path";

import { prisma } from "@/lib/prisma";

export async function saveMediaFile(file: File | null, alt: string) {
  if (!file || file.size === 0) {
    return null;
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const extension = path.extname(file.name) || ".jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, safeName), bytes);

  return prisma.media.create({
    data: {
      alt: alt || file.name,
      url: `/uploads/${safeName}`,
    },
  });
}
