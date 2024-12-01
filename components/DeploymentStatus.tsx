"use client";

import { CpuIcon, DatabaseIcon, FileIcon, LucideLoader2, ServerIcon, WebhookIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import LogViewer from "./LogViewer";
import { useEventStream } from "@/contexts/EventStreamContextProvider";
import { use, useEffect, useState } from "react";
import { AppInfoEvent } from "@/types/events";
import { Badge } from "./ui/badge";

export default function DeploymentStatus() {
  const eventStream = useEventStream();
  const [currentState, setCurrentState] = useState<string>("build_image");
  const [buildLogsProgress, setBuildProgress] = useState<number>(0);
  useEffect(() => {
    // const interval = setInterval(() => {
    //   setBuildProgress((buildProgress) => buildProgress++);
    //   console.log('calling set interval');
    //   if (buildLogsProgress > 60) {
        
    //     clearInterval(interval);
    //   }
    // }, 1000);

    return () => {
      // clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    const event = eventStream.findLast((e) => e.event_type === "apps");
    console.log('event', event);
    if (event) {
   
    }
  }, [eventStream]);
  return (
    <Accordion
      type="single"
      className="w-full max-w-5xl"
      value={currentState}
      collapsible
      onValueChange={setCurrentState}
    >
      <AccordionItem value="build_image">
        <AccordionTrigger>
          <div className="flex w-full items-end gap-4 ">
     
            <span>Build Logs</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <LogViewer event_type="logs" />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="push_image">
        <AccordionTrigger>Pushing your project</AccordionTrigger>
        <AccordionContent>
          <LogViewer event_type="progress" />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="push_secrets">
        <AccordionTrigger>Setting your environment variables</AccordionTrigger>
        <AccordionContent>
          <span>Do something here to show success. </span>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="deploying_app">
        <AccordionTrigger>Deploying Your Application</AccordionTrigger>
        <AccordionContent>
        <main className="flex-1 bg-background p-6">
            <div className="max-w-4xl mx-auto grid gap-6">
              <div className="grid gap-4">
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                  <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10">
                    <DatabaseIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">Database</div>
                    <div className="text-sm text-muted-foreground">Stores all application data</div>
                  </div>
                  <div>
                    <Badge variant="outline" className="In Progress">
                      In Progress
                    </Badge>
                  </div>
                </div>
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                  <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10">
                    <WebhookIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">Web App</div>
                    <div className="text-sm text-muted-foreground">Serves the frontend application</div>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-green-500 text-green-50">
                      Online
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                  <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10">
                    <ServerIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">API </div>
                    <div className="text-sm text-muted-foreground">Handles all API requests</div>
                  </div>
                  <div>
                    <Badge variant="outline" >
                      In Progress
                    </Badge>
                  </div>
                </div>
            
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                  <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10">
                    <FileIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">File Storage</div>
                    <div className="text-sm text-muted-foreground">Handles file uploads and downloads</div>
                  </div>
                  <div>
                    <Badge variant="destructive" >
                      Offline
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                  <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10">
                    <CpuIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">Compute Cluster</div>
                    <div className="text-sm text-muted-foreground">Runs background tasks and processes</div>
                  </div>
                  <div>
                    <Badge variant="outline" >
                      Online
                    </Badge>
                  </div>
                </div>
           
              </div>
            </div>
          </main>        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
