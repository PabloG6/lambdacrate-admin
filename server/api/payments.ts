import { z } from "zod";
import { authProcedure, router } from "../server";
import { env } from "@/app/env";
import { SearchParamSchema } from "@/types/invoice";
import { TRPCError } from "@trpc/server";
import { buildAuthHeaders } from "../utils/utils";

const BreakdownSchema = z.object({
  id: z.string().uuid(),
  meta_id: z.string().uuid(),
  ram: z.string(),
  cpu_count: z.number(),
  price_per_hour: z.coerce.number(),
  total: z.coerce.number(),
  name: z.string(),
});
const InvoiceSchema = z.object({
  id: z.string().uuid(),
  total: z.coerce.number(),
  breakdown: z.array(BreakdownSchema).nullish(),
  key: z.string(),
  type: z.string(),
  name: z.string(),
  description: z.string().nullish(),
});
const TotalSchema = z.object({
  items: z.array(InvoiceSchema),
  total: z.coerce.number(),
});

export const RequestedResourceSchema = z.object({
  resource_type:  z.enum(['pe_config', 'machine']),
  slug: z.string(),
})
export const paymentsRouter = router({
  checkout: authProcedure
    .input(z.array(RequestedResourceSchema))
    .mutation(async ({ctx, input}) => {

      await fetch(`${env.API_URL}/api/create-intent`, {method: 'POST', body: JSON.stringify(input), headers: buildAuthHeaders(ctx)})
    }),
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

      const { success, error, data } = TotalSchema.safeParse(response);

      if (success) {
        return data;
      }

      console.log(error);
      throw new TRPCError({ code: "PARSE_ERROR" });
    }),
});
