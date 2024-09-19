import { initTRPC, TRPCError } from "@trpc/server";
import superjson from 'superjson';
import { z } from "zod";
import { AuthContext } from "./contexts/auth";
const t = initTRPC.context<AuthContext>().create({
    transformer: superjson,
    errorFormatter({ shape }) {},
  });
  
  export const router = t.router;
  /**
   * Create an unprotected procedure
   * @link https://trpc.io/docs/v11/procedures
   **/
  export const publicProcedure = t.procedure;
  
  export const authProcedure = t.procedure.use(async function isAuthed(opts) {
    const { ctx } = opts;
    // `ctx.user` is nullable
    if (!ctx.token) {
      //     ^?
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return opts.next({
      ctx: {
        // ✅ user value is known to be non-null now
        token: ctx.token,
        // ^?
      },
    });
  });
  /**
   * @link https://trpc.io/docs/v11/merging-routers
   */
  export const mergeRouters = t.mergeRouters;


