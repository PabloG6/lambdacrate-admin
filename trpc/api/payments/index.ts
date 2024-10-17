import { z } from "zod";
import { env } from "@/app/env";
import { SearchParamSchema } from "@/types/invoice";
import { TRPCError } from "@trpc/server";
import { TotalSchema } from "./types";
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
      }
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
  .input(z.object({id: z.string()}))
  .query(async ({ input, ctx }) => {

    const response = await fetch(
      `${env.API_URL}/api/payments/checkout/${input.id}`,
      {
        headers: {
          authorization: `Bearer ${ctx.token}`,
        },
      }
    ).then((r) => {
      return r.json();
    });
    const { success, error, data } = z
      .object({ branch_slug: z.string(), branch_id: z.string().uuid(), client_secret: z.string(), subscription_id: z.string() })
      .safeParse(response);

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
        }
      ).then((r) => r.json());

      console.log(response);

      const { success, error, data } = TotalSchema.safeParse(response);

      if (success) {
        return data;
      }

      //log errors pls

      throw new TRPCError({ code: "PARSE_ERROR" });
    }),
});
