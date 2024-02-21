import { NextRequest, NextResponse } from "next/server";
import { endpoint } from "@/app/env";
import { NextApiRequest } from "next";

import { EventNotifier, getSSEWriter } from "ts-sse";
import { z } from "zod";
import { interval } from "date-fns";

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
    data: z.infer<typeof deploymentSchema>;
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

export interface Message<T = string | Record<string, unknown>> {
  data: T;
  comment?: string;
  event?: string;
  id?: string;
  retry?: number;
}

export async function GET(
  request: NextRequest,

  { params: { id, app_id } }: { params: { id: string; app_id: string } }
) {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();
  const getStatus = async (notifier: SyncEvents) => {
    console.log(`getting status: ${new Date().toISOString()}`);
    const response = await fetch(`${endpoint}/api/apps/${app_id}/status`, {method: 'GET', cache: 'no-cache'});
    if (response.ok) {
      const results = await response.json();
      const data = deploymentSchema.parse(results);

      notifier.update({
        data: data,
      });
    } else {
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
