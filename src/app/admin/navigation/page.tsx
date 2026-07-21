import { ListTree } from "lucide-react";

import { EmptyState } from "@/components/cms/empty-state";
import { NavLinkDialog } from "@/components/cms/nav-link-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";

export default async function NavigationPage() {
  const links = await prisma.navLink.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Цэс</h1>
          <p className="text-sm text-muted-foreground">Вэбсайтын дээд цэсэнд харагдах нэр, холбоос, дарааллыг удирдана.</p>
        </div>
        <NavLinkDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Цэсийн холбоосууд</CardTitle>
        </CardHeader>
        <CardContent>
          {links.length === 0 ? (
            <EmptyState
              description="Цэс нэмээгүй үед вэбсайт үндсэн холбоосуудаа автоматаар ашиглана."
              icon={ListTree}
              title="Одоогоор нэмсэн цэс алга"
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Нэр</TableHead>
                  <TableHead>Холбоос</TableHead>
                  <TableHead>Эрэмбэ</TableHead>
                  <TableHead>Төлөв</TableHead>
                  <TableHead className="w-[100px] text-right">Үйлдэл</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">{link.label}</TableCell>
                    <TableCell>{link.href}</TableCell>
                    <TableCell>{link.sortOrder}</TableCell>
                    <TableCell>{link.isActive ? "Идэвхтэй" : "Нуусан"}</TableCell>
                    <TableCell className="text-right">
                      <NavLinkDialog link={link} />
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
