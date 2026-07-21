"use client";

import type { NavLink } from "@prisma/client";
import { LinkIcon } from "lucide-react";

import { deleteNavLink, saveNavLink } from "@/app/admin/actions";
import { ConfirmDelete } from "@/components/cms/confirm-delete";
import { SubmitButton } from "@/components/cms/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type NavLinkDialogProps = {
  link?: NavLink | null;
};

export function NavLinkDialog({ link }: NavLinkDialogProps) {
  const isCreate = !link;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={isCreate ? "default" : "sm"} variant={isCreate ? "default" : "outline"}>
          {isCreate ? "Цэс нэмэх" : "Засах"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <LinkIcon className="size-5" />
            </div>
            <DialogTitle>{isCreate ? "Шинэ цэс" : "Цэс засах"}</DialogTitle>
          </div>
        </DialogHeader>
        <form action={saveNavLink} className="grid gap-4">
          <input name="id" type="hidden" value={link?.id || ""} />
          <div className="grid gap-2">
            <Label htmlFor={`label-${link?.id || "new"}`}>Нэр</Label>
            <Input id={`label-${link?.id || "new"}`} name="label" required defaultValue={link?.label || ""} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`href-${link?.id || "new"}`}>Холбоос</Label>
            <Input id={`href-${link?.id || "new"}`} name="href" required defaultValue={link?.href || ""} placeholder="/about-us" />
          </div>
          <div className="grid gap-2 md:grid-cols-[1fr_auto] md:items-end">
            <div className="grid gap-2">
              <Label htmlFor={`sort-${link?.id || "new"}`}>Эрэмбэ</Label>
              <Input id={`sort-${link?.id || "new"}`} name="sortOrder" type="number" defaultValue={link?.sortOrder ?? 0} />
            </div>
            <label className="flex h-9 items-center gap-2 text-sm text-foreground">
              <input name="isActive" type="checkbox" defaultChecked={link?.isActive ?? true} />
              Идэвхтэй
            </label>
          </div>
          <DialogFooter className="gap-2 sm:justify-between">
            {link ? (
              <ConfirmDelete action={deleteNavLink} id={link.id} itemName={link.label} />
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
