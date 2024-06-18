import { NavLink } from "@/components/navbar";
import { Overview } from "./overview";
import { Suspense } from "react";
import Link from "next/link";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";

import ProgressBadge from "@/components/ui/ProgressBadge";
import StatusBadge from "@/components/ui/StatusBadge";
import { AppStateContextProvider } from "@/contexts/AppStateContextProvider";
import AppLink from "@/components/AppLink";

export default async function Page({
  params: { app_id },
}: {
  params: { app_id: string };
}) {
  return (
      <div className="h-full w-full space-y-6">
        <div className="w-full h-full space-y-6">
          <div className="flex gap-4">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <Suspense fallback={<ProgressBadge />}>
              <StatusBadge app_id={app_id}></StatusBadge>
            </Suspense>
          </div>

          <div className="flex flex-col gap-2 space-y-4">
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <p className="text-sm text-muted-foreground">Visit Site</p>
              </div>
              <AppLink app_id={app_id}></AppLink>
            </div>
            <div className="space-y-2">
              <div className="flex items-center"></div>
            </div>
          </div>
          <Suspense fallback="Loading...">
            <Overview app_id={app_id} />
          </Suspense>
        </div>
      </div>
  );
}
