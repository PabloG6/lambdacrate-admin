import { env } from "@/app/env";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, createTRPCRouter } from "../trpc";


export const MachineSizeSchema = z.object({
    ram: z.string(),
    name: z.string(),
    id: z.string().uuid(),
    cpu_count: z.number(),
    cpu_type: z.enum(['shared', 'performance']),
    price_per_second: z.coerce.number(),
    ext_name: z.string(),
});
export const cpuRouter = createTRPCRouter({
    getOptions: publicProcedure.query(async () => {
         const response = await fetch(`${env.API_URL}/api/resources`, {}).then(async (response) =>  await response.json());
        

        const {data, success, error} =  z.array(MachineSizeSchema).safeParse(response);
        if(success) {
            return data
        } 

        throw new TRPCError({code: 'PARSE_ERROR',});
    }),
    calcInvoice: publicProcedure.query(async () => {})
});
