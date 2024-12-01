"use client";
import { Loader2, LoaderCircle } from "lucide-react";


import { Badge } from "@/components/ui/badge";
import { setTimeout } from "timers/promises";
import { useEffect, useState } from "react";
import { AppStatSchema } from "@/types/apps";
import { z } from "zod";
import { useAppState } from "@/contexts/AppStateContextProvider";
interface BadgeStatus {
  text: string;
  loading: boolean;
}
export default function StatusBadge(props: { app_id: string }) {
  const appState = useAppState();
  
  const [badgeStatus, setBadgeStatus] = useState<BadgeStatus>({text: "Loading...", loading: true});
  useEffect(() => {
    // switch (appState?.deployment?.status) {
    //   case "failed": {
    //     console.log()
    //     setBadgeStatus({text: "This deployment has failed", loading: false});
    //     break;
    //   }

    //   case "active": {
    //     setBadgeStatus({loading: false, text: "Your project is ready"});
    //     break;
    //   }

    //   case undefined: {
    //     setBadgeStatus({loading: true, text: "Retrieving deployment status"})
    //     break;
    //   }
    //   default: {
    //     console.log(appState);
    //     setBadgeStatus({text: "Status unknown", loading: true});

    //   }
    // }
  }, [appState]);

  return (
    <Badge variant={"outline"} className="text-xs font-medium space-x-2 px-4">
      {badgeStatus.loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
      <span>{badgeStatus.text}</span>
    </Badge>
  );
}
