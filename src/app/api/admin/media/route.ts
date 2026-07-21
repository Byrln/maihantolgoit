import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { saveMediaFile } from "@/lib/uploads";

export async function GET() {
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
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const alt = String(formData.get("alt") || "").trim();
  const media = await saveMediaFile(file, alt);

  if (!media) {
    return NextResponse.json({ error: "Зураг сонгоно уу." }, { status: 400 });
  }

  return NextResponse.json({
    media: {
      id: media.id,
      alt: media.alt,
      url: media.url,
    },
  });
}
