"use client";
import { getAppMetaData } from "@/app/dashboard/[app_id]/actions";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { AppInfo, AppInfoSchema, AppStatSchema } from "@/types/apps";
import { AccordionContent } from "@radix-ui/react-accordion";
import { validateHeaderName } from "http";
import dynamic from "next/dynamic";
import React, { createContext, useContext, useEffect, useState } from "react";
import { z } from "zod";
import EventSourceContextProvider from "./EventStreamContextProvider";
import LogViewer from "@/components/LogViewer";
import { LucideLoader2 } from "lucide-react";
import DeploymentStatus from "@/components/DeploymentStatus";

// Create a context for the EventSource
const AppStateContext = createContext<AppInfo | undefined>(undefined);
const validStatuses = ["failed", "active"];
export const useAppState = () => {
  return useContext(AppStateContext);
};

export const AppStateContextProvider = ({
  children,
  metadata,
}: {
  metadata: AppInfo | undefined;
  children: React.ReactNode;
}) => {
  const [appState, setAppState] = useState<AppInfo | undefined>(metadata);
  useEffect(() => {}, [metadata]);

  return (
    <AppStateContext.Provider value={appState}>
      {appState?.deployment?.status == "active" ||
      appState?.deployment?.status == "failed" ? (
        children
      ) : (
        <EventSourceContextProvider
          url={`/api/apps/${appState?.deployment.id}/status`}
        >
          <div className="w-full h-full flex items-center justify-center">
            <DeploymentStatus />
          </div>
        </EventSourceContextProvider>
      )}
    </AppStateContext.Provider>
  );
};
