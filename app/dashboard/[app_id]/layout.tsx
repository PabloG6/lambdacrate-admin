"use client";
import { Navbar } from "@/components/navbar";
import { NavLinkProps, SideNav } from "@/components/sidenav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
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
} from "lucide-react";
import {
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
      title: "Appearance",
      href: `/dashboard/${app_id}/appearance`,
      icon: SunMedium,
      segment: "appearance",
      variant: "ghost" as const,
    },
    {
      title: "Domains",
      label: "",
      segment: "domains",
      href: `/dashboard/${app_id}/domains`,
      icon: Globe,
      variant: "ghost" as const,
    },
    {
      title: "Subscription Tiers",
      segment: "subscription-tiers",
      href: `/dashboard/${app_id}/subscription-tiers`,
      icon: Wallet,
      variant: "ghost" as const,
    },
    {
      title: "Feature Flags",
      label: "",
      icon: Flag,
      href: `/dashboard/${app_id}/feature-flags`,
      segment: "feature-flags",
      variant: "ghost" as const,
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
      setTitle(links[0].title)
      return;
    } 

    const link = links.find( l => l.segment === layoutSegment);
    setTitle(link!.title)
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutSegment]);
  const [title, setTitle] = useState("");
  const onSideNavChange = (link: NavLinkProps) => {
  };
  return (
    <>
      <div className="w-full h-full flex">
        <div className="h-full ">
          <div className=" w-full border-b border-r flex justify-center flex-col py-4 px-6">
            <div className="pt-4 space-y-4">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback>L</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Lambdacrate</p>
                  <p className="text-xs text-muted-foreground">
                    sincere-glorious-koala-7hvFmS
                  </p>
                </div>
              </div>
              <div>
                <Select defaultValue="test" value="test">
                  <Label className="font-light text-xs ml-3">Environment</Label>

                  <SelectTrigger className="flex-shrink w-auto min-w-44 border-none hover:bg-gray-100">
                    Choose Environment
                  </SelectTrigger>
                  <SelectContent className="">
                    <SelectItem value="test" className="font-medium">
                      Test
                    </SelectItem>
                    <SelectItem value="production" className="font-medium">
                      Production
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <SideNav
            isCollapsed={false}
            links={links}
            className="py-10 px-6"
            onChange={onSideNavChange}
          />
        </div>
        <div className="w-full h-full">
          <nav className="flex w-full h-16 items-center py-4 px-4 justify-between border-b">
            <div className="flex w-full h-full items-center">
              <span className="text-lg">{title}</span>
            </div>
            <div className="flex w-full"></div>
            <div className="flex w-full"></div>
          </nav>
          <div className="w-full px-12 py-8 h-full max-h-[calc(100vh-64px)] overflow-none">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
