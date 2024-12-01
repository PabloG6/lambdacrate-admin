"use client";

import { AppInfo } from "@/types/apps";

import React, { createContext, useContext, useEffect, useState } from "react";

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
    <></>
  );
};
