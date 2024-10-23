import { Suspense } from "react";
import Loading from "./[app_id]/loading";
import { NavBar } from "@/components/ui/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import WebSocketContextProvider from "@/contexts/WebsocketContextProvider";
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSideBar from "@/components/ui/app-side-bar";
import ProfileProvider from "@/components/ui/profile/profile-provider";
import DashboardSideBar from "@/components/ui/dashboard-side-bar";

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
