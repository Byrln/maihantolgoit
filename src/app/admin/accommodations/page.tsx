import Link from "next/link";
import { BedDouble, Plus } from "lucide-react";

import { deleteAccommodation } from "@/app/admin/actions";
import { ConfirmDelete } from "@/components/cms/confirm-delete";
import { EmptyState } from "@/components/cms/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";

export default async function AccommodationsPage() {
  const accommodations = await prisma.accommodation.findMany({
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Байр</h1>
          <p className="text-sm text-muted-foreground">Accommodation хуудасны байрны төрлүүдийг удирдана.</p>
        </div>
        <Button asChild>
          <Link href="/admin/accommodations/new">
            <Plus />
            Байр нэмэх
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Бүх байр</CardTitle>
        </CardHeader>
        <CardContent>
          {accommodations.length === 0 ? (
            <EmptyState
              actionHref="/admin/accommodations/new"
              actionLabel="Эхний байр нэмэх"
              description="Гэр, dome, cabin зэрэг байрны төрлүүдээ эндээс нэмнэ."
              icon={BedDouble}
              title="Одоогоор байр алга"
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Гарчиг</TableHead>
                  <TableHead>Эрэмбэ</TableHead>
                  <TableHead>Шинэчилсэн</TableHead>
                  <TableHead className="w-[180px] text-right">Үйлдэл</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accommodations.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.sortOrder}</TableCell>
                    <TableCell>{item.updatedAt.toLocaleDateString("mn-MN")}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/accommodations/${item.id}`}>Засах</Link>
                        </Button>
                        <ConfirmDelete action={deleteAccommodation} id={item.id} itemName={item.title} />
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
