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
export default function Component() {
  const { data, isPending, isError, isSuccess } = trpc.gateway.list.useQuery();

  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))]  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
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
          <div className="lg:max-w-8xl w-full mx-auto">
            <div className="flex w-full justify-end py-1">
              {data!.length > 0 ? (
                <Button size={"icon"} asChild>
                  <Link href="/dashboard/new-gateway">
                    <PlusIcon />
                  </Link>
                </Button>
              ) : (
                <></>
              )}
            </div>
            <div className="grid grid-cols-3 gap-7 w-full"></div>
            <>
              {data!.length > 0 ? (
                <div className="grid grid-cols-3 gap-5">
                  {data!.map((item: CreateGatewayResponse) => (
                    <GatewayItem data={item} key={item.id} />
                  ))}
                </div>
              ) : (
                <div className="w-full flex h-full items-center justify-center">
                  <div className="flex flex-col items-center w-[330px] gap-6">
                    <LayoutGrid />
                    <div className="text-center mb-6 space-y-4">
                      <h2 className="font-medium text-lg">Your Gateways</h2>
                      <p className="text-muted-foreground text-sm">
                        You don&apos;t have any gateways. Click the button below
                        to start creating your first app.
                      </p>

                      <Button asChild>
                        <Link href="/dashboard/new-gateway">
                          Create a gateway
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
            <div className=" grid grid-cols-3 gap-5 "></div>
          </div>
        )}
      </main>
    </div>
  );
}
