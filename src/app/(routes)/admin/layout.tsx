import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./components/app-sidebar";
import { cookies } from "next/headers";

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
      <div className="max-w-screen-2xl w-full flex ">
        <AppSidebar />
        <main className="mx-auto w-full px-4">
          <SidebarTrigger className="mt-2"/>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

export default AdminLayout;
