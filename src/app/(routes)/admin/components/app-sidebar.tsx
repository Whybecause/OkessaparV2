"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
import { Calendar, MicVocal, Music } from "lucide-react";

const NAV_ROUTES = [
  { href: "/admin/music", label: "Musique", icon: <Music /> },
  { href: "/admin/shows", label: "Concerts", icon: <Calendar /> },
  { href: "/admin/lyrics", label: "Lyrics", icon: <MicVocal /> },
];
const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="max-h-screen overflow-y-hidden overflow-x-hidden">
        <Sidebar
          side="left"
          variant="sidebar"
          collapsible="icon"
          className="sticky w-full "
        >
          <SidebarHeader className="bg-zinc-950 text-white" />
          <SidebarContent className="bg-zinc-950 text-white">
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-400">
                Admin Dashboard
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {NAV_ROUTES.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                      >
                        <Link href={item.href}>
                          {item.icon}
                          <span className="text-md">{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>
    </>
  );
};

export default AppSidebar;
