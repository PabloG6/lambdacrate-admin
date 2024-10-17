import { createTRPCRouter } from "../trpc";
import { appsRouter } from "./apps";
import { branchRouter } from "./branches/branches";
import { cpuRouter } from "./cpu-selection";
import { paymentsRouter } from "./payments";

export const apiRouter = createTRPCRouter({
    branches: branchRouter,
    payments: paymentsRouter,
    apps: appsRouter,
    cpu: cpuRouter,
  });
  
  export type AppRouter = typeof apiRouter;
  