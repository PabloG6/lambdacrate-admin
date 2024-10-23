import { createTRPCRouter } from "../trpc";
import { accountsRouter } from "./accounts/accounts";
import { appsRouter } from "./apps";
import { branchRouter } from "./branches/branches";
import { cpuRouter } from "./cpu-selection";
import { paymentsRouter } from "./payments";

export const apiRouter = createTRPCRouter({
    branches: branchRouter,
    accounts: accountsRouter,
    payments: paymentsRouter,
    apps: appsRouter,
    cpu: cpuRouter,
  });
  
  export type AppRouter = typeof apiRouter;
  