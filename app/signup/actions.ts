"use server";

import { lucia } from "@/lib/auth/lucia";
import { env } from "../env";

export async function createAccount(data: any) {
  const response = await fetch(`${env.API_URL}/api/auth/signup`, {
    
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  });
  if (response.ok) {
    const results = await response.json();
    console.log(results);
  }
}


export async function login(data: any) {
    const response = await fetch(`${env.API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          ...data
        }),
      });
    }

export async function cliLogin(data: any) {
    console.log(data);
    const response = await fetch(`${env.API_URL}/api/auth/cli/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const results = await response.json();
        console.log(results);
        return;
      } 

      console.log(await response.json());


}