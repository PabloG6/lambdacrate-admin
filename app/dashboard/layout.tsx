import { Suspense } from "react";
import Loading from "./[app_id]/loading";
import { NavBar } from "@/components/ui/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar></NavBar>
      <Suspense fallback={<Loading />}><ScrollArea className="h-[calc(100vh-20px)] w-full">
      {children}</ScrollArea></Suspense>
    </>
  );
}
