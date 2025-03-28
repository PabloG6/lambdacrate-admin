import { authProcedure, createTRPCRouter } from "@/trpc/trpc";
import {
  createGatewaySchema,
  createGatewayResponse,
  showGatewayResponse,
} from "./types";
import { env } from "@/app/env";
import { buildAuthHeaders, stripePriceIDs } from "@/trpc/utils/server-utils";
import { TRPCError } from "@trpc/server";
import { createUniqueNameId } from "mnemonic-id";
import { z } from "zod";
import { getTRPCStatusCode, getPriceDetails } from "@/trpc/utils/server-utils";
import { gwProductsRouter } from "./products/route";
import { subscriptionRouter } from "./subscriptions/route";
export const gatewayRouter = createTRPCRouter({
  create: authProcedure
    .input(createGatewaySchema)
    .mutation(async ({ ctx, input }) => {
      const priceID = stripePriceIDs[input.price];
      const appId = createUniqueNameId({ adjectives: 2 });
      const response = await fetch(`${env.API_URL}/api/apps/gateways`, {
        method: "POST",
        headers: buildAuthHeaders(ctx, {
          "content-type": "application/json",
        }),
        body: JSON.stringify({
          gateway_id: appId,
          price_id: priceID,
          ...input,
        }),
      });

      console.log("hello world this has been called");
      if (response.ok) {
        const results = await response.json();
        console.log("hello world", results);
        return createGatewayResponse.parse(results);
      }
      console.log("hello world, this failed");

      throw new TRPCError({ code: getTRPCStatusCode(response.status) });
    }),
  show: authProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const response = await fetch(`${env.API_URL}/api/apps/gateways/${input}`, {
      method: "GET",
      headers: buildAuthHeaders(ctx),
    });
    const results = await response.json().then((response) => {
      const price_id = getPriceDetails(response.price_id);
      response.price_id = price_id;
      return response;
    });

    console.log(results);

    return showGatewayResponse.parse(results);
  }),
  products: gwProductsRouter,
  subscriptions: subscriptionRouter,
  list: authProcedure.query(async ({ ctx }) => {
    const response = await fetch(`${env.API_URL}/api/apps/gateways`, {
      headers: buildAuthHeaders(ctx, { "content-type": "application/json" }),
    });

    const results = await response.json();
    return z.array(showGatewayResponse).parse(results);
  }),
});
