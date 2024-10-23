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
import { Settings2 } from "lucide-react";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect } from "react";

const links = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: DashboardIcon,
  },
  {
    name: "Settings",
    link: "/settings",
    icon: Settings2,
  },
];
export default function DashboardSideBar() {
  const {open, setOpen} = useSidebar();
  const layoutSegment = useSelectedLayoutSegment();
  useEffect(() => {
    if(layoutSegment != null) {
        setOpen(false);
    } else {
        setOpen(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutSegment]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo />
        {/*fix this open close to fix the sidebar animation*/}
        {open ? <div>dashboard</div> : <></>}
      </SidebarHeader>
      <SidebarContent className="pt-6">
        <SidebarGroup>
          <SidebarMenu>
            {links.map((link) => (
              <SidebarMenuItem key={link.name}>
                <SidebarMenuButton asChild>
                  <Link href={link.link}>
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
