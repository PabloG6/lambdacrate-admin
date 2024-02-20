"use server";

import { endpoint } from "@/app/env";

export async function getAppMetaData(app_id: string) {
  const response = await fetch(`${endpoint}/api/apps/${app_id}`, {
    headers: { "content-type": "application/json" },
    cache: 'no-cache'
  });
  if(response.ok) {
    return await response.json();
  }
}
