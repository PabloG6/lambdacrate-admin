import { z } from "zod";

export const BreakdownSchema = z.object({
  id: z.string().uuid(),
  meta_id: z.string().uuid(),
  ram: z.string(),
  cpu_count: z.number(),
  price_per_hour: z.coerce.number(),
  total: z.coerce.number(),
  name: z.string(),
});
export const InvoiceSchema = z.object({
  id: z.string().uuid(),
  total: z.coerce.number(),
  hourly_price: z.coerce.number(),
  monthly_price: z.coerce.number(),
  breakdown: z.array(BreakdownSchema).nullish(),
  key: z.string(),
  type: z.string(),
  name: z.string(),
  description: z.string().nullish(),
});
export const TotalSchema = z.object({
  items: z.array(InvoiceSchema),
  total: z.coerce.number(),
});



export type BreakdownType = z.infer<typeof BreakdownSchema>;
export type InvoiceType = z.infer<typeof InvoiceSchema>;
export type TotalType = z.infer<typeof TotalSchema>;