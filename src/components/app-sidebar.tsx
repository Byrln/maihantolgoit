"use client";

import { BedDouble, ExternalLink, FileText, Home, ImageIcon, LayoutDashboard, ListTree, Newspaper, Settings2, TentTree, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const contentItems = [
  { title: "Хяналтын самбар", url: "/admin", icon: LayoutDashboard },
  { title: "Хуудас", url: "/admin/pages", icon: FileText },
  { title: "Байр", url: "/admin/accommodations", icon: BedDouble },
  { title: "Блог", url: "/admin/posts", icon: Newspaper },
  { title: "Үйлчилгээ", url: "/admin/services", icon: TentTree },
  { title: "Зургийн сан", url: "/admin/media", icon: ImageIcon },
];

const settingsItems = [
  { title: "Вэбсайтын цэс", url: "/admin/navigation", icon: ListTree },
  { title: "Хэрэглэгчид", url: "/admin/users", icon: Users },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" tooltip="Майхан CMS">
              <Link href="/admin">
                <div className="flex aspect-square size-9 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                  <TentTree className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Майхан CMS</span>
                  <span className="truncate text-xs text-muted-foreground">Вэбсайт удирдлага</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarLinks label="Агуулга" items={contentItems} pathname={pathname} />
        <SidebarLinks label="Тохиргоо" items={settingsItems} pathname={pathname} />
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Вэбсайт нээх">
              <Link href="/" target="_blank">
                <Home />
                <span>Вэбсайт нээх</span>
                <ExternalLink className="ml-auto size-3.5" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function SidebarLinks({
  items,
  label,
  pathname,
}: {
  items: { title: string; url: string; icon: typeof Settings2 }[];
  label: string;
  pathname: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const active = item.url === "/admin" ? pathname === item.url : pathname.startsWith(item.url);
            return (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                  <Link href={item.url}><item.icon /><span>{item.title}</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
