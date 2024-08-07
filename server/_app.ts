import { appsRouter } from "./api/apps";
import { branchRouter } from "./api/branches";
import { router } from "./server";

export const myRouter = router({
    branches: branchRouter,
    apps: appsRouter,
})

export type AppRouter = typeof myRouter;
