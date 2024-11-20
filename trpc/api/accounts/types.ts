import { z } from "zod";

export const CreateProfileSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type createProfileSchema = z.infer<typeof CreateProfileSchema>;

export const AuthProfileSchema = z.object({
  email: z.string().email(),
  id: z.string().uuid(),
  name: z.string().nullish(),
  token: z.string(),
  expires_in: z.string(),
  avatar_url: z.string().url().nullish(),
  access_token: z.string().nullish(),
});

export const BasicProfileSchema = z.object({
  name: z.string().nullish(),
  email: z.string().nullish(),
  avatar_url: z.string().url().nullish(),
  id: z.string().uuid(),
});

export const AccountLinkSchema = z.object({
  type: z.string(),
  created_at: z.number(),
  expires_at: z.number(),
  url: z.string().url(),
});
export const StripeAccountSchema = z.object({ account_id: z.string() });
export type basicProfileSchema = z.infer<typeof BasicProfileSchema>;
export type authProfileSchema = z.infer<typeof AuthProfileSchema>;
export type accountLinkSchema = z.infer<typeof AccountLinkSchema>;

export const tokenSchema = z.object({
  token: z.string(),
  expires_in: z.string(),
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type LoginSchema = z.infer<typeof loginSchema>;
export const errorSchema = z.object({
  status: z.number(),
  message: z.string(),
});

