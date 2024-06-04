"use server";

import { unstable_noStore } from "next/cache";
import { FeatureListType } from "./features/new/component";
import { setTimeout } from "timers/promises";

export async function upsertFeatures(appId: string, data: FeatureListType) {
  const endpoint = "http://127.0.0.1:4000";

  const response = await fetch(`${endpoint}/api/features`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...data, app_id: appId }),
  });

  if (response.ok) {
    return await response.json();
  }

}

export async function getFeatures(appId: string) {
   
  const endpoint = "http://127.0.0.1:4000";
  const searchParams = new URLSearchParams({app_id: appId})
  const response = await fetch(`${endpoint}/api/features?${searchParams}`, {

    headers: {
      "content-type": "application/json",
    },

  });

  if (response.ok) {
    return await response.json();
  }

  console.log(await response.json());
}


