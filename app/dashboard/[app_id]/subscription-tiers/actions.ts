"use server";

import { endpoint } from "@/app/env";

export async function createSubscriptionTier(app_id: string, data: any) {
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
    return { success: false, results: errors };
  }

  return { success: response.ok };
}

export async function getMissingFlagTiers(id: string) {
  const response = await fetch(
    `${endpoint}/api/tiers_features/${id}/addable-flags`,
    {
      method: "GET",
      headers: { "content-type": "application/json" },
      cache: "no-cache",
    }
  );

  if (response.ok) {
    return await response.json();
  }
}
export async function getFeatureFlagTiers(id: string) {
  console.log('get feature flags', id);
  const response = await fetch(`${endpoint}/api/tiers_features/${id}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
    cache: "no-cache",
  });
  if (response.ok) {
    
    const results =  (await response.json()) as any[];
    console.log('results', results);
    return results;
  }

  console.log('get feature flag tiers');

  return [];
}

export async function removeFeatureFlags(values: any[]) {
  const response = await fetch(
    `${endpoint}/api/tiers_features`,
    {
      headers: {
        "content-type": "application/json",
      },
      method: 'DELETE',

      body: JSON.stringify({feature_flags: values}),

      cache: "no-cache",
    }
  );

  if(response.ok) {
   return {success: true}
  }
}
export async function getSubscriptionTiers(app_id: string) {
  const urlSearchParams = new URLSearchParams();
  console.log("hello world");
  urlSearchParams.set("app_id", app_id);
  const response = await fetch(
    `${endpoint}/api/tiers?${urlSearchParams.toString()}`,
    {
      headers: {
        "content-type": "application/json",
      },

      cache: "no-cache",
    }
  );

  const results = await response.json();
  return results;
}

export async function addFeatureFlagTiers(id: string, body: any) {
  const response = await fetch(`${endpoint}/api/tiers_features`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    cache: "no-cache",
    body: JSON.stringify(body),
  });
  if (response.ok) {
    return await response.json();
  }
}
export async function getSubscriptionTier(id: string) {
  const response = await fetch(`${endpoint}/api/tiers/${id}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
    cache: "no-cache",
  });
  if (response.ok) {
    return await response.json();
  }

  console.log(await response.json());
}
