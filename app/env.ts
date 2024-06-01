import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
 
 
export const env = createEnv({
  server: {
    API_URL: z.string().url(),
    GITHUB_CLIENT_SECRET: z.string(),
    GITHUB_URL: z.string().url(),
  },
 
  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: "PUBLIC_",
 
  client: {
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
