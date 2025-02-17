"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

import { handleErrorClient } from "@/utils/error-front";
import { cn } from "@/utils/utils";
import {
  Calendar,
  ChartPie,
  Home,
  LogOut,
  MicVocal,
  Music,
  SquareChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const NAV_ROUTES = [
  { href: "/admin", label: "Dashboard", icon: <ChartPie  /> },
  { href: "/admin/music", label: "Musique", icon: <Music /> },
  { href: "/admin/shows", label: "Concerts", icon: <Calendar /> },
  { href: "/admin/lyrics", label: "Lyrics", icon: <MicVocal /> }
];

export const MySidebarTrigger = () => {
  const { isMobile } = useSidebar();

  return <>{isMobile && <SidebarTrigger className="absolute z-50 top-1" />}</>;
};
const AppSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { open, openMobile, toggleSidebar, isMobile, setOpenMobile } =
    useSidebar();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/logout");
      router.refresh();
    } catch (error) {
      handleErrorClient(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarContent className="bg-[rgb(9,12,20)] text-white">
          {/* Toggle Sidebar */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem className="ml-auto">
                  <SidebarMenuButton
                    onClick={() => toggleSidebar()}
                    className="w-auto "
                  >
                    <SquareChevronRight
                      aria-label="Toggle Sidebar"
                      className={cn(
                        "ml-auto transition-transform duration-300",
                        open || openMobile ? "rotate-180" : ""
                      )}
                    />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-400">
              Admin
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_ROUTES.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      onClick={() => isMobile && setOpenMobile(false)}
                    >
                      <Link href={item.href} aria-label={item.label}>
                        {item.icon}
                        <span className="text-md">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarSeparator />
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={"/"} aria-label="Home">
                      <Home />
                      <span>Retour au site</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator />

        <SidebarFooter className="bg-[rgb(9,12,20)] text-white">
          <SidebarMenu>
            <SidebarMenuSubItem>
              <SidebarMenuButton
                asChild
                onClick={handleLogout}
                disabled={isLoading}
              >
                <div className="cursor-pointer">
                  <LogOut />
                  <span>Déconnexion</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuSubItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
