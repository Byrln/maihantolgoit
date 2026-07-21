import Link from "next/link";
import { notFound } from "next/navigation";

import { PostForm } from "@/components/cms/post-form";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: { coverImage: true },
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Блог засах</h1>
          <p className="text-sm text-muted-foreground">Гарчиг өөрчлөгдөхөд URL нэр автоматаар шинэчлэгдэнэ.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/posts">Буцах</Link>
        </Button>
      </div>
      <PostForm post={post} />
    </main>
  );
}
