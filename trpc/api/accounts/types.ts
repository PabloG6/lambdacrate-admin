import { z } from "zod";

export const CreateProfileSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export type createProfileSchema = z.infer<typeof CreateProfileSchema>;

export const GetProfileSchema = z.object({
    email: z.string().email(),
    id: z.string().uuid(),
    name: z.string().nullish(),
    token: z.string(),
    expires_in: z.string(),
    avatar_url: z.string().url().nullish(),
    access_token: z.string().nullish()
})