"use client";

import Link from "next/link";
import Logo from "./logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "./sidebar";
import { UserDropDown } from "./user-dropdown";
import { DashboardIcon } from "@radix-ui/react-icons";
import { UsersIcon, Wallet2Icon } from "lucide-react";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import { useEffect } from "react";

const links = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: UsersIcon,
  },
];
export default function DashboardSideBar() {
  const params = useParams();
  const gatewayID = params["gateway_id"];
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
        {/*fix this open close to fix the sidebar animation*/}
      </SidebarHeader>
      <SidebarContent className="pt-6">
        <SidebarGroup>
          <SidebarMenu>
            {links.map((link) => (
              <SidebarMenuItem key={link.name}>
                <SidebarMenuButton asChild>
                  <Link href={`${link.link}`}>
                    <link.icon />
                    <span>{link.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <UserDropDown />
      </SidebarFooter>
    </Sidebar>
  );
}
