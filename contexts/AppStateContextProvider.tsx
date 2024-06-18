"use client";
import { getAppMetaData } from "@/app/dashboard/[app_id]/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { AppInfo, AppInfoSchema, AppStatSchema } from "@/types/apps";
import { validateHeaderName } from "http";
import React, { createContext, useContext, useEffect, useState } from "react";
import { z } from "zod";

// Create a context for the EventSource
const AppStateContext = createContext<AppInfo | undefined>(undefined);
const validStatuses = ['failed', 'active'];
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
  useEffect(() => {
    if(metadata != undefined && !validStatuses.includes(metadata.deployment.status)) {
      let es: EventSource = new EventSource(`/api/apps/${metadata.app_id}/status`)
      es.onmessage = (event) => {
        const results = JSON.stringify(event.data)
        setAppState(AppInfoSchema.parse(results));
      }
      return () => {
        es.close();
      };
    }
  
  }, [metadata]);

  return (
    <AppStateContext.Provider value={appState}>
      {(appState?.deployment?.status == "active" ||
        appState?.deployment?.status == "failed" ? children:(
          <div className="w-full h-full flex items-center justify-center">
            <Skeleton className="h-4 w-22"></Skeleton>
          </div>
        ) )
        }
    </AppStateContext.Provider>
  );
};
