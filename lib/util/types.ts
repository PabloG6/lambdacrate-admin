import { z } from "zod";

export const FeatureSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().min(1),
})

export type FeatureType = z.infer<typeof FeatureSchema>;
export const AppSchema = z.object({
    name: z.string().min(1, { message: "This field is required" }),
    git_repository: z.string().min(1, { message: "This field is required" }),
    description: z.string().min(1),
    app_id: z.string().min(5, { message: "This field is required" }),
  });
export type AppInfo = z.infer<typeof AppSchema>;


