"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { Calendar, Home, LogOut, MicVocal, Music } from "lucide-react";

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
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { handleErrorClient } from "@/utils/error-front";

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
    <Sidebar side="left" variant="sidebar" collapsible="icon">
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
              <SidebarSeparator />
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/"}>
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
  );
};

export default AppSidebar;
