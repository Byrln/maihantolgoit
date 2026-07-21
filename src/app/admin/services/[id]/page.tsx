import Link from "next/link";
import { notFound } from "next/navigation";

import { ServiceForm } from "@/components/cms/service-form";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.service.findUnique({
    where: { id },
    include: { image: true },
  });

  if (!service) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Үйлчилгээ засах</h1>
          <p className="text-sm text-muted-foreground">Эрэмбийн дугаар оруулах шаардлагагүй.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/services">Буцах</Link>
        </Button>
      </div>
      <ServiceForm service={service} />
    </main>
  );
}
