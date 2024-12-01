"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { PlusIcon } from "@radix-ui/react-icons";
import { LayoutGrid } from "lucide-react";

import { trpc } from "@/trpc/client";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorUI from "@/components/error-ui";
import { GatewayItem } from "@/components/gateway-item";
import { CreateGatewayResponse } from "@/trpc/api/gateway/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProfile } from "@/components/ui/profile/profile-provider";
import { useEffect } from "react";
export default function Component() {
  const { data, isPending, isError, isSuccess } = trpc.gateway.list.useQuery();
  useEffect(() => {
    console.log(data);
  }, [data]);
  const profile = useProfile();

  return (
    <div className="flex flex-col w-full h-screen px-4 pb-8">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] overflow-hidden  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        {isPending && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border p-4 rounded-lg">
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-8 w-full mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && <ErrorUI />}
        {isSuccess && (
          <div className="flex flex-col items-center justify-center flex-grow overflow-hidden">
            {data!.length == 0 && (
              <div className="flex w-full h-full items-center justify-center">
                <div className="flex flex-col gap-3 items-center justify-center">
                  <div className="text-lg text-balance max-w-30 text-sm text-muted-foreground">
                    You don&apos;t have any gateways yet.{" "}
                  </div>
                  <LayoutGrid className="h-8 w-8"></LayoutGrid>
                  <Button asChild>
                    <Link href="/dashboard/new-gateway">Create a Gateway</Link>
                  </Button>
                </div>
              </div>
            )}
            {data!.length > 0 ? (
              <>
                <div
                  className="flex w-full  lg:max-w-8xl mx-auto justify-between h-16 items-center
                px-9 py-1"
                >
                  <div className="flex flex-col ">
                    <p className="text-lg font-medium ">
                      Welcome,{" "}
                      <span className="font-mono text-sm">
                        {profile?.email?.split("@")[0]}
                      </span>
                    </p>
                  </div>
                  <Button size={"icon"} asChild>
                    <Link href="/dashboard/new-gateway">
                      <PlusIcon />
                    </Link>
                  </Button>
                </div>

                <ScrollArea
                  className="flex-grow w-full"
                  style={{ maxHeight: "calc(100vh - 8rem)" }}
                >
                  <div className="grid mt-6 px-8 mx-auto lg:max-w-8xl grid-cols-4 h-full gap-5">
                    {data!.map((item: CreateGatewayResponse) => (
                      <GatewayItem data={item} key={item.id} />
                    ))}
                  </div>
                </ScrollArea>
              </>
            ) : (
              <></>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
