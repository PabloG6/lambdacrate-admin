"use client";

import KPICard from "@/components/kpi-card";
import OverviewChart from "@/components/overview-card";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/trpc/client";
import { BarChart3, CreditCard, Users } from "lucide-react";
type ParamProps = {
  gateway_id: string;
};
export default function Page({
  params: { gateway_id },
}: {
  params: ParamProps;
}) {
  const { data: gateway } = trpc.gateway.show.useQuery(gateway_id);
  return (
    <>
      <main className="h-screen overflow-hidden w-full">
        <div className="flex flex-col gap-3 justify-start">
          <p className="text-xl font-semibold capitalize">{gateway?.name}</p>
          <p className="text-base text-muted-foreground space-x-2">
            <span>{gateway?.description}</span>
            <span>&mdash;</span>
            <span className="capitalize font-medium text-foreground">
              {gateway?.price_id} subscription
            </span>
          </p>
        </div>
        <div className="grid py-3 grid-cols-3 gap-3">
          <KPICard
            title="Total Subscriptions"
            value="2,345"
            change={12.5}
            data={[4, 7, 5, 9, 6, 8, 10, 8, 9, 11, 12]}
            icon={CreditCard}
          />
          <KPICard
            title="Active Customers"
            value="10,234"
            change={-2.3}
            data={[8, 6, 7, 8, 7, 9, 8, 7, 9, 8, 7]}
            icon={Users}
          />
          <KPICard
            title="Total Requests"
            value="45,678"
            change={18.2}
            data={[3, 4, 5, 6, 5, 7, 8, 7, 9, 10, 11]}
            icon={BarChart3}
          />
        </div>
        <Tabs defaultValue="subscriptions">
          <TabsList className="rounded-full gap-3">
            <TabsTrigger
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              value="subscriptions"
            >
              Subscriptions
            </TabsTrigger>
            <TabsTrigger
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              value="customers"
            >
              Customers
            </TabsTrigger>
            <TabsTrigger
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              value="total_requests"
            >
              Total Requests
            </TabsTrigger>
          </TabsList>
          <TabsContent value="subscriptions">
            <OverviewChart></OverviewChart>
          </TabsContent>
          <TabsContent value="customers">
            <OverviewChart></OverviewChart>
          </TabsContent>
          <TabsContent value="total_requests">
            <OverviewChart></OverviewChart>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
