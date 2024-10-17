import { env } from "@/app/env";
import {
  AppInfoSchema,

} from "@/types/apps";
import { z } from "zod";
import React from "react";
import { AppSchema } from "@/lib/util/types";
import { createUniqueNameId } from "mnemonic-id";
import { TRPCError } from "@trpc/server";
import { AuthContext } from "../contexts/auth";
import { authProcedure, createTRPCRouter } from "../trpc";

export async function showAppDetails({ ctx, input }: { ctx: AuthContext, input: { id: string } }) {
  const response = await fetch(`${env.API_URL}/api/apps/${input.id}`, {
    headers: { "content-type": "application/json", 'authorization': `Bearer ${ctx.token}` },
  });
  if (response.ok) {
    const results = await response.json();
    console.log("response is ok");
    const { data, success, error } = AppInfoSchema.safeParse(results);
    console.log(error);
    if (success) {
      return data;
    }

    console.log("error occurred when parsing return data", error);
    throw new TRPCError({ code: "PARSE_ERROR" });
  } else {

    console.error('internal server error occurred');

    throw new TRPCError({code: "INTERNAL_SERVER_ERROR"})
  }
}

export const appsRouter = createTRPCRouter({
  list: authProcedure.query(async ({ ctx }) => {
    const response = await fetch(`${env.API_URL}/api/apps`, {
      cache: "no-cache",
      headers: {
        authorization: `Bearer ${ctx.token}`,
      },
    }).then((r) => r.json());

    console.log('hello world where are u going');
    const {data, success, error} =  z.array(AppInfoSchema).safeParse(response);
    if(error != null) {
      console.error('error parsing data');
      throw new TRPCError({code: 'PARSE_ERROR'})
    }
    return data
  }),
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
  showDetails: authProcedure
    .input(z.object({ id: z.string() }))
    .query(React.cache(showAppDetails)),
});
