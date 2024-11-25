import { Suspense } from "react";
import { NavBar } from "@/components/ui/navbar";
import WebSocketContextProvider from "@/contexts/WebsocketContextProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import ProfileProvider from "@/components/ui/profile/profile-provider";
import Loading from "./apps/[app_id]/loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full">
      <SidebarProvider className="h-[calc(100%-16px)]">
        <ProfileProvider>
          <Suspense fallback={<Loading />}>
            <WebSocketContextProvider>
              <div className="flex w-full flex-col">
                <div className="w-full h-full flex flex-1">{children}</div>
              </div>
            </WebSocketContextProvider>
          </Suspense>
        </ProfileProvider>
      </SidebarProvider>
    </div>
  );
}
