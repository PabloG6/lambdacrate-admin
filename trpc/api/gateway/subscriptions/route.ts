import { env } from "@/app/env";
import { authProcedure, createTRPCRouter } from "@/trpc/trpc";
import { buildAuthHeaders } from "@/trpc/utils/server-utils";
import { z } from "zod";

export const subscriptionRouter = createTRPCRouter({
  create: authProcedure
    .input(
      z.object({
        gateway_id: z.string(),
        accounts_id: z.string(),
        products_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const response = await (
        await fetch(
          `${env.API_URL}/api/admin/rate-limit/${input.gateway_id}/subscriptions`,
          {
            method: "POST",
            headers: buildAuthHeaders(ctx, {
              "content-type": "application/json",
            }),
            body: JSON.stringify(input),
          },
        )
      ).json();
    }),

  list: authProcedure.input(z.string()).query(async ({ ctx, input: id }) => {
    const response = await (
      await fetch(`${env.API_URL}/api/admin/rate-limit/${id}/subscriptions`, {
        headers: buildAuthHeaders(ctx),
      })
    ).json();

    console.log(response);
    return response;
  }),
});
