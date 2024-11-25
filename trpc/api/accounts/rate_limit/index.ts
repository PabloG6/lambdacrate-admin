import { env } from "@/app/env";
import { authProcedure, createTRPCRouter } from "@/trpc/trpc";
import { buildAuthHeaders } from "@/trpc/utils/server-utils";
import { z } from "zod";
import { getRtAccountsSchema } from "./types";

export const rateLimitRouter = createTRPCRouter({
  createAccount: authProcedure
    .input(z.object({ id: z.string(), payload: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      const maybeCreateAccount = await fetch(
        `${env.API_URL}/api/admin/rate-limit/accounts/${input.id}`,
        {
          method: "POST",
          body: JSON.stringify({ email: input.payload }),

          headers: buildAuthHeaders(ctx, {
            "content-type": "application/json",
          }),
        },
      );

      const accounts = await maybeCreateAccount.json();

      return getRtAccountsSchema.parse(accounts);
    }),

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
