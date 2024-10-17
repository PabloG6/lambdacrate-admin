"use client";

import { LambdaEvent, LogEvent, eventSchema, logSchema } from "@/types/events";
import { format } from "date-fns";
import { useContext, useEffect, useRef, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import EventSourceContextProvider, {useEventStream} from "@/contexts/EventStreamContextProvider";
export type Props<T> = {
  level?: string;
  event_type: string;
  

}


export default function LogViewer<T>({level, event_type}: Props<T>) {

  const scrollToBottomRef = useRef<HTMLTableRowElement | null>(null);

  const eventStream = useEventStream();
  
  function isErrorEvent(event: Event): event is ErrorEvent {
    return event.type === 'error';
  }
  
  useEffect(() => {
    // if(scrollToBottomRef.current) {
    //   scrollToBottomRef?.current?.scrollIntoView();

    // }
  }, [eventStream]);
  return (

          <ScrollArea className="m-auto  mt-4 h-[300px] min-h-20">
      <table
        className={` text-sm table-fixed w-full font-mono border-spacing-2 border-collapse`}
      >
        <thead className="top-0 sticky">
        <tr className="">
          <th className="w-[20px] top-0 sticky"></th>
          <th
            className={`text-left w-[240px] sticky top-0 font-normal pb-3 bg-background`}
          >
            Timestamp
          </th>
          <th className="w-[150px] text-left sticky top-0 font-normal pb-3 bg-background">
            Level
          </th>
          <th className="text-left sticky top-0 font-normal pb-3 bg-background">
            Text
          </th>
        </tr>
        </thead>
    
        
        <tbody>
          {eventStream
            .filter((e) => e.event_type == event_type)
            .map(l => l as LogEvent).filter(l => l.level != 'ignore')
            .map((log, index) => (
              <tr key={`${log.timestamp}:${index}`}>
                <td>
               
                </td>
                <td className="text-left text-sm py-1">
                  {format(log.timestamp, "yyyy-MM-dd HH:mm:ss.SSS")}
                </td>
                <td className="text-left py-1">{log.level}</td>
                <td className="text-left py-1">{log.message}</td>
              </tr>
            ))}
          <tr>
            <td>
              <div className="bg-blue-300 h-2 w-2 rounded-full"></div>
            </td>
          </tr>
          <tr ref={scrollToBottomRef}></tr>
          <tr></tr>
        </tbody>
      </table>
    </ScrollArea>


  );
}
