import { authProcedure, createTRPCRouter } from "@/trpc/trpc";
import { z } from "zod";
import { apiKeysSchema, createApiKeySchema } from "./types";
import { buildAuthHeaders } from "@/trpc/utils/server-utils";
import { env } from "@/app/env";

export const apiKeysRouter = createTRPCRouter({
  list: authProcedure.query(async ({ ctx }) => {
    const response = await fetch(`${env.API_URL}/api/admin/apikeys`, {
      headers: buildAuthHeaders(ctx),
    });

    const content = await response.json();
    return z.array(apiKeysSchema).parse(content);
  }),

  create: authProcedure.input(createApiKeySchema).mutation(({ ctx, input }) => {
    const response = fetch(`${env.API_URL}/api/admin/apikeys`, {
      headers: buildAuthHeaders(ctx, { "content-type": "application/json" }),
      method: "POST",
      body: JSON.stringify(input),
    });
  }),
});
