"use client";

import { usePathname } from "next/navigation";

const labels = [
  ["/admin/accommodations", "Байрны мэдээлэл"],
  ["/admin/navigation", "Вэбсайтын цэс"],
  ["/admin/services", "Үйлчилгээ"],
  ["/admin/pages", "Хуудас бүтээгч"],
  ["/admin/posts", "Блог"],
  ["/admin/media", "Зургийн сан"],
  ["/admin/users", "Хэрэглэгчид"],
] as const;

export function AdminTopbarTitle() {
  const pathname = usePathname();
  const label = labels.find(([path]) => pathname.startsWith(path))?.[1] || "Хяналтын самбар";

  return <p className="truncate text-sm font-semibold text-foreground">{label}</p>;
}
