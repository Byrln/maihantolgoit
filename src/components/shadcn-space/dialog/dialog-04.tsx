"use client";

import { MailIcon, ShieldIcon } from "lucide-react";

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

export default function Dialog04() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Профайл харах</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarFallback>АД</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle>Админ хэрэглэгч</DialogTitle>
              <DialogDescription>Бүртгэлийн мэдээлэл</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="grid gap-2 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MailIcon className="size-4" />
            <span>admin@maikhan-tolgoi.mn</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldIcon className="size-4" />
            <span>Админ эрхтэй</span>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Хаах</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
