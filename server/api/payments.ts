import { z } from "zod";
import { authProcedure, router } from "../server";
import { env } from "@/app/env";
import { SearchParamSchema } from "@/types/invoice";
import { TRPCError } from "@trpc/server";


const BreakdownSchema = z.object({
  id: z.string().uuid(),
  meta_id: z.string().uuid(),
  ram: z.string(),
  cpu_count: z.number(),
  price_per_hour: z.coerce.number(),
  total: z.coerce.number(),
  name: z.string(),
});
const InvoiceSchema = z.object({id: z.string().uuid(), total: z.coerce.number(), breakdown: z.array(BreakdownSchema), key: z.string(), type: z.string(), name: z.string(), description: z.string()});
const TotalSchema = z.array(InvoiceSchema);
export const paymentsRouter = router({
  invoice_preview: authProcedure
    .input(SearchParamSchema)
    .query(async ({ ctx, input }) => {


        const params = new URLSearchParams(input);
      const response = await fetch(`${env.API_URL}/api/resources/invoice-preview?${params.toString()}`, {
        
        headers: {
          authorization: `Bearer ${ctx.token}`,
        },
      }).then(r => r.json());


      const {success, error, data} = TotalSchema.safeParse(response);
      
      if(success) {
        return data
      }

      console.log(error);
      throw new TRPCError({code: 'PARSE_ERROR'})


    }),
});
