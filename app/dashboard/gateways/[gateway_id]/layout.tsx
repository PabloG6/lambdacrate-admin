import DashboardSideBar from "@/components/ui/dashboard-side-bar";
import { SidebarInset } from "@/components/ui/sidebar";
import { LayoutProps } from "@/lib/util/props";

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <DashboardSideBar></DashboardSideBar>
      <SidebarInset>
        <div className="w-full h-full p-8">{children}</div>
      </SidebarInset>
    </>
  );
}
