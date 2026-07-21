"use client";

import type { User } from "@prisma/client";
import { Loader2, LogOut, UserCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

import { logout } from "@/app/admin/actions";
import { AccountDialog } from "@/components/cms/account-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserNavProps = {
  user: User;
};

export function UserNav({ user }: UserNavProps) {
  const initials = (user.name || user.username || user.email || "Х").slice(0, 2).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2 rounded-full px-2" variant="ghost">
          <Avatar className="size-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium sm:inline">{user.name || user.username || "Миний бүртгэл"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="grid gap-1">
            <span>{user.name || "Нэргүй хэрэглэгч"}</span>
            <span className="truncate text-xs font-normal text-muted-foreground">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex items-center gap-2 px-2 py-1">
          <UserCircle className="size-4 text-muted-foreground" />
          <AccountDialog canManage={false} mode="profile" user={user} triggerLabel="Профайл харах" triggerVariant="ghost" />
        </div>
        <DropdownMenuSeparator />
        <form action={logout}>
          <DropdownMenuItem asChild>
            <LogoutButton />
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <button className="w-full" disabled={pending} type="submit">
      {pending ? <Loader2 className="size-4 animate-spin" /> : <LogOut className="size-4" />}
      {pending ? "Гарч байна..." : "Гарах"}
    </button>
  );
}
