import { env } from "@/app/env";
import { github, sessionCookieName } from "@/lib/auth/lucia";
import { tokenSchema } from "@/types/auth";
import { OAuth2RequestError } from "arctic";
import { cookies } from "next/headers";
import { Octokit, App } from "octokit";
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }
  try {
    const token = await github.validateAuthorizationCode(code);
    const octokit = new Octokit({ auth: token.accessToken });
    
    const { data: githubUser } = await octokit.rest.users.getAuthenticated();
    const user = {
      username: githubUser.login,
      name: githubUser.name,
      access_token: token.accessToken,
      avatar_url: githubUser.avatar_url,
      auth_type: "oauth_github",
      external_user_id: githubUser.id,

      email: githubUser.email,
    };

    if(user.email == null) {
        const {data: emails}  = await octokit.rest.users.listEmailsForAuthenticatedUser();
        const primaryEmail = emails.find(email => email.primary);
        console.log(primaryEmail)
        user.email = primaryEmail!.email;
    }
    const session = await fetch(`${env.API_URL}/api/oauth/user`, {
    method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });



    const parsedResult = tokenSchema.parse(await session.json());
   
    await cookies().set(sessionCookieName, parsedResult.token, {expires: new Date(parsedResult.expires_in)})
    console.log('session cookie set')
    return new Response(null, {
        status: 302, 
        headers: {
            Location: '/dashboard'
        }
    })
  } catch (ex) {
    console.log(ex, 'error');
    if(ex instanceof OAuth2RequestError) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: '/oauth/errors'
            }
        })
    }

    return new Response(null, {
        status: 500
    })
  }
}
