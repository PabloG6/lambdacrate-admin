"use server";
import { NavLinkProps, SideNav } from "@/components/sidenav";
import AppSideBar from "@/components/ui/app-side-bar";
import { SidebarProvider } from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  Settings,
  Globe,
  BarChart,
  Container,
  Building2,
} from "lucide-react";
import { useSelectedLayoutSegment } from "next/navigation";

export default async function Layout({
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
      title: "Environment",
      segment: "environment",
      label: "",
      href: `/dashboard/${app_id}/environment`,
      icon: Container,
      variant: "ghost" as const,
    },
    {
      title: "Metrics",
      href: `/dashboard/${app_id}/metrics`,
      icon: BarChart,
      segment: "metrics",
      variant: "default" as const,
    },

    {
      title: "Domains",
      href: `/dashboard/${app_id}/domains`,
      icon: Globe,

      segment: "domains",
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

  return (
    <SidebarProvider className="h-full">
      <AppSideBar/>
      <main className="w-full h-full flex px-8 mt-4">{children}</main>
    </SidebarProvider>
  );
}
