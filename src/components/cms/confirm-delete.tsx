"use client";

import { Loader2, Trash2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

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

type DeleteAction = (formData: FormData) => void | Promise<void>;

export function ConfirmDelete({
  action,
  id,
  itemName,
  size = "sm",
}: {
  action: DeleteAction;
  id: string;
  itemName: string;
  size?: "default" | "sm";
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button aria-label={`${itemName} устгах`} size={size} type="button" variant="destructive">
          <Trash2 />
          <span className="hidden sm:inline">Устгах</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive">
              <TriangleAlert className="size-5" />
            </div>
            <div className="space-y-2">
              <DialogTitle>Устгахдаа итгэлтэй байна уу?</DialogTitle>
              <DialogDescription>
                <strong className="font-medium text-foreground">{itemName}</strong> бүрмөсөн устах бөгөөд буцаах боломжгүй.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form action={action}>
          <input name="id" type="hidden" value={id} />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Болих
              </Button>
            </DialogClose>
            <DeleteSubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" variant="destructive">
      {pending ? <Loader2 className="animate-spin" /> : <Trash2 />}
      {pending ? "Устгаж байна..." : "Тийм, устгах"}
    </Button>
  );
}
