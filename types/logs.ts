import { z } from "zod";

export const logSchema = z.object({
    log: z.string(),
    type: z.string(),
    status: z.string(),
    timestamp: z.string().datetime(),
})

export type Logs = z.infer<typeof logSchema>;