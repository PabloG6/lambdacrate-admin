import { createTRPCRouter } from "../trpc";
import { accountsRouter } from "./accounts/accounts";
import { appsRouter } from "./apps";
import { branchRouter } from "./branches/branches";
import { cpuRouter } from "./cpu-selection";
import { gatewayRouter } from "./gateway/route";
import { paymentsRouter } from "./payments";

export const apiRouter = createTRPCRouter({
  branches: branchRouter,
  accounts: accountsRouter,
  payments: paymentsRouter,
  apps: appsRouter,
  cpu: cpuRouter,
  gateway: gatewayRouter,
});

export type AppRouter = typeof apiRouter;

