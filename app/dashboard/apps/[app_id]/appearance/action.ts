'use server';
import { endpoint } from "@/app/env";

export async function updateAppDetails(body: {
  id: string;
  headline_title?: string;
  headline_description?: string;
  features_title?: string;
  features_description?: string;
  name?: string;
  app_id?: string;
  git_repository?: string;
  pricing_description?: string;
  pricing_title?: string;
}) {
    console.log('endpoint', endpoint);
    const response = await fetch(`${endpoint}/api/apps/${body.id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json',
            

        }
    })

    if(response.ok) {
        return {success: true}
    }

    return {success: false}
}
