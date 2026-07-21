import Link from "next/link";
import { FileText, Plus } from "lucide-react";

import { deletePage } from "@/app/admin/actions";
import { ConfirmDelete } from "@/components/cms/confirm-delete";
import { EmptyState } from "@/components/cms/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";

export default async function PagesPage() {
  const pages = await prisma.page.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Хуудас</h1>
          <p className="text-sm text-muted-foreground">Нүүр, бидний тухай, байр болон бусад вэб хуудасны текст, зургийг удирдана.</p>
        </div>
        <Button asChild>
          <Link href="/admin/pages/new">
            <Plus />
            Хуудас нэмэх
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Бүх хуудас</CardTitle>
        </CardHeader>
        <CardContent>
          {pages.length === 0 ? (
            <EmptyState
              actionHref="/admin/pages/new"
              actionLabel="Эхний хуудас нэмэх"
              description="Вэбсайтын тогтмол хуудсуудын гарчиг, тайлбар, hero зураг болон агуулгыг эндээс засна."
              icon={FileText}
              title="Одоогоор хуудас алга"
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Гарчиг</TableHead>
                  <TableHead>Вэб хаяг</TableHead>
                  <TableHead>Шинэчилсэн</TableHead>
                  <TableHead className="w-[180px] text-right">Үйлдэл</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>/{page.slug}</TableCell>
                    <TableCell>{page.updatedAt.toLocaleDateString("mn-MN")}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/pages/${page.id}`}>Засах</Link>
                        </Button>
                        <ConfirmDelete action={deletePage} id={page.id} itemName={page.title} />
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
