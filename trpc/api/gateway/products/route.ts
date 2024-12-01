import { env } from "@/app/env";
import { authProcedure, createTRPCRouter } from "@/trpc/trpc";
import { buildAuthHeaders } from "@/trpc/utils/server-utils";
import { z } from "zod";
import {
  createGatewayResponse,
  createProductGatewaySchema,
  showProductGatewaySchema,
} from "../types";

export const gwProductsRouter = createTRPCRouter({
  create: authProcedure
    .input(createProductGatewaySchema.and(z.object({ gateway_id: z.string() })))
    .mutation(async ({ ctx, input }) => {
      const response = await (
        await fetch(
          `${env.API_URL}/api/apps/gateways/${input.gateway_id}/products`,
          {
            method: "POST",
            body: JSON.stringify(input),
            headers: buildAuthHeaders(ctx, {
              "content-type": "application/json",
            }),
          },
        )
      ).json();

      console.log(response);
      return createGatewayResponse.parse(response);
    }),
  index: authProcedure.input(z.string()).query(async ({ ctx, input: id }) => {
    const response = await (
      await fetch(`${env.API_URL}/api/apps/gateways/${id}/products`, {
        headers: buildAuthHeaders(ctx),
      })
    ).json();
    return z.array(showProductGatewaySchema).parse(response);
  }),
});
