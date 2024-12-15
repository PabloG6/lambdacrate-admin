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
} from "./sidebar";
import { UserDropDown } from "./user-dropdown";
import { CircleGaugeIcon, KeyIcon, UsersIcon, Wallet2Icon } from "lucide-react";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import { DashboardIcon } from "@radix-ui/react-icons";

const links = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: CircleGaugeIcon,
  },
  {
    name: "Api Keys",
    link: "/dashboard/settings/apikeys",
    icon: KeyIcon,
  },
];
export default function DashboardSideBar() {
  const params = useParams();
  return (
    <Sidebar>
      <SidebarHeader className="h-14 border-b flex justify-center">
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
