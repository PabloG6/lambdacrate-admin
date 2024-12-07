import { Suspense } from "react";
import WebSocketContextProvider from "@/contexts/WebsocketContextProvider";
import ProfileProvider from "@/components/ui/profile/profile-provider";
import Loading from "./_apps/[app_id]/loading";
import { TopBar } from "@/components/top-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full">
      <ProfileProvider>
        <Suspense fallback={<Loading />}>
          <WebSocketContextProvider>
            <div className="flex w-full flex-col items-center">
              <TopBar></TopBar>

              <div className="w-full h-full flex flex-1 max-w-6xl">
                {children}
              </div>
            </div>
          </WebSocketContextProvider>
        </Suspense>
      </ProfileProvider>
    </div>
  );
}
