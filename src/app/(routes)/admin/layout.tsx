import { cookies } from "next/headers";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./components/app-sidebar";

async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  // Keep state of sidebar accross reloads
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="w-full flex ">
        <AppSidebar />

        <main className="flex-1 px-4 overflow-y-hidden">
          <SidebarTrigger className="mt-2" />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

export default AdminLayout;
