"use server";

import { env } from "@/app/env";
import { revalidatePath } from "next/cache";


export async function getAppMetaData(app_id: string) {
  const response = await fetch(`${env.API_URL}/api/apps/${app_id}`, {
    headers: { "content-type": "application/json" },
    cache: "no-cache",
  });
  if (response.ok) {
    return await response.json();
  }
}

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
