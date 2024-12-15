import { createTRPCRouter } from "../trpc";
import { accountsRouter } from "./accounts/accounts";
import { rateLimitRouter } from "./accounts/rate_limit";
import { apiKeysRouter } from "./apikeys/route";
import { appsRouter } from "./apps";
import { branchRouter } from "./branches/branches";
import { cpuRouter } from "./cpu-selection";
import { gatewayRouter } from "./gateway/route";
import { paymentsRouter } from "./payments";

export const apiRouter = createTRPCRouter({
  branches: branchRouter,
  api_keys: apiKeysRouter,
  accounts: accountsRouter,
  payments: paymentsRouter,
  apps: appsRouter,
  cpu: cpuRouter,
  gateway: gatewayRouter,
  rate_limit: rateLimitRouter,
});

export type AppRouter = typeof apiRouter;
