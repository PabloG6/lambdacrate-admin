import { getProfile } from "@/app/auth/profile/lib";
import { sessionCookieName } from "@/lib/auth/lucia";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

export async function GET(request: NextRequest) {
  // const profile = await getProfile();
  // if (profile != null) {
  //   const octokit = new Octokit({ auth: profile.access_token });
  //   const results = await octokit.paginate("GET /user/repos", {
  //     type: "all",
  //     per_page: 100,
  //   });

  //   return NextResponse.json(results);
  // }

  return NextResponse.json([]);
}
