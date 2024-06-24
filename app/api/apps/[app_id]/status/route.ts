import { NextRequest, NextResponse } from "next/server";
import { env } from "@/app/env";
import { NextApiRequest } from "next";
import EventSource from "eventsource";
import { EventNotifier, getSSEWriter } from "ts-sse";
import { z } from "zod";
import { interval } from "date-fns";
import { LogEvent, eventSchema, logSchema } from "@/types/events";

export const deploymentSchema = z.object({
  status: z.string(),
  machines: z.array(
    z.object({
      id: z.string(),
      machine_id: z.string(),
      status: z.string(),
      machine_type: z.string(),
    })
  ),
});
export type Status =
  | "Allocating IP"
  | "Setting Environment"
  | "Creating Database"
  | "Creating API"
  | "Generating Console"
  | "Live";
export const statuses: Status[] = [
  "Allocating IP",
  "Setting Environment",
  "Creating Database",
  "Creating API",
  "Generating Console",
  "Live",
];
export type SyncEvents = EventNotifier<{
  update: {
    data: LogEvent;
    comment?: string;
  };
  complete: {
    data: never;
    event: "some_event" | "some_other_event";
  };
  close: {
    data: string;
  };
  error: {
    data: string;
  };
}>;


export async function _GET(
  request: NextRequest,

  { params: { app_id } }: { params: { app_id: string } }
) {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();
  //todo fix this so that when the app deployment fails it actually tells u the deployment fails.
  const getStatus = async (notifier: SyncEvents) => {
    console.log(`getting status for ${app_id}: ${new Date().toISOString()}`);
    const response = await fetch(`${env.API_URL}/api/apps/${app_id}/status`, {
      method: "GET",
      cache: "no-cache",
    });
    if (response.ok) {
      const results = await response.json();
      const data = deploymentSchema.parse(results);

      if (data.status == "failed") {
        clearInterval(intervalId);
      }
      notifier.update({
        data: results,
      });
    } else {
      console.log(response.status);
    }
  };
  const deploymentStats = async (notifier: SyncEvents) => {
    await getStatus(notifier);
  };

  const sseWriter = getSSEWriter(writer, encoder);
  const intervalId = setInterval(async () => {
    getStatus(sseWriter);
  }, 3000);

  request.signal.onabort = (ev) => {
    console.log("aborted");
    console.log(ev);

    clearInterval(intervalId);
  };
  setInterval(() => {
    clearInterval(intervalId);
  }, 60_000 * 3);

  deploymentStats(sseWriter);

  return new NextResponse(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}

export async function GET(
  request: NextRequest,

  { params: { app_id } }: { params: { app_id: string } }
) {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  
  const encoder = new TextEncoder();
  const notifier = getSSEWriter(writer, encoder)

  const eventSource = new EventSource(
    `${env.API_URL}/api/events/deployments/${app_id}`
  );



  eventSource.onmessage = (event) => {
    console.log('event.data', event.data);
    try {
      const {data, success} = eventSchema.safeParse(JSON.parse(event.data))
      if(success) {
        notifier.update({data: data})

      }

    } catch(ex) {
      console.log(ex);
    }
   
  };

  eventSource.onopen = (message) => {
    console.log(`opened at: ${new Date().toISOString()}`)
  }
  eventSource.onerror = (message) => {
    console.log(message);
  };

  request.signal.onabort = () => {
    console.log('aborted');

    writer.close();
    eventSource.close();
  }

  return ( () => {
    

    return new NextResponse(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  })();
}
