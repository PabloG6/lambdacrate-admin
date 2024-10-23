"use client";

import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, GitBranch, Globe, LogOut, Mail, Settings, Settings2, Sparkles } from "lucide-react";
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
  SidebarTrigger,
} from "./sidebar";
import { useParams } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import {UserDropDown} from "./user-dropdown";


  
const items = [
  {
    title: "Branches",
    url: "#",
    icon: GitBranch,
  },
  {
    title: "Domains",
    url: "#",
    icon: Globe,
  },
  {
    title: "Email",
    url: "#",
    icon: Mail,
  },

  {
    title: "Settings",
    url: "#",
    icon: Settings2,
  },
];

export default function AppSideBar() {
    const params = useParams<{app_id?: string}>();
  return (
    <Sidebar collapsible="none">
      <SidebarContent className="h-full">
        <SidebarGroup>
          <SidebarGroupLabel>App Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
 
    </Sidebar>
  );
}
