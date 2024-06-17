import { z } from "zod";

export const AppStatSchema = z.object({
    id: z.string(),
    status: z.enum(['failed', 'active', 'setting_env_variables', 'building_image', 'deploying_app']),
})