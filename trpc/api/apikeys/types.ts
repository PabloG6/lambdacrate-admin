import { z } from "zod";

export const apiKeysSchema = z.object({
  name: z.string(),
  revoked_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  inserted_at: z.coerce.date(),
  key: z.string(),
  id: z.string().uuid(),
});
export const createApiKeySchema = z.object({ name: z.string() });
export type CreateApiKeySchema = z.infer<typeof createApiKeySchema>;
export type ApiKeySchema = z.infer<typeof apiKeysSchema>;
