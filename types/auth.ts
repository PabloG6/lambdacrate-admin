import { z } from "zod";

export const tokenSchema = z.object({
  token: z.string(),
  expires_in: z.string(),
});

export const profileSchema = z.object({
  name: z.string().optional().nullish(),
  email: z.string(),
  avatar_url: z.string().url().nullish(),
  username: z.string().nullish(),
  access_token: z.string().nullish(),
});

export const errorSchema = z.object({
  status: z.number(),
  message: z.string(),
});
export type Profile = z.infer<typeof profileSchema>;

