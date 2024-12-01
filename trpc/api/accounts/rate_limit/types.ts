import { z } from "zod";

export const getRtAccountsSchema = z.object({
  email: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  id: z.string(),
});

export type GetRtAccounts = z.infer<typeof getRtAccountsSchema>;
export const createSubscriptionSchema = z.object({
  email: z.string(),
  product_id: z.string(),
});

export type CreateSubscription = z.infer<typeof createSubscriptionSchema>;
export const getRtSubscriptionsSchema = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  accounts_id: z.string(),
  email: z.string().email(),
  product_name: z.string(),
  products_id: z.string(),
});

export type GetRtSubscriptions = z.infer<typeof getRtSubscriptionsSchema>;
