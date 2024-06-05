import { getProfile } from "@/app/auth/profile/lib";
import { sessionCookieName } from "@/lib/auth/lucia";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

export async function GET(request: NextRequest) {
   const profile = await getProfile();
   if(profile != null) {
    const octokit = new Octokit({auth: profile.access_token})
    const {data: repositories} = await octokit.rest.repos.listForAuthenticatedUser();
    
     return NextResponse.json(repositories);
   }

   return NextResponse.json([]);

    

}