'use client';

import { useAppState } from "@/contexts/AppStateContextProvider";

export default function OverviewDescription({app_id} : {app_id: string}) {

    const appState = useAppState();
    console.log(appState);
    return <>
    {appState?.status == 'active'} 
    <div className="col-span-3">
            <p className="text-base font-medium mb-2">
              Welcome to your new project
            </p>
            <p className="text-muted-foreground text-sm">
              Your project has been deployed on its own instance, with its own
              API and dashboard all set up and ready to use.
            </p>
          </div></>
}