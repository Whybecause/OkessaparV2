import { cookies } from "next/headers";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar, { MySidebarTrigger } from "./components/app-sidebar";

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
      <AppSidebar />

      <div className="max-w-screen-2xl mx-auto flex flex-col w-full px-4">
        <MySidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  );
}

export default AdminLayout;
