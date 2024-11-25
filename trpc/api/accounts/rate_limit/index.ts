import { env } from "@/app/env";
import { authProcedure, createTRPCRouter } from "@/trpc/trpc";
import { buildAuthHeaders } from "@/trpc/utils/server-utils";
import { z } from "zod";
import { getRtAccountsSchema } from "./types";

export const rateLimitRouter = createTRPCRouter({
  getAccounts: authProcedure
    .input(z.string())
    .query(async ({ ctx, input: id }) => {
      console.log(id);
      const maybeAccounts = await fetch(
        `${env.API_URL}/api/admin/rate-limit/accounts/${id}`,
        {
          headers: buildAuthHeaders(ctx),
        },
      );

      const accounts = await maybeAccounts.json();
      return z.array(getRtAccountsSchema).parse(accounts);
    }),
});
