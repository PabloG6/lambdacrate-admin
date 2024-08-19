import { initTRPC } from "@trpc/server";
import superjson from 'superjson';
import { z } from "zod";
const t = initTRPC.create({
    transformer: superjson,
    errorFormatter({ shape }) {},
  });
  
  export const router = t.router;
  /**
   * Create an unprotected procedure
   * @link https://trpc.io/docs/v11/procedures
   **/
  export const publicProcedure = t.procedure;
  
  export const authProcedure = t.procedure;
  /**
   * @link https://trpc.io/docs/v11/merging-routers
   */
  export const mergeRouters = t.mergeRouters;


