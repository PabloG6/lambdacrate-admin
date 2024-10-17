import {
  BranchInputSchema,
  BranchOutputSchema,
  GitBranchSchema,
  OnBranchCreatedSchema,
} from "@/types/apps";
import { env } from "@/app/env";
import { z } from "zod";
import { observable } from "@trpc/server/observable";
import { Deployment, deploymentSchema } from "@/types/deployment";
import { TRPCError } from "@trpc/server";
import { buildAuthHeaders } from "../../utils/utils";
import { authProcedure, publicProcedure, createTRPCRouter } from "../../trpc";
export const branchRouter = createTRPCRouter({
  git_branches: authProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const response = await fetch(
        `${env.API_URL}/api/apps/branches/git_branches/${input}`,
        {
          headers: { authorization: `Bearer ${ctx.token}` },
        }
      ).then((r) => r.json());

      console.log(response);
      const { data, success, error } = z
        .array(GitBranchSchema)
        .safeParse(response);
      if (success) {
        return data;
      }

      console.error(error);
      throw new TRPCError({ code: "PARSE_ERROR" });
    }),

  events: authProcedure
    .input(z.object({ lastEventId: z.string(), id: z.string().nullish() }))
    .subscription(function ({ input }) {
      return observable<Deployment>((emit) => {
        const intervalID = setInterval(() => {
          fetch(`${env.API_URL}/api/apps/deployments/${input.id}`, {})
            .then(async (response) => {
              const results = await response.json();
              const schema = deploymentSchema.parse(results);
              if (schema.status == "failed") {
                clearInterval(intervalID);
                emit.next(schema);
                return;
              }
              emit.next(schema);
            })
            .catch(() => {});
        }, 30_000);

        return () => {
          clearInterval(intervalID);
        };
      });
    }),

  add: publicProcedure
    .input(BranchInputSchema)
    .mutation(async ({ ctx, input }) => {
      const response = await fetch(`${env.API_URL}/api/apps/branches`, {
        headers: buildAuthHeaders(ctx, { "content-type": "application/json" }),
        method: "POST",
        body: JSON.stringify(input),
      });

      const results = await response.json();
      const { success, error, data } = OnBranchCreatedSchema.safeParse(results);
      if (success) {
        return data;
      }

      console.error(error);
      throw new TRPCError({ code: "PARSE_ERROR" });
    }),
  allBranches: authProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const response = await (
        await fetch(`${env.API_URL}/api/apps/${input.id}/branches`, {
          headers: buildAuthHeaders(ctx),
        })
      ).json();
      console.log(response);
      const { success, error, data } = z
        .array(BranchOutputSchema)
        .safeParse(response);
      if (success) {
        return data;
      }


      throw new TRPCError({ code: "PARSE_ERROR" });
    }),
  showDetails: authProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      const response = await fetch(
        `${env.API_URL}/api/apps/branches/${input.slug}`,
        {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${ctx.token}`,
          },
          method: "GET",
        }
      ).then(async (response) => await response.json());
      const { success, error, data } = BranchOutputSchema.safeParse(response);
      if (success) {
        return data;
      }

      console.error(error);
      throw new TRPCError({ code: "PARSE_ERROR" });
    }),
});
