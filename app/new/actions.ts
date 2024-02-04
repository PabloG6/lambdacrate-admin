"use server";

import { AppInfo } from "./page";

export async function createNewApp(data: AppInfo) {
  const endpoint = "http://127.0.0.1:4000";
  console.log(data);
   const response = await fetch(`${endpoint}/api/apps`, {
    method: "POST",
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  if(response.ok) {
    return await response.json();
  }


  console.log(await response.json())

}
