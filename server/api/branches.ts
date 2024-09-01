import { BranchInputSchema, BranchOutputSchema } from "@/types/apps";
import { authProcedure, publicProcedure, router } from "../server";
import { env } from "@/app/env";
import { z } from "zod";
;
import { observable } from "@trpc/server/observable";
import { Deployment, deploymentSchema } from "@/types/deployment";
export const branchRouter = router({
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
                emit.next(schema)
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

    wsEvent: authProcedure.subscription(() => {}),

  add: publicProcedure.input(BranchInputSchema).mutation(async ({ input }) => {
    const response = await fetch(`${env.API_URL}/api/apps/branches`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(input),
    });

    const results = await response.json();
    return BranchOutputSchema.parse(results);
  }),

  showDetails: authProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(
        `${env.API_URL}/api/apps/branches/${input.slug}`,
        {
          headers: { "content-type": "application/json" },
          method: "GET",
        }
      ).then(async (response) => await response.json());
      const { error } = BranchOutputSchema.safeParse(response);
      return BranchOutputSchema.parse(response);
    }),
});
