"use client";

import { ImagePlus, Upload } from "lucide-react";

import { uploadMedia } from "@/app/admin/actions";
import { SubmitButton } from "@/components/cms/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function MediaUploadDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <ImagePlus />
          Зураг нэмэх
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ImagePlus className="size-5" />
            </div>
            <div>
              <DialogTitle>Шинэ зураг оруулах</DialogTitle>
              <DialogDescription>Хуудас, блог, үйлчилгээний хэсэгт ашиглах зургаа нэмнэ.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form action={uploadMedia} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="media-file">Шинэ зураг</Label>
            <Input id="media-file" name="file" accept="image/*" type="file" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="media-alt">Тайлбар</Label>
            <Input id="media-alt" name="alt" placeholder="Жишээ: Майхан толгой үйлчилгээ" />
            <p className="text-xs leading-5 text-muted-foreground">Тайлбар нь зураг хайх, сонгох болон accessibility-д ашиглагдана.</p>
          </div>
          <DialogFooter>
            <SubmitButton pendingLabel="Зураг оруулж байна...">
              <Upload />
              Зураг оруулах
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
