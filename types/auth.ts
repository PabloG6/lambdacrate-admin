import { z } from "zod";

export const tokenSchema = z.object({
    token: z.string(),
    expires_in: z.string(),
})

export const profileSchema = z.object({
    name: z.string().optional(),
    email: z.string(),
    avatar_url: z.string().url().optional(),
    username: z.string(),
    access_token: z.string(),

})


export const errorSchema = z.object({
    status: z.number(),
    message: z.string(),
    
})
export type Profile = z.infer<typeof profileSchema>