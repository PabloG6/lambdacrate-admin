"use client";

import { LucideLoader2 } from "lucide-react";
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
      const state = (event as AppInfoEvent).deployment.status;
      setCurrentState(state);
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
      <AccordionItem value="setting_env_vars">
        <AccordionTrigger>Setting your environment variables</AccordionTrigger>
        <AccordionContent>
          <LogViewer event_type="logs" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
