import { z } from "zod";
import { env } from "@/app/env";
import { SearchParamSchema } from "@/types/invoice";
import { TRPCError } from "@trpc/server";
import { clientSecretSchema, TotalSchema } from "./types";
import { authProcedure, createTRPCRouter } from "@/trpc/trpc";

export const RequestedResourceSchema = z.object({
  resource_type: z.enum(["pe_config", "machine"]),
  slug: z.string(),
});

const retrieveCheckoutCart = authProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }) => {
    const response = await fetch(
      `${env.API_URL}/api/resources/checkout-preview/${input.id}`,
      {
        headers: {
          authorization: `Bearer ${ctx.token}`,
        },
      },
    ).then((r) => r.json());
    const { success, error, data } = TotalSchema.safeParse(response);
    if (success) {
      return data;
    }

    if (error) {
      error.issues.forEach((issue) => {
        console.log("errors:", issue.path.join("/"));
      });
    }

    throw new TRPCError({ code: "PARSE_ERROR" });
  });

const createClientSecret = authProcedure
  .input(z.object({ id: z.string(), idempotencyKey: z.string().nullish() }))
  .query(async ({ input, ctx }) => {
    const key = input.idempotencyKey;
    const response = await fetch(
      `${env.API_URL}/api/payments/checkout/${input.id}?idempotency_key=${key}`,
      {
        headers: {
          authorization: `Bearer ${ctx.token}`,
        },
      },
    );
    const results = await response.json();
    console.log(results);
    return clientSecretSchema.parse(results);
  });

export const paymentsRouter = createTRPCRouter({
  retrieveCheckoutCart: retrieveCheckoutCart,
  createClientSecret: createClientSecret,
  invoice_preview: authProcedure
    .input(SearchParamSchema)
    .query(async ({ ctx, input }) => {
      const params = new URLSearchParams(input);
      const response = await fetch(
        `${env.API_URL}/api/resources/invoice-preview?${params.toString()}`,
        {
          headers: {
            authorization: `Bearer ${ctx.token}`,
          },
        },
      ).then((r) => r.json());

      const { success, error, data } = TotalSchema.safeParse(response);

      if (success) {
        return data;
      }

      //log errors pls

      throw new TRPCError({ code: "PARSE_ERROR" });
    }),
});
