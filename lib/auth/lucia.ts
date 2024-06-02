import { Lucia } from "lucia";
import { MyAdapter } from "./adapter";
import { GitHub } from "arctic";
import { env } from "@/app/env";

const adapter = new MyAdapter();
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      username: attributes.email,
    };
  },
});

export const github = new GitHub(
  env.GITHUB_CLIENT_ID,
  env.GITHUB_CLIENT_SECRET
);
export const sessionCookieName = "LAMBDACRATE_AUTH";
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
}
