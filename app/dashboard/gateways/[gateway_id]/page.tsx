"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { trpc } from "@/trpc/client";
type ParamProps = {
  gateway_id: string;
};
export default function Page({
  params: { gateway_id },
}: {
  params: ParamProps;
}) {
  const { data } = trpc.gateway.show.useQuery(gateway_id);
  return (
    <>
      <SidebarInset>
        <main className="h-screen p-6 overflow-hidden w-full">
          <div className="flex flex-col gap-3 justify-start">
            <p className="text-xl font-semibold capitalize">{data?.name}</p>
            <p className="text-base text-muted-foreground space-x-2">
              <span>{data?.description}</span>
              <span>&mdash;</span>
              <span className="capitalize font-medium text-foreground">
                {data?.price_id}
              </span>
            </p>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
