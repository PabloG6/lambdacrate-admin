import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z, ZodError } from "zod";
import { AuthContext } from "./contexts/auth";
import { ApiErrorsSchema, apiErrorsSchema } from "@/lib/util/types";

const t = initTRPC.context<AuthContext>().create({
  transformer: superjson,
  errorFormatter(opts) {
  const {shape, error} = opts
  if(error.code == 'UNPROCESSABLE_CONTENT') {
    return {
      ...shape,
  
    }
  }
  },
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
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
    throw new TRPCError({ code: "UNAUTHORIZED" });
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
