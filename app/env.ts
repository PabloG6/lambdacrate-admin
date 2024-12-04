import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    API_URL: z.string().url(),
    GITHUB_CLIENT_SECRET: z.string(),
    GITHUB_URL: z.string().url(),
    GITHUB_CLIENT_ID: z.string(),
  },

  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: "PUBLIC_",

  client: {
    PUBLIC_BASE_URL: z.string().url(),
    PUBLIC_PORT: z.number().nullish(),

    PUBLIC_STRIPE_KEY: z.string(),
  },
  runtimeEnv: {
    PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    PUBLIC_PORT: process.env.PUBLIC_PORT,
    PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY,
    API_URL: process.env.API_URL,
    GITHUB_URL: process.env.GITHUB_URL,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  },
  emptyStringAsUndefined: true,
});
