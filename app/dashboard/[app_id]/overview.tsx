"use server";
import {
  AreaChart,
  Cable,
  CircleDollarSign,
  Copy,
  Database,
  Globe,
  LinkIcon,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LandingPage } from "@/components/landing-page";
import { Button } from "@/components/ui/button";
import { Code } from "@/components/ui/code";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { setTimeout } from "timers/promises";
import ConnectTable from "@/components/ConnectTable";

type Props = {
  app_id: string;
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

export async function Overview({ app_id }: Props) {
  const response = await getAppMetaData(app_id);
  const golangExampleCode = `\`\`\ go
  package main
  
  import (
    "fmt"
    "net/http"
  )
  
  func main() {
    url := "https://${app_id}-dev-api.lambdacrate.dev/api/health"
    resp, err := http.Get(url)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    defer resp.Body.Close()
  
    if resp.StatusCode == http.StatusOK {
        fmt.Println("200 OK")
    } else {
        fmt.Printf("Status Code: %d\n", resp.StatusCode)
    }
  }
  \`\`\``;

  const pythonExampleCode = `
  import requests



url = 'https://${app_id}.lambdacrate.dev/api/health'
response = requests.get(url)
  
if response.status_code == 200:
   print('200 OK')
else:
   print(f'Status Code: {response.status_code}')
  `;

  const bashExampleCode = `\`\`\`\ bash
 $ lambdacrate connect -a ${app_id}
\`\`\`
  `;

  return (
    <div className="space-y-8">
      <div className="text-xl font-medium text-foreground">
        {response.name}{" "} 
      </div>

      <section className="mb-6">
        <div className="grid grid-cols-8 gap-16">
          <div className="col-span-3">
            <p className="text-base font-medium mb-2">
              Welcome to your new project
            </p>
            <p className="text-muted-foreground text-sm">
              Your project has been deployed on its own instance, with its own
              API and dashboard all set up and ready to use.
            </p>
          </div>
          <div className="col-span-5">
            <ConnectTable app_id={app_id}></ConnectTable>
          </div>
        </div>
      </section>
      <section className="mb-6 space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4 max-w-lg">
            <h3 className="text-base font-medium">
              Connect to your dev environment
            </h3>

            <p className="text-sm text-muted-foreground">
              Copy the following command to start developing on your local
              machine
            </p>
            <Card>
              <Code
                code={bashExampleCode}
                lang="bash"
                className="text-sm"
              ></Code>
            </Card>
          </div>
        </div>
      </section>
      <section>
        <div className="w-full flex items-center justify-center py-6">
          <p className="text-lg font-medium">Explore other features of your app</p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Card className="px-3 py-3">
            <p className="text-sm font-medium">Create  a subcription tier</p>
            <div className="py-4">
              <p className="text-xs">
                Add a new subscription tier to test feature limitations for your users.
              </p>
            </div>
          </Card>
          <Card className="px-3 py-3">
            <p className="text-sm font-medium">View logs and metrics</p>
            <div className="py-4">
              <p className="text-xs">
                Get a bird&apos;s eye view of customers, usage metrics, churn, and monthly earnings.
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
                Register your domain with lambdacrate to start routing traffic to your application
              </p>
            </div>
          </Card>{" "}
          <Card className="px-3 py-3">
            <p className="text-sm font-medium"><span>Explore our documentation</span></p>
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

type Machine = {
  id: string;
  machine_id: string;
  machine_type: string;
};
