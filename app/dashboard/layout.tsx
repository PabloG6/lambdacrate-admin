import { Suspense } from "react";
import { NavBar } from "@/components/ui/navbar";
import WebSocketContextProvider from "@/contexts/WebsocketContextProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import ProfileProvider from "@/components/ui/profile/profile-provider";
import DashboardSideBar from "@/components/ui/dashboard-side-bar";
import Loading from "./apps/[app_id]/loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProfileProvider>
        <SidebarProvider>
          <DashboardSideBar></DashboardSideBar>

          <Suspense fallback={<Loading />}>
            <WebSocketContextProvider>
              <main className="w-full">
                <NavBar></NavBar>
                {children}
              </main>
            </WebSocketContextProvider>
          </Suspense>
        </SidebarProvider>
      </ProfileProvider>
    </>
  );
}
