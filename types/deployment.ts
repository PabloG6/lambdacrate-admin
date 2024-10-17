import { z } from "zod";

export const deploymentSchema = z.object({id: z.string(), status: z.string()});
export type Deployment = z.infer<typeof deploymentSchema>;