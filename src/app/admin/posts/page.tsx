import Link from "next/link";
import { FileText, Plus } from "lucide-react";

import { deletePost } from "@/app/admin/actions";
import { ConfirmDelete } from "@/components/cms/confirm-delete";
import { EmptyState } from "@/components/cms/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
  });

  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Блог</h1>
          <p className="text-sm text-muted-foreground">Редактор зөвхөн агуулгаа бичнэ. URL нэр автоматаар үүснэ.</p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus />
            Блог нэмэх
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Бүх блог</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <EmptyState
              actionHref="/admin/posts/new"
              actionLabel="Эхний блог нэмэх"
              description="Аяллын зөвлөгөө, улирлын мэдээ, кемпийн түүхээ эндээс нийтэлж эхлээрэй."
              icon={FileText}
              title="Одоогоор блог алга"
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Гарчиг</TableHead>
                  <TableHead>Ангилал</TableHead>
                  <TableHead>Нийтэлсэн</TableHead>
                  <TableHead className="w-[180px] text-right">Үйлдэл</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.category ? <Badge variant="secondary">{post.category}</Badge> : "Байхгүй"}</TableCell>
                    <TableCell>{post.publishedAt ? post.publishedAt.toLocaleDateString("mn-MN") : "Ноорог"}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/posts/${post.id}`}>Засах</Link>
                        </Button>
                        <ConfirmDelete action={deletePost} id={post.id} itemName={post.title} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
