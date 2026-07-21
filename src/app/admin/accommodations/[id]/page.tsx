import Link from "next/link";
import { notFound } from "next/navigation";

import { AccommodationForm } from "@/components/cms/accommodation-form";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function EditAccommodationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accommodation = await prisma.accommodation.findUnique({
    where: { id },
  });

  if (!accommodation) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Байр засах</h1>
          <p className="text-sm text-muted-foreground">Гарчиг, зураг, эрэмбэ болон мэдээллээ шинэчилнэ.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/accommodations">Буцах</Link>
        </Button>
      </div>
      <AccommodationForm accommodation={accommodation} />
    </main>
  );
}
