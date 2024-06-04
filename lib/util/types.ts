import { z } from "zod";

export const FeatureSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().min(1),
})

export type FeatureType = z.infer<typeof FeatureSchema>;
export const AppSchema = z.object({
    name: z.string(),
    git_repository: z.string().url(),
    description: z.string(),


  });
export type AppInfo = z.infer<typeof AppSchema>;

