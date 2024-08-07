import { BranchInputSchema, BranchOutputSchema } from "@/types/apps";
import { authProcedure, publicProcedure, router } from "../server";
import { env } from "@/app/env";
import { z } from "zod";

export const branchRouter = router({
  add: publicProcedure.input(BranchInputSchema).mutation(async ({ input }) => {
    const response = await fetch(`${env.API_URL}/api/apps/branches`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(input),
    });

    const results = await response.json();
    console.log(results);
    return BranchOutputSchema.parse(results);
  }),

  showDetails: authProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      console.log("hello world hi", input);
      const response = await fetch(
        `${env.API_URL}/api/apps/branches/${input.slug}`,
        {
          headers: { "content-type": "application/json" },
          method: "GET",
        }
      ).then(async (response) => await response.json());
     const {error} =  BranchOutputSchema.safeParse(response);
     console.log(error, 'error');
     return BranchOutputSchema.parse(response);
    }),
});
