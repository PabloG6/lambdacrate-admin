import { env } from "@/app/env";
import { authProcedure, publicProcedure, router } from "../server";
import { trpc } from "../trpc";
import {
  AppInfoSchema,
  BranchInputSchema,
  BranchOutputSchema,
} from "@/types/apps";
import { z } from "zod";
import React from "react";
import { AppSchema } from "@/lib/util/types";
import { createUniqueNameId } from "mnemonic-id";
import { TRPCError } from "@trpc/server";

export async function showAppDetails({ input }: { input: { id: string } }) {
  const response = await fetch(`${env.API_URL}/api/apps/${input.id}`, {
    headers: { "content-type": "application/json" },
  });
  console.log('show app details');
  if (response.ok) {
    const results = await response.json();
    console.log('response is ok');
    const {data, success, error} = AppInfoSchema.safeParse(results);
console.log(error)
    if (success) {
      return data
    } 

    console.log("error occurred when parsing return data", error)
    throw new TRPCError({code: "PARSE_ERROR", })
  } else {
    
  }
}

export const appsRouter = router({
  create: authProcedure.input(AppSchema).mutation(async ({ ctx, input }) => {
    const appID = createUniqueNameId({ adjectives: 2 });

    try {
      const response = await fetch(`${env.API_URL}/api/apps`, {
        method: "POST",
        body: JSON.stringify({ ...input, app_id: appID }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        const results = await response.json();
        return {
          app_id: results.app_id,
          success: true,
          pending: false,
        };
      } else {
        if (response.status == 422) {
          const body = await response.json();
          console.log(JSON.stringify(body));
        }
        return { success: false, pending: false };
      }
    } catch (ex) {
      console.log(ex);
      return {
        success: false,
        pending: false,
      };
    }
  }),
  showDetails: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(React.cache(showAppDetails)),
});
