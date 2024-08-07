import { env } from "@/app/env";
import { publicProcedure, router } from "../server";
import { trpc } from "../trpc";
import {
  AppInfoSchema,
  BranchInputSchema,
  BranchOutputSchema,
} from "@/types/apps";
import { z } from "zod";
import React from "react";

export async function showAppDetails({ input }: { input: { id: string } }) {
  const response = await fetch(`${env.API_URL}/api/apps/${input.id}`, {
    headers: { "content-type": "application/json" },
  });
  if (response.ok) {
    const results = await response.json();
    return AppInfoSchema.parse(results);
  }
}

export const appsRouter = router({
  showDetails: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(React.cache(showAppDetails)),
});
