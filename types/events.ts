import { z } from "zod";
import { AppInfoSchema } from "./apps";
export const logSchema = z.object({
    event_type: z.literal('logs'),
    message: z.string(),
    level: z.string(),

    timestamp: z.string().datetime(),
})

export const progressSchema = z.object({
    event_type: z.literal('progress'),
    current: z.number(),
    total: z.number(),
    timestamp: z.string().datetime(),

})
export const appInfoSchema = z.object({
    event_type:  z.literal('apps'),
    id: z.string(),
    deployment_id: z.string(),
    state: z.string(),
    

})

export const eventSchema = z.discriminatedUnion('event_type', [logSchema, appInfoSchema, progressSchema])
export type LambdaEvent = z.infer<typeof eventSchema>;
export type AppInfoEvent = z.infer<typeof appInfoSchema>;


export type LogEvent = z.infer<typeof logSchema>;