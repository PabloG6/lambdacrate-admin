import { appsRouter } from "./api/apps";
import { branchRouter } from "./api/branches";
import { cpuRouter } from "./api/cpu-selection";
import { router } from "./server";

export const myRouter = router({
    branches: branchRouter,
    apps: appsRouter,
    cpu: cpuRouter
})

export type AppRouter = typeof myRouter;
