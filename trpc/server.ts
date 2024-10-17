import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cookies, headers } from "next/headers";
import { cache } from "react";

import { createQueryClient } from "./query-client";
import { sessionCookieName } from "@/lib/auth/lucia";

import { createCallerFactory } from "./trpc";
import { apiRouter, AppRouter } from "./api/root";
import { createTRPCContext } from "./contexts/auth";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
export const createCaller = createCallerFactory(apiRouter);

const getQueryClient = cache(createQueryClient);

const createContext = cache(() => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");
  return createTRPCContext({headers: heads});
})
const caller = createCaller(createContext);
export const { trpc: trpc, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient
);


