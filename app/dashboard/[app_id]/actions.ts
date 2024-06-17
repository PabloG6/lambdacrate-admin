"use server";

import { env } from "@/app/env";
import { AppStatSchema } from "@/types/apps";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import { setTimeout } from "timers/promises";
import { z } from "zod";


export  const getAppMetaData = cache(async (app_id: string) => {
  const response = await fetch(`${env.API_URL}/api/apps/${app_id}`, {
    headers: { "content-type": "application/json" },
    next: {
      revalidate: 60 * 3,
    }
  });
  if (response.ok) {
    return await response.json();
  }
})


export const getStatus = cache(async (app_id: string): Promise<z.infer<typeof AppStatSchema> | undefined> => {
  const response = await fetch(`${env.API_URL}/api/apps/${app_id}/status`, {method: 'GET', headers: {
    'content-type': 'application/json'
  }})

  if(response.ok) {
    return AppStatSchema.parse(await response.json());
  }

  console.log(response.status);


})



export const  getBuildLogs = cache(async (app_id: string) => {
  const response = await fetch(`${env.API_URL}/api/apps/${app_id}/buildlogs`, {
    headers: { "content-type": "application/json" },
    cache: "force-cache",
    
    next: {
      revalidate: 60 * 3,
    }
  });
  if (response.ok) {
    return await response.json();
  }
})
export async function deleteApp(id: string) {
  const response = await fetch(`${env.API_URL}/api/apps/${id}`, {
    headers: { "content-type": "application/json"},
    method: 'DELETE',
  });

  revalidatePath('/dashboard');

  if(response.ok) {

    return true;
  }
}
