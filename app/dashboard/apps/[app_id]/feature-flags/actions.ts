'use server'

import { env } from "@/app/env";

export async function  createFlag(app_id: string, data: any) {
    console.log('create flag');
      const response = await fetch(`${env.API_URL}/api/features`, {
        
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
    const response = await fetch(`${env.API_URL}/api/features?${searchParams}`, {
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