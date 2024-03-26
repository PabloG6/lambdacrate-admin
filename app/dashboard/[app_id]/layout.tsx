"use client";
import { Navbar } from "@/components/navbar";
import { NavLinkProps, SideNav } from "@/components/sidenav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectIcon } from "@radix-ui/react-select";
import {
  Archive,
  File,
  ArchiveX,
  Inbox,
  Send,
  Trash2,
  Flag,
  Wallet,
  SatelliteDish,
  SunMedium,
  LayoutDashboard,
  ChevronsUpDown,
  Settings,
  Globe,
  Paintbrush,
  BarChart,
} from "lucide-react";
import {
  useParams,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "react-day-picker";

export default function Layout({
  params: { app_id },
  children,
}: {
  params: { app_id: string };
  children: React.ReactNode;
}) {
  const links = [
    {
      title: "Overview",
      href: `/dashboard/${app_id}`,
      icon: LayoutDashboard,
      segment: null,
      variant: "default" as const,
    },

    {
      title: "Metrics",
      href: `/dashboard/${app_id}/metrics`,
      icon: BarChart,
      segment: 'metrics',
      variant: "default" as const,
    },


    {
      title: "Domains",
      href: `/dashboard/${app_id}/domains`,
      icon: Globe,
      segment: 'domains',
      variant: "default" as const,
    },

    {
      title: "Settings",
      label: "",
      segment: "settings",
      href: `/dashboard/${app_id}/settings`,
      icon: Settings,
      variant: "ghost" as const,
    },
  ];

  const layoutSegment = useSelectedLayoutSegment();

  useEffect(() => {
    if (layoutSegment == null) {
      setTitle(links[0].title);
      return;
    }

    const link = links.find((l) => l.segment === layoutSegment);
    setTitle(link!.title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutSegment]);
  const [title, setTitle] = useState("");
  const onSideNavChange = (link: NavLinkProps) => {};

  return (
    <>
      <nav className="h-12 border-b w-full flex">
          <div className=" pl-8 flex items-center border-r lg:max-w-64 w-full h-full">
          <div className="text-base">{title}</div>
         
        </div>
        <Breadcrumb className="pl-8 flex items-center">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
     
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/dashboard/${app_id}`}>{app_id}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
      </nav>
      <div className="w-full h-full flex">
        <div className="h-screen flex flex-col max-w-64 w-full ">
          <SideNav
            isCollapsed={false}
            links={links}
            className="py-7"
            onChange={onSideNavChange}
          />
        </div>
        <div className="w-full h-full">
          <ScrollArea className="w-full h-screen ">
            <div className="w-full md:p-6 lg:p-8 h-full">{children}</div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
