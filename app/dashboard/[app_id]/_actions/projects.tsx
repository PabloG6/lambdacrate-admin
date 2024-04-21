"use server";

import { env } from "@/app/env";
import { AppInfo, AppSchema } from "@/lib/util/types";
import { createUniqueNameId } from "mnemonic-id";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { setTimeout } from "timers/promises";

export type ProjectFormState = {
  pending: boolean,
  success: boolean,
  errors?: {
    name?: string[] | undefined;
    git_repository?: string[] | undefined;
    description?: string[] | undefined;
}
  app_id?: string

}
export async function createProject(validatedFields: AppInfo): Promise<ProjectFormState> {
   const appID = createUniqueNameId({ adjectives: 2 });



  try {
    const response = await fetch(`${env.API_URL}/api/apps`, {
      method: "POST",
      body: JSON.stringify({...validatedFields, app_id: appID}),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
  
      return {
        app_id: response.app_id,
        success: true,
        pending: false,
      };
  } catch(ex) {
    console.log(ex);
    return {
      success: false,
      pending: false,
    }
    
  }

  
}
