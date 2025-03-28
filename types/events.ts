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
    message: z.string().optional(),
    level: z.string().optional(),
    timestamp: z.string().datetime(),

})
export const appInfoSchema = z.object({
    event_type:  z.literal('apps')
    

}).merge(AppInfoSchema)

export const eventSchema = z.discriminatedUnion('event_type', [logSchema, appInfoSchema, progressSchema])
export type LambdaEvent = z.infer<typeof eventSchema>;
export type AppInfoEvent = z.infer<typeof appInfoSchema>;
export type ProgressEvent = z.infer<typeof progressSchema>;

export type LogEvent = z.infer<typeof logSchema>;


export const BuildEventSchema = z.object({
    app_id: z.string(),
    deployment: z.object({
      id: z.string(),
      status: z.string(),
    }),
    event_type: z.string(),
    id: z.string(),
    name: z.string(),
    repository: z.string().url(),
  });