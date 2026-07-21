import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveMediaFile } from "@/lib/uploads";

export async function GET() {
  const admin = await requireAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    take: 24,
    select: {
      id: true,
      alt: true,
      url: true,
    },
  });

  return NextResponse.json({ media });
}

export async function POST(request: Request) {
  const admin = await requireAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const alt = String(formData.get("alt") || "").trim();
  let media;

  try {
    media = await saveMediaFile(file, alt);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Медиа оруулж чадсангүй." }, { status: 400 });
  }

  if (!media) {
    return NextResponse.json({ error: "Медиа файл сонгоно уу." }, { status: 400 });
  }

  return NextResponse.json({
    media: {
      id: media.id,
      alt: media.alt,
      url: media.url,
    },
  });
}
