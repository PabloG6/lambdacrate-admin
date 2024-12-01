import { env } from "@/app/env";
import {
  createGatewayResponse,
  createProductGatewaySchema,
} from "@/trpc/api/gateway/types";
import { authProcedure, createTRPCRouter } from "@/trpc/trpc";
import { buildAuthHeaders } from "@/trpc/utils/server-utils";
import { z } from "zod";

export const productsGatewayRouter = createTRPCRouter({
  create: authProcedure
    .input(createProductGatewaySchema.and(z.object({ gateway_id: z.string() })))
    .mutation(async ({ ctx, input }) => {
      const response = await (
        await fetch(
          `${env.API_URL}/api/admin/rate-limit/${input.gateway_id}/products`,
          {
            method: "POST",
            body: JSON.stringify(input),
            headers: buildAuthHeaders(ctx, {
              "content-type": "application/json",
            }),
          },
        )
      ).json();
      return createGatewayResponse.parse(response);
    }),
});
