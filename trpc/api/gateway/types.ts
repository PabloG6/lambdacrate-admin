import { z } from "zod";
export const productIntervals = z.enum(["hours", "minutes", "seconds"]);
export const createProductGatewaySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  ext_id: z.string().optional(),
  rate_limit: z.coerce.number().min(1),
  interval: productIntervals.default("hours"),
  interval_count: z.coerce.number().min(1),
});
export const showProductGatewaySchema = z.object({
  name: z.string().min(1),
  id: z.string(),
  description: z.string().min(1),
  ext_id: z.string().optional(),
  rate_limit: z.coerce.number().min(1),
  interval: productIntervals.default("hours"),
  interval_count: z.coerce.number().min(1),
});

export const createGatewaySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.enum(["basic", "standard", "premium"]),
  products: z.array(createProductGatewaySchema).min(1),
});

export type CreateGateway = z.infer<typeof createGatewaySchema>;
export type ProductGateway = z.infer<typeof createProductGatewaySchema>;

export const createGatewayResponse = z.object({
  name: z.string(),
  id: z.string().uuid(),
  description: z.string(),
  gateway_id: z.string(),
  products: z.array(createProductGatewaySchema),
  inserted_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const showGatewayResponse = z.object({
  name: z.string(),
  price_id: z.string(),
  id: z.string().uuid(),
  description: z.string(),
  gateway_id: z.string(),
  products: z.array(showProductGatewaySchema),
  inserted_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type CreateGatewayResponse = z.infer<typeof createGatewayResponse>;
