import { z } from "zod";

export const AppStatSchema = z.object({
  id: z.string(),

  status: z.enum([
    "failed",
    "active",
    "setting_env_variables",
    "build_image",
    "push_image",
    "deploying_app",
    "init",
  ]),
});

export type AppStat = z.infer<typeof AppStatSchema>;

export const AppInfoSchema = z.object({
  app_id: z.string(),
  name: z.string(),
  repository: z.string().url(),
  id: z.string(),
  deployment: AppStatSchema
});

export type AppInfo = z.infer<typeof AppInfoSchema>;
