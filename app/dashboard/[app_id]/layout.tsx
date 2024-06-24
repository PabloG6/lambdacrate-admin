"use server";
import { Navbar } from "@/components/navbar";
import { NavLinkProps, SideNav } from "@/components/sidenav";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AppStateContextProvider } from "@/contexts/AppStateContextProvider";

import {

  LayoutDashboard,

  Settings,
  Globe,

  BarChart,
  Container,
  Building2,
} from "lucide-react";
import {

  useSelectedLayoutSegment,

} from "next/navigation";
import { useEffect, useState } from "react";
import { getAppMetaData } from "./actions";

export  default async function Layout({
  params: { app_id },
  children,
}: {
  params: { app_id: string };
  children: React.ReactNode;
}) {
  const links: NavLinkProps[] = [
    {
      title: "Overview",
      href: `/dashboard/${app_id}`,
      icon: LayoutDashboard,
      segment: null,
      variant: "default" as const,
    },

    {
      title: "Build Logs",
      href: `/dashboard/${app_id}/build_logs`,
      icon: Building2,
      segment: "build_logs",
      variant: "default" as const,
    },
    {
      title: 'Environment',
      segment: 'environment',
      label: '',
      href: `/dashboard/${app_id}/environment`,
      icon: Container,
      variant: 'ghost' as const,
      
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

  // const layoutSegment = useSelectedLayoutSegment();

  // useEffect(() => {
  //   if (layoutSegment == null) {
  //     setTitle(links[0].title);
  //     return;
  //   }

  //   const link = links.find((l) => l.segment === layoutSegment);
  //   setTitle(link!.title);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [layoutSegment]);
  // const [title, setTitle] = useState("");
  const onSideNavChange = (link: NavLinkProps) => {};
  const metadata = await getAppMetaData(app_id);


  return (
    <AppStateContextProvider metadata={metadata} >
   
      <div className="w-full h-full flex">
        <div className="h-screen flex flex-col max-w-60 w-full ">
       
    
        </div>
        <div className="w-full h-full">
   
            <div className="w-full md:p-6 lg:p-12 lg:pl-16 h-full shadow-sm">{children}</div>
            <div className="gutter py-16"></div>

        </div>
      </div>
    </AppStateContextProvider>
  );
}
