"use client";

import { useAppState } from "@/contexts/AppStateContextProvider";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
interface AppLinkState {
  text: string;
  loading: boolean;
}
export default function AppLink({ app_id }: { app_id: string }) {
  const appState = useAppState();
  const [appLinkState, setAppLinkState] = useState<AppLinkState>({
    text: "",
    loading: true,
  });
  useEffect(() => {
    switch (appState?.deployment?.status) {
      case "active": {
        setAppLinkState({ text: `${app_id}.lambdacrate.com`, loading: false });
        break;
      }
      case "failed": {
        setAppLinkState({ text: `${app_id}.lambdacrate.com`, loading: false });
      }
    }
  }, [appState, app_id]);
  return (
    <div className="flex items-center ">
      {appLinkState.loading && appState?.deployment?.status !== "failed" && (
        <Skeleton className="w-60 h-4"></Skeleton>
      )}
      {appState?.deployment?.status == "active" && (
        <>
          <Link
            href={`https://${app_id}.lambdacrate.com`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="text-xs">{appLinkState.text}</span>
          </Link>
          <OpenInNewWindowIcon className="ml-2" />
        </>
      )}
    </div>
  );
}
