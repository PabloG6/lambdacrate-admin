import { z } from "zod";

export const FeatureSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
});

export type FeatureType = z.infer<typeof FeatureSchema>;
const destinationUnion = z.discriminatedUnion("destination_type", [
  z.object({ destination_type: z.literal("cli"), path: z.string() }),
  z.object({ destination_type: z.literal("http"), path: z.string().url() }),
]);
export const EnvVarsSchema = z.object({key: z.string().min(1), value: z.string().min(1)})
export type EnvVarsType = z.infer<typeof EnvVarsSchema>;
export const AppSchema = z.object({
  name: z.string(),
  git_repository: z.string().url(),
  description: z.string(),

  dockerfile_path: z.string().default("Dockerfile").optional(),
  http_url: z.string().url().optional(),
  path: z.string().optional(),
  secrets: z.array(EnvVarsSchema).optional(),
}).and(destinationUnion)

export type AppInfo = z.infer<typeof AppSchema>;
