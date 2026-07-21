"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UserCreatedDialogProps = {
  loginName: string;
  password: string;
  userName: string;
};

export function UserCreatedDialog({ loginName, password, userName }: UserCreatedDialogProps) {
  const [loginUrl, setLoginUrl] = useState("/login");

  useEffect(() => {
    setLoginUrl(`${window.location.origin}/login`);
  }, []);

  const copyDetails = async () => {
    await navigator.clipboard.writeText(`Нэвтрэх хаяг: ${loginUrl}\nНэвтрэх нэр: ${loginName}\nНууц үг: ${password}`);
  };

  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="size-6" />
          </div>
          <DialogTitle>Хэрэглэгч амжилттай үүслээ</DialogTitle>
          <DialogDescription>{userName} хэрэглэгчид доорх мэдээллийг өгөөд нэвтрүүлнэ.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Нэвтрэх холбоос</Label>
            <Input value={loginUrl} readOnly />
          </div>
          <div className="grid gap-2">
            <Label>Нэвтрэх нэр</Label>
            <Input value={loginName} readOnly />
          </div>
          <div className="grid gap-2">
            <Label>Түр нууц үг</Label>
            <Input value={password} readOnly />
          </div>
          <Button type="button" onClick={copyDetails}>
            <Copy />
            Мэдээлэл хуулах
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
