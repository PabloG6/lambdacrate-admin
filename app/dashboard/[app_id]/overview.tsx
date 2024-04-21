"use server";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Link1Icon,
  OpenInNewWindowIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import {
  AreaChart,
  Cable,
  CircleDollarSign,
  Copy,
  Database,
  Globe,
  Loader,
  LucideIcon,
  MemoryStick,
  PanelTop,
  User,
  Wallet2,
} from "lucide-react";
import Link from "next/link";
import { getAppMetaData } from "./actions";
import { ReactElement, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { z } from "zod";
import { MachineLoader } from "./_components/machines/machine-loader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type OverviewProps = {
  app_id: string;
  data: AppMetaData;
};

type AppMetaData = {
  // id: string;
  // name: string;
  // app_id: string;
};

const readableStatuses: { [key: string]: string } = {
  init: "Creating App...",
  allocating_ips: "Allocating IPs",
  setting_environment_variables: "Setting Environment",
  creating_database: "Setting up Database",
  building_api: "Building API",
  creating_web_console: "Creating Web Console",
  deploying_app: "Deploying Your App",
  active: "Online",
};

export async function Overview({ app_id, data }: OverviewProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <div className="w-full h-full space-y-6">
      <h2 className="text-2xl font-semibold mb-10">Overview</h2>
      <Tabs className="mb-8" defaultValue="production">
        <TabsList>
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value={"preview"}>Preview</TabsTrigger>
          <TabsTrigger value={"production"}>Production</TabsTrigger>

        </TabsList>
      </Tabs>
      <div className="flex flex-col gap-2 space-y-4">
        <div className="text-lg pb-4">Lambdacrate </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <p className="text-sm text-muted-foreground">Visit Site</p>
          </div>
          <div className="flex items-center ">
            <Link href={`https://${app_id}.lambdacrate.com`} rel="noopener noreferrer" target="_blank">
              <span className="text-xs">{app_id}.lambdacrate.com</span>
            </Link>
            <OpenInNewWindowIcon className="ml-2" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <p className="text-sm text-muted-foreground">Status</p>

            <Loader className="animate-[spin_1.5s_linear_infinite] w-4 h-4 text-muted-foreground ml-2" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Suspense fallback='Loading...'>
        <MachineLoader app_id={app_id} />

        </Suspense>
      </div>
    </div>
  );
}

type Machine = {
  id: string;
  machine_id: string;
  machine_type: string;
};
type ServiceProps = {
  services: any[];
};
function Services({ services }: ServiceProps) {
  // const response = await getDeploymentStatus(app_id);
  const serviceIcons: {
    [key: string]: (props: any) => ReactElement<any, any>;
  } = {
    web: (props) => <PanelTop {...props} />,
    api: (props) => <Cable {...props} />,
    database: (props) => <Database {...props} />,
  };
  console.log("services", []);

  return (
    <div className="w-full h-full border rounded-md">
      {services.map((machine: Machine) => {
        console.log(machine, "machine");
        const Icon = serviceIcons[machine.machine_type];
        console.log(Icon, "icon");
        return (
          <div key={machine.id} className="py-6 px-6 border">
            <div className="space-x-2 pb-4 flex">
              <Icon /> <p className="capitalize">{machine.machine_type}</p>
            </div>
            <span className="text-sm text-muted-foreground font-mono">
              Machine: {machine.machine_id}
            </span>
          </div>
        );
      })}
    </div>
  );
}
