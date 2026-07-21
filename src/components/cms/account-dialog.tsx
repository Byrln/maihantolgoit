"use client";

import type { Role, User } from "@prisma/client";
import type { ComponentProps } from "react";
import { KeyRoundIcon, MailIcon, ShieldIcon, UserIcon } from "lucide-react";

import { deleteUser, saveProfile, saveUser } from "@/app/admin/actions";
import { ConfirmDelete } from "@/components/cms/confirm-delete";
import { SubmitButton } from "@/components/cms/submit-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type AccountDialogProps = {
  canManage: boolean;
  mode?: "create" | "edit" | "profile";
  triggerLabel?: string;
  triggerVariant?: ComponentProps<typeof Button>["variant"];
  user?: User | null;
};

export function AccountDialog({ canManage, mode = "profile", triggerLabel, triggerVariant, user }: AccountDialogProps) {
  const isCreate = mode === "create";
  const action = canManage && mode !== "profile" ? saveUser : saveProfile;
  const initials = (user?.name || user?.username || user?.email || "Х").slice(0, 2).toUpperCase();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant={triggerVariant || (isCreate ? "default" : "outline")}>
          {triggerLabel || (isCreate ? "Хэрэглэгч нэмэх" : canManage && mode === "edit" ? "Засах" : "Миний профайл")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-[440px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle>{isCreate ? "Шинэ хэрэглэгч" : user?.name || "Хэрэглэгч"}</DialogTitle>
              <DialogDescription>{canManage && mode !== "profile" ? "Бүртгэлийн мэдээлэл удирдах" : "Өөрийн профайлын мэдээлэл"}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form action={action} className="grid gap-4">
          <input name="id" type="hidden" value={user?.id || ""} />
          <div className="grid gap-2">
            <Label htmlFor={`name-${user?.id || "new"}`}>Нэр</Label>
            <div className="relative">
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input id={`name-${user?.id || "new"}`} className="pl-9" name="name" defaultValue={user?.name || ""} />
            </div>
          </div>

          {canManage && mode !== "profile" ? (
            <div className="grid gap-2">
              <Label htmlFor={`username-${user?.id || "new"}`}>Нэвтрэх нэр</Label>
              <div className="relative">
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id={`username-${user?.id || "new"}`}
                  className="pl-9"
                  name="username"
                  defaultValue={user?.username || ""}
                  placeholder="Жишээ: bold"
                />
              </div>
              {isCreate ? <p className="text-xs text-muted-foreground">Нууц үг хоосон үлдээвэл автоматаар үүсээд дараагийн цонхонд харагдана.</p> : null}
            </div>
          ) : null}

          <div className="grid gap-2">
            <Label htmlFor={`email-${user?.id || "new"}`}>Имэйл</Label>
            <div className="relative">
              <MailIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id={`email-${user?.id || "new"}`}
                className="pl-9"
                name="email"
                type="email"
                defaultValue={user?.email || ""}
                disabled={!canManage || mode === "profile"}
                required={canManage}
              />
            </div>
          </div>

          {canManage && mode !== "profile" ? (
            <div className="grid gap-2">
              <Label>Эрх</Label>
              <Select name="role" defaultValue={(user?.role || "USER") as Role}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <ShieldIcon className="size-4 text-muted-foreground" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Админ</SelectItem>
                  <SelectItem value="USER">Хэрэглэгч</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : null}

          {canManage && mode !== "profile" ? (
            <div className="grid gap-3 rounded-md border bg-muted/20 p-3">
              <div className="grid gap-1">
                <Label htmlFor={`password-${user?.id || "new"}`}>{isCreate ? "Нууц үг" : "Шинэ нууц үг"}</Label>
                <div className="relative">
                  <KeyRoundIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id={`password-${user?.id || "new"}`}
                    className="pl-9"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder={isCreate ? "Хоосон бол автоматаар үүснэ" : "Солихгүй бол хоосон үлдээнэ"}
                  />
                </div>
              </div>
              <div className="grid gap-1">
                <Label htmlFor={`password-confirm-${user?.id || "new"}`}>Нууц үг давтах</Label>
                <Input
                  id={`password-confirm-${user?.id || "new"}`}
                  name="passwordConfirm"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Дээрх нууц үгийг давтана"
                />
              </div>
            </div>
          ) : null}

          {!canManage || mode === "profile" ? (
            <div className="grid gap-3 rounded-md border bg-muted/20 p-3">
              <div className="grid gap-1">
                <Label htmlFor={`current-password-${user?.id || "me"}`}>Одоогийн нууц үг</Label>
                <div className="relative">
                  <KeyRoundIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id={`current-password-${user?.id || "me"}`}
                    className="pl-9"
                    name="currentPassword"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Нууц үг солих үед бөглөнө"
                  />
                </div>
              </div>
              <div className="grid gap-1">
                <Label htmlFor={`profile-password-${user?.id || "me"}`}>Шинэ нууц үг</Label>
                <Input
                  id={`profile-password-${user?.id || "me"}`}
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Солихгүй бол хоосон үлдээнэ"
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor={`profile-password-confirm-${user?.id || "me"}`}>Шинэ нууц үг давтах</Label>
                <Input
                  id={`profile-password-confirm-${user?.id || "me"}`}
                  name="passwordConfirm"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Шинэ нууц үгийг давтана"
                />
              </div>
            </div>
          ) : null}

          <DialogFooter className="gap-2 sm:justify-between">
            {canManage && user && mode === "edit" ? (
              <ConfirmDelete action={deleteUser} id={user.id} itemName={user.name || user.email} />
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Болих
                </Button>
              </DialogClose>
              <SubmitButton pendingLabel="Хадгалж байна...">Хадгалах</SubmitButton>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
