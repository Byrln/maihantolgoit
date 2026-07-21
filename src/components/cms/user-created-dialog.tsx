"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Copy, LinkIcon } from "lucide-react";

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
    const url = new URL("/login", window.location.origin);
    url.searchParams.set("username", loginName);
    url.searchParams.set("password", password);
    setLoginUrl(url.toString());
  }, [loginName, password]);

  const copyDetails = async () => {
    await navigator.clipboard.writeText(loginUrl);
  };

  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="size-6" />
          </div>
          <DialogTitle>Хэрэглэгч амжилттай үүслээ</DialogTitle>
          <DialogDescription>{userName} хэрэглэгчид энэ холбоосыг өгөөд нэвтрүүлнэ.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Нэвтрэх холбоос</Label>
            <Input value={loginUrl} readOnly />
          </div>
          <Button type="button" onClick={copyDetails}>
            <Copy />
            Холбоос хуулах
          </Button>
          <a className="inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition hover:bg-muted" href={loginUrl} target="_blank">
            <LinkIcon className="size-4" />
            Нэвтрэх хуудсыг нээх
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
