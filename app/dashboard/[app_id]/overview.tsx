"use client";
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

type OverviewProps = {
  app_id: string;
  data: AppMetaData;
};

type AppMetaData = {
  id: string;
  name: string;
  app_id: string;
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

export function Overview({ app_id, data }: OverviewProps) {
  const searchParams = useSearchParams();
  const deployment_id = searchParams.get("deployment_id");
  const [status, setStatus] = useState<string | "loading">("loading");
  const [eventSourceStatus, setEventSourceStatus] = useState<"open" | "closed">(
    "open"
  );
  const [machines, setMachines] = useState<any[]>([]);
  useEffect(() => {
    console.log(app_id);
    const eventSource = new EventSource(
      `/api/${app_id}/deployments/${deployment_id}`
    );
    console.log(eventSource);

    eventSource.onmessage = (message) => {
      console.log(message.data);
      //
      //       const data = JSON.parse(message.data);
      //       console.log('data', JSON.parse(data));
      const data = JSON.parse(message.data);
      console.log("parsed data", data);

      setStatus(readableStatuses[data.status]);
      console.log(data)
      setMachines([...data.machines]);

      if (data.status === "active") {
        setEventSourceStatus("closed");

        eventSource.close();
      }
      console.log("status", status);
    };

    eventSource.onerror = (error) => {
      console.error(error);
      console.log("closing");
      setEventSourceStatus("closed");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, eventSourceStatus]);
  return (
    <div className="w-full h-full py-4 space-y-6">
      <div className="py-4 flex flex-col gap-2 space-y-4">
        <div className="text-lg pb-4">{data.name} </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <p className="text-sm text-muted-foreground">Domains</p>
          </div>
          <div className="flex items-center ">
            <Link href={`https://${app_id}.fly.dev`} passHref={true}>
              <span className="text-xs">{app_id}.lambdacrate.com</span>
            </Link>
            <OpenInNewWindowIcon className="ml-2" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <p className="text-sm text-muted-foreground">Status</p>
            {eventSourceStatus == "open" ? (
              <Loader className="animate-[spin_2s_ease-in-out_infinite] w-4 h-4 text-muted-foreground ml-2" />
            ) : (
              <></>
            )}
          </div>

          {status == "loading" ? (
            <Skeleton className="h-4 w-24"></Skeleton>
          ) : (
            <Badge
              className="mb-4 rounded-sm flex-shrink-0"
              variant={"secondary"}
            >
              {status}
            </Badge>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                {" "}
                <User className="h-4 w-4" /> <span>Users</span>
              </CardTitle>
              <CardDescription className="text-semibold">
                357 active users
              </CardDescription>
              <CardContent></CardContent>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <Wallet2 className="h-4 w-4" /> <span>Subscriptions</span>
              </CardTitle>
              <CardDescription className="text-semibold">
                357 subscriptions
              </CardDescription>
              <CardContent></CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
      <Separator className="w-full my-4" />
      <div className="flex gap-2 text-3xl text-orange-500"><p>Hello World</p><p>Hi Again </p></div>
      <div className="space-y-4">
        <p className="text-lg font-semibold">Services</p>
        <Suspense fallback={<>LoadingServices</>}>
          <Services services={machines} />
        </Suspense>
      </div>
    </div>
  );
}

export function OverviewLoading() {
  return <div></div>;
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
  const serviceIcons: { [key: string]: (props: any) => ReactElement<any, any> } = {
    web: (props) => <PanelTop {...props}/>,
    api: (props) => <Cable {...props}/>,
    database: (props) => <Database  {...props}/>,
  };
  console.log("services", []);

  return (
    <div className="w-full h-full border rounded-md">
      {services.map((machine: Machine) => {
      
        console.log(machine, "machine");
        const Icon = serviceIcons[machine.machine_type];
        console.log(Icon, "icon")
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
