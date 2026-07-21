import { notFound } from "next/navigation";

import { PageForm } from "@/components/cms/page-form";
import { prisma } from "@/lib/prisma";

export default async function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({
    where: { id },
    include: { heroImage: true },
  });

  if (!page) {
    notFound();
  }

  return (
    <main className="flex min-w-0 flex-1 flex-col gap-4 p-3 sm:p-5 lg:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{page.title}</h1>
        <p className="text-sm text-muted-foreground">Текст, зураг, хэсгүүдээ засахад баруун талын вэб харагдац шууд шинэчлэгдэнэ.</p>
      </div>
      <PageForm page={page} />
    </main>
  );
}
