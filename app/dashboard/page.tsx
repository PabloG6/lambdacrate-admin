import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PlusIcon } from "@radix-ui/react-icons";
import { LayoutGrid } from "lucide-react";

import { AppItem } from "@/components/app-item";
import { env } from "@/app/env";
import { NavBar } from "@/components/ui/navbar";
import { getProfile } from "../auth/profile/lib";
import { Octokit } from "octokit";
import { AppInfo } from "@/types/apps";

export default async function Component() {
  const response = await fetch(`${env.API_URL}/api/apps`, {
    cache: "no-cache",
  });
  const appList = await response.json();
  const profile = await getProfile();
 
  return (
    <div className="flex flex-col w-full min-h-screen">
    
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))]  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="lg:max-w-8xl w-full mx-auto">
          <div className="flex w-full justify-end py-1">
            {appList.length > 0 ? (
              <Button size={"icon"} asChild>
                <Link href="/dashboard/create-project">
                  <PlusIcon />
                </Link>
              </Button>
            ) : (
              <></>
            )}
          </div>
          <div className="grid grid-cols-3 gap-7 w-full"></div>
          <>
            {appList.length > 0 ? (
              <div className="grid grid-cols-3 gap-5">
                {appList.map((item: AppInfo) => (
                  <AppItem props={item} key={item.id} />
                ))}
              </div>
            ) : (
              <div className="w-full flex h-full items-center justify-center">
                <div className="flex flex-col items-center w-[330px] gap-6">
                  <LayoutGrid />
                  <div className="text-center mb-6 space-y-4">
                    <h2 className="font-medium text-lg">Your Apps</h2>
                    <p className="text-muted-foreground text-sm">
                      You don&apos;t have any apps. Click the button below to
                      start creating your first app.
                    </p>

                    <Button asChild>
                      <Link href="/dashboard/create-project">
                        Create an app
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
          <div className=" grid grid-cols-3 gap-5 "></div>
        </div>
      </main>
    </div>
  );
}
