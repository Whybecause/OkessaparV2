"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { Calendar, LogOut, MicVocal, Music } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { handleErrorClient } from "@/utils/handleErrorClient";

const NAV_ROUTES = [
  { href: "/admin/music", label: "Musique", icon: <Music /> },
  { href: "/admin/shows", label: "Concerts", icon: <Calendar /> },
  { href: "/admin/lyrics", label: "Lyrics", icon: <MicVocal /> },
];
const AppSidebar = () => {
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/logout");
      window.location.reload();
    } catch (error) {
      handleErrorClient(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="icon"
      className="sticky"
    >
      <SidebarHeader className="bg-[rgb(9,12,20)] " />
      <SidebarContent className="bg-[rgb(9,12,20)] text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">
            Admin Dashboard
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ROUTES.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      {item.icon}
                      <span className="text-md">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  <div className="cursor-pointer">
                    <LogOut />
                    <span>Log Out</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
