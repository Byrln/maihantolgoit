import { connection } from "next/server";

import { AppSidebar } from "@/components/app-sidebar";
import { AdminTopbarTitle } from "@/components/cms/admin-topbar-title";
import { UserNav } from "@/components/cms/user-nav";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { requireAdminOrRedirect } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await connection();

  const user = await requireAdminOrRedirect();

  return (
    <TooltipProvider>
      <div className="cms-admin">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-background/95 px-3 backdrop-blur sm:px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                <AdminTopbarTitle />
              </div>
              <UserNav user={user} />
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </div>
    </TooltipProvider>
  );
}
