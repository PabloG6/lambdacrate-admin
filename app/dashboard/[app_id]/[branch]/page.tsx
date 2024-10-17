"use client";
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  LinkIcon,
  Loader2,
  MoreVerticalIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { trpc } from "@/trpc/client";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

import { formatDistance } from "date-fns";
import router, { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import LogViewer from "@/components/LogViewer";
import DashboardStatus from "@/components/DashboardStatus";
import { useEffect, useState } from "react";
import WebSocketContextProvider, {
  useDeploymentChannel,
} from "@/contexts/WebsocketContextProvider";
import { z } from "zod";
import { BuildEventSchema } from "@/types/events";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { branchSearchParams } from "@/trpc/api/branches/types";
import { GetBranchType } from "@/types/apps";
import { Row } from "react-day-picker";
/**
 * design ui that shows status of active deployment
 * - display status of dashboard deployment ()
 *
 *
 */

type ParamsProps<T> = {
  params: T;
};
type Props = {
  app_id: string;
  branch: string;
};
export default function Page({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Props;
}) {
  console.log("params: ", params);
  return (
    <WebSocketContextProvider>
      <Overview app_id={params.app_id} branch_slug={params.branch}></Overview>
    </WebSocketContextProvider>
  );
}
export function Overview({
  app_id,
  branch_slug,
}: {
  app_id: string;
  branch_slug: string;
}) {

  const { data: branch } = trpc.branches.showDetails.useQuery({
    slug: branch_slug,
  });

  const { data: appData } = trpc.apps.showDetails.useQuery({
    id: app_id,
  });

  const [isBuilding, setIsBuilding] = useState<boolean>(true);

  useEffect(() => {

    setStatus(updateStatus(branch?.active_deployment?.status!));

    if (
      branch?.active_deployment?.status == "done" ||
      branch?.active_deployment?.status == "failed"
    ) {
      setIsBuilding(false);
    }
  }, [branch?.active_deployment?.status]);
  const [status, setStatus] = useState<string>(
    updateStatus(branch?.active_deployment?.status!)
  );



  const [deploymentChannel] = useDeploymentChannel(
    branch?.active_deployment?.id!
  );
  useEffect(() => {
    console.log("deploymentChannel", deploymentChannel);
    deploymentChannel?.on("logs", (event) => {
      console.log(event);
    });

    deploymentChannel?.on("build_event", (event) => {
      const buildEvent = BuildEventSchema.parse(event);

      setStatus(updateStatus(buildEvent.deployment.status));
    });
  }, [deploymentChannel]);

  const router = useRouter();
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-3xl font-semibold leading-4 pb-10 pt-8">
            Overview
          </h3>
          <div className="mt-3 mb-4 space-y-3">
            <div className="flex gap-3 items-center">
              <h4 className="text-lg font-normal leading-5">{appData?.name}</h4>
              <Badge variant={"outline"} className="text-sm space-x-2">
                <span>{status}</span>
                {isBuilding ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <></>
                )}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between lg:max-w-5xl">
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold">Your Domain</h4>
          <div className="text-xs gap-2 flex items-center">
            <span className="block max-w-[300px] overflow-ellipsis whitespace-nowrap overflow-hidden">
              {app_id}-{branch_slug}.lambdacrate.com{" "}
            </span>
            <div className=" py-1 px-2 flex gap-1 items-center rounded-full cursor-pointer">
              <ExternalLinkIcon className="h-4 w-4"></ExternalLinkIcon>
            </div>
          </div>
        </div>
        <Button className="justify-between flex "><span>Redeploy</span><MoreVerticalIcon className="ml-2 w-4 h-4"/></Button>
        </div>
      </div>

      <div className="lg:max-w-5xl border">

              <DataTable columns={[]} data={[]} schema={branchSearchParams} onRowSelected={(value: GetBranchType) => {
                
              }}/>

      </div>
      <DashboardStatus className="lg:max-w-5xl border rounded-lg"></DashboardStatus>

      <section>
        <div className="w-full flex items-center justify-center py-6">
          <p className="text-lg font-medium">
            Explore other features of your app
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Card className="px-3 py-3">
            <p className="text-sm font-medium">Create a subcription tier</p>
            <div className="py-4">
              <p className="text-xs">
                Add a new subscription tier to test feature limitations for your
                users.
              </p>
            </div>
          </Card>
          <Card className="px-3 py-3">
            <p className="text-sm font-medium">View logs and metrics</p>
            <div className="py-4">
              <p className="text-xs">
                Get a bird&apos;s eye view of customers, usage metrics, churn,
                and monthly earnings.
              </p>
            </div>
          </Card>{" "}
          <Card className="px-3 py-3">
            <div className="flex items-center">
              <LinkIcon className="mr-2 h-3 w-3"></LinkIcon>
              <p className="text-sm font-medium">Add a custom domain</p>
            </div>
            <div className="py-4">
              <p className="text-xs">
                Register your domain with lambdacrate to start routing traffic
                to your application
              </p>
            </div>
          </Card>{" "}
          <Card className="px-3 py-3">
            <p className="text-sm font-medium">
              <span>Explore our documentation</span>
            </p>
            <div className="py-4">
              <p className="text-xs">
                Read the docs to learn more about lambdacrate and its features.{" "}
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

const updateStatus = (
  status:
    | "build_image"
    | "push_secrets"
    | "push_image"
    | "set_env_vars"
    | "init_api"
    | string
) => {
  switch (status) {
    case "init":
      return "Initializing"
    case "build_image":
      return "Building Image";
    case "push_secrets":
      return "Setting up your environment";
    case "push_image":
      return "Pushing Image";
    case "set_env_vars":
    case "init_database":
      return "Creating Database";

    case "failed":
      return "Failed"
    default:
      return status;
  }
};
