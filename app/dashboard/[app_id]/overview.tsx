import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link1Icon, OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { AreaChart, Copy, Database, Globe, MemoryStick } from "lucide-react";
import Link from "next/link";
import { getAppMetaData } from "./actions";
import { endpoint } from "@/app/env";
import { Suspense } from "react";

type OverviewProps = {
  app_id: string;
};

type AppMetaData = {
  id: string;
  name: string;
  app_id: string;
};

async function getDeploymentStatus(app_id: string) {
  const response = await fetch(`${endpoint}/api/apps/${app_id}/status`, {
    headers: {
      "content-type": "application/json",
    },
    cache: "no-cache",
  });

  if (response.ok) {
    return await response.json();
  }
}
export async function Overview({ app_id }: OverviewProps) {
  const appMetaData = await getAppMetaData(app_id);

  return (
    <div className="w-full h-full py-4 space-y-6">
      <div className="py-4 flex flex-col gap-2 space-y-4">
        <div className="text-lg pb-4">{appMetaData.name} </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <p className="text-sm text-muted-foreground">Domains</p>
          </div>
          <div className="flex items-center ">
            <Link href="#" passHref={true}>
              <span className="text-xs">{app_id}.lambdacrate.com</span>
            </Link>
            <OpenInNewWindowIcon className="ml-2" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Your Plan</p>

          <Badge
            className="mb-4 rounded-sm flex-shrink-0"
            variant={"secondary"}
          >
            Test Plan
          </Badge>
        </div>
      </div>
      <Separator className="w-full my-4" />

      <div className="space-y-4">
        <p className="text-lg font-semibold">Services</p>
        <Suspense fallback={<>LoadingServices</>}>
          <Services app_id={app_id} />
        </Suspense>
      </div>
    </div>
  );
}

export function OverviewLoading() {
  return <div></div>;
}

async function Services({ app_id }: OverviewProps) {
  const response = await getDeploymentStatus(app_id);
  console.log(response);
  return (
    <div className="w-full h-full border rounded-md">
      {response.machines.map((machine: any) => (
        <div key={machine.id} className="py-6 px-6 border">
          <div className="space-x-2 pb-4 flex">
            <Database /> <p>Database</p>
          </div>
          <span className="text-sm text-muted-foreground font-mono">
            Machine: {machine.machine_id}
          </span>
        </div>
      ))}
    </div>
  );
}
