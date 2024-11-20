'use server'
import { endpoint } from "@/app/env";
import { FeatureSchema } from "./new/page";
import { unstable_noStore } from "next/cache";

export async function  createFlag(app_id: string, data: any) {
    console.log('create flag');

        console.log(endpoint);
      const response = await fetch(`${endpoint}/api/features`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({...data, app_id: app_id})
      });

      return response.ok

 

}


export async function getFeatureFlags(appId: string) {

    const endpoint = "http://127.0.0.1:4000";
    const searchParams = new URLSearchParams({app_id: appId})
    const response = await fetch(`${endpoint}/api/features?${searchParams}`, {
        cache: 'no-cache',
      headers: {
        "content-type": "application/json",
      },
  
    });
  
    if (response.ok) {
    
      const results =  await response.json();
      return {success: true, results: results}
    }
    return {success: false}
  }