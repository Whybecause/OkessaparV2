import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar, { MySidebarTrigger } from "./components/app-sidebar";
import { isValidSessionCookie } from "@/utils/auth";

async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  // Keep state of sidebar accross reloads
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  // Maybe context to store isAuth for admin page + navbar
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) redirect("/");

  const isValidSession = await isValidSessionCookie(sessionCookie);

  if (!isValidSession) redirect("/");

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
