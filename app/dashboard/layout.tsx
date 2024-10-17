import { Suspense } from "react";
import Loading from "./[app_id]/loading";
import { NavBar } from "@/components/ui/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import WebSocketContextProvider from "@/contexts/WebsocketContextProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar></NavBar>
      <Suspense fallback={<Loading />}>
      <WebSocketContextProvider>
      <ScrollArea className="h-[calc(100vh-3.5rem)] w-full">
          {children}
        </ScrollArea>
      </WebSocketContextProvider>
        
      </Suspense>
    </>
  );
}
