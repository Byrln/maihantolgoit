import { Role } from "@prisma/client";
import { Users } from "lucide-react";

import { AccountDialog } from "@/components/cms/account-dialog";
import { EmptyState } from "@/components/cms/empty-state";
import { UserCreatedDialog } from "@/components/cms/user-created-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type UsersPageProps = {
  searchParams?: Promise<{
    created?: string;
    login?: string;
    password?: string;
    user?: string;
  }>;
};

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await searchParams;
  const currentUser = await getCurrentUser();
  const isAdmin = currentUser.role === Role.ADMIN;
  const users = isAdmin
    ? await prisma.user.findMany({ orderBy: [{ role: "asc" }, { createdAt: "asc" }] })
    : [currentUser];

  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      {params?.created && params.login && params.password ? (
        <UserCreatedDialog loginName={params.login} password={params.password} userName={params.user || params.login} />
      ) : null}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Хэрэглэгчид</h1>
          <p className="text-sm text-muted-foreground">
            {isAdmin ? "Админ хэрэглэгч бүртгэлүүдийг удирдана." : "Та зөвхөн өөрийн профайлыг харах боломжтой."}
          </p>
        </div>
        {isAdmin ? <AccountDialog canManage mode="create" /> : <AccountDialog canManage={false} mode="profile" user={currentUser} />}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isAdmin ? "Бүх хэрэглэгч" : "Миний профайл"}</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <EmptyState
              description="Хэрэглэгч нэмсний дараа тэдний эрх, нэвтрэх нэр болон профайлыг эндээс удирдана."
              icon={Users}
              title="Одоогоор хэрэглэгч алга"
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Нэр</TableHead>
                  <TableHead>Нэвтрэх нэр</TableHead>
                  <TableHead>Имэйл</TableHead>
                  <TableHead>Эрх</TableHead>
                  <TableHead className="w-[120px] text-right">Үйлдэл</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name || "Нэргүй"}</TableCell>
                    <TableCell>{user.username || "Байхгүй"}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === Role.ADMIN ? "default" : "secondary"}>
                        {user.role === Role.ADMIN ? "Админ" : "Хэрэглэгч"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <AccountDialog canManage={isAdmin} mode={isAdmin ? "edit" : "profile"} user={user} />
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
