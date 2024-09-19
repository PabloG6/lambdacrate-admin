import { appsRouter } from "./api/apps";
import { branchRouter } from "./api/branches";
import { cpuRouter } from "./api/cpu-selection";
import { paymentsRouter } from "./api/payments";
import { router } from "./server";

export const myRouter = router({
    branches: branchRouter,
    payments: paymentsRouter,
    apps: appsRouter,
    cpu: cpuRouter
})

export type AppRouter = typeof myRouter;
