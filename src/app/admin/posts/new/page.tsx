import Link from "next/link";

import { PostForm } from "@/components/cms/post-form";
import { Button } from "@/components/ui/button";

export default function NewPostPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Шинэ блог</h1>
          <p className="text-sm text-muted-foreground">URL нэрийн талбар байхгүй. CMS автоматаар үүсгэнэ.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/posts">Буцах</Link>
        </Button>
      </div>
      <PostForm />
    </main>
  );
}
