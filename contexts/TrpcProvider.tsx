"use client";
import { AppRouter } from "@/server/_app";
import { trpc } from "@/server/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  createWSClient,
  httpBatchLink,
  loggerLink,
  splitLink,
  unstable_httpSubscriptionLink,
} from "@trpc/client";
import { headers } from "next/headers";
import { useState } from "react";

import superjson from "superjson";
export function TRPCProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 5000 } },
      })
  );

  

  const [client] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink(),
        splitLink({
          condition: (op) => op.type == "subscription",
          true: unstable_httpSubscriptionLink({
            url: "/api/trpc",
            transformer: superjson,
          }),
          false: httpBatchLink({
            transformer: superjson,
            url: "http://localhost:3000/api/trpc",
          }),
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
