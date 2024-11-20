import {
  BranchInputSchema,
  BranchOutputSchema,
  GitBranchSchema,
  OnBranchCreatedSchema,
} from "@/types/apps";
import { env } from "@/app/env";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { buildAuthHeaders } from "../../utils/server-utils";
import { authProcedure, publicProcedure, createTRPCRouter } from "../../trpc";
export const branchRouter = createTRPCRouter({
  git_branches: authProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const response = await fetch(
        `${env.API_URL}/api/apps/branches/git_branches/${input}`,
        {
          headers: { authorization: `Bearer ${ctx.token}` },
        },
      ).then((r) => r.json());

      console.log(response);
      const { data, success, error } = z
        .array(GitBranchSchema)
        .safeParse(response);
      if (success) {
        return data;
      }

      throw new TRPCError({ code: "PARSE_ERROR" });
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
        },
      ).then(async (response) => await response.json());
      const { success, error, data } = BranchOutputSchema.safeParse(response);
      if (success) {
        return data;
      }

      console.error(error);
      throw new TRPCError({ code: "PARSE_ERROR" });
    }),
});
