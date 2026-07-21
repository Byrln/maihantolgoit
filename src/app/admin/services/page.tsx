import Link from "next/link";
import { Layers3, Plus } from "lucide-react";

import { deleteService } from "@/app/admin/actions";
import { ConfirmDelete } from "@/components/cms/confirm-delete";
import { EmptyState } from "@/components/cms/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Үйлчилгээ</h1>
          <p className="text-sm text-muted-foreground">Шинэ үйлчилгээ үүсгэхэд эрэмбэ автоматаар оноогдоно.</p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus />
            Үйлчилгээ нэмэх
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Бүх үйлчилгээ</CardTitle>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <EmptyState
              actionHref="/admin/services/new"
              actionLabel="Эхний үйлчилгээ нэмэх"
              description="Байр, хоол, аялал болон кемпийн нэмэлт үйлчилгээг цэвэр бүтэцтэйгээр оруулаарай."
              icon={Layers3}
              title="Одоогоор үйлчилгээ алга"
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Гарчиг</TableHead>
                  <TableHead>Нийтэлсэн</TableHead>
                  <TableHead>Шинэчилсэн</TableHead>
                  <TableHead className="w-[180px] text-right">Үйлдэл</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell>{service.publishedAt ? service.publishedAt.toLocaleDateString("mn-MN") : "Ноорог"}</TableCell>
                    <TableCell>{service.updatedAt.toLocaleDateString("mn-MN")}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/services/${service.id}`}>Засах</Link>
                        </Button>
                        <ConfirmDelete action={deleteService} id={service.id} itemName={service.title} />
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
