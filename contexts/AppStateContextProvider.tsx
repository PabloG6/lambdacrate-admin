"use client";
import { getAppMetaData } from "@/app/dashboard/[app_id]/actions";
import LogViewer from "@/components/LogViewer";
import { Skeleton } from "@/components/ui/skeleton";
import { AppInfo, AppInfoSchema, AppStatSchema } from "@/types/apps";
import { logSchema } from "@/types/logs";
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
    
    
  
  }, [metadata]);

  return (
    <AppStateContext.Provider value={appState}>
      {(appState?.deployment?.status == "active" ||
        appState?.deployment?.status == "failed" ? children:(
          <div className="w-full h-full flex items-center justify-center">
            <LogViewer id={appState?.deployment.id!}/>
          </div>
        ) )
        }
    </AppStateContext.Provider>
  );
};
