import { env } from "@/app/env";
import { sessionCookieName } from "@/lib/auth/lucia";
import { Profile, profileSchema } from "@/types/auth";
import { cookies } from "next/headers";
import { cache } from "react";

export async function  getProfile(): Promise<Profile | undefined> {
    const sessionCookie = cookies().get(sessionCookieName)!.value
    const response =  await fetch(`${env.API_URL}/api/auth/me`, {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionCookie}`
    }})
    if(response.ok)  {
        const results = await response.json();
        return profileSchema.parse(results);
    }

    return undefined

}