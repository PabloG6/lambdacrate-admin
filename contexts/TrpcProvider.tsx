"use client";
import { trpc } from "@/trpc/client";
import { createQueryClient } from "@/trpc/query-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  httpBatchLink,
  loggerLink,
  splitLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import { useState } from "react";

import superjson, { SuperJSON } from "superjson";
let clientQueryClientSingleton: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient());
};

export function TRPCProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const queryClient = getQueryClient();

  const [client] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink(),
        splitLink({
          condition: (op) => {
            return op.path.startsWith("accounts") || op.path.startsWith("auth");
          },
          true: httpBatchLink({
            url: "/api/trpc",
            transformer: SuperJSON,
          }),
          false: unstable_httpBatchStreamLink({
            transformer: SuperJSON,
            url: "http://localhost:3000/api/trpc",
          }),
        }),
      ],
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={client} queryClient={queryClient}>
        {children}
      </trpc.Provider>
    </QueryClientProvider>
  );
}
