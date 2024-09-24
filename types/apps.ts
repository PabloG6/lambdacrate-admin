import { EnvVarsSchema } from "@/lib/util/types";
import { z } from "zod";

export const AppStatSchema = z.object({
  id: z.string().optional(),

  status: z.enum([
    "failed",
    "active",
    "setting_env_variables",
    "build_image",
    "push_image",
    "push_secrets",
    "deploying_app",
    "init",
  ]),
});

export type AppStat = z.infer<typeof AppStatSchema>;
export const DeploymentOutputSchema = z.object({
  id: z.string(),
  status: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const BranchInputSchema = z.object({
  name: z.string(),
  machine_size: z.string(),
  target_branch: z.string(),
  dashboard_size: z.enum(['hobby', 'starter', 'premium', 'enterprise']),
  secrets: z.array(EnvVarsSchema).optional(),
  deployments: z.array(DeploymentOutputSchema).optional(),
  branch_type: z.enum(["staging", "production", "development"]),
  app_id: z.string(),
});

export const BranchOutputSchema = BranchInputSchema.omit({
  
  machine_size: true,
  dashboard_size: true
}).merge(
  z.object({
    slug: z.string(),
    id: z.string(),
    active_deployment: DeploymentOutputSchema.nullish(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
  })
);
export const AppInfoSchema = z.object({
  app_id: z.string(),
  name: z.string(),
  repository: z.string().url(),
  id: z.string(),
  branches: z
    .array(BranchOutputSchema)

    .optional(),
});

export type AppInfo = z.infer<typeof AppInfoSchema>;

export type BranchInputType = z.infer<typeof BranchInputSchema>;


export const GitBranchSchema = z.object({name: z.string(), protected: z.coerce.boolean()})

export type GitBranchType = z.infer<typeof GitBranchSchema>;