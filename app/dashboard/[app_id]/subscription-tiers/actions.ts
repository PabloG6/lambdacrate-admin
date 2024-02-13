"use server";

import { endpoint } from "@/app/env";

export async function createSubscription(app_id: string, data: any) {
  const response = await fetch(`${endpoint}/api/tiers`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ app_id: app_id, ...data }),
  });
  if (response.ok) {
    return { success: true };
  }
  if (response.status == 422) {
    const errors = await response.json();
    console.log(errors);
    return { success: false, results: errors };
  }

  return { success: response.ok };
}
