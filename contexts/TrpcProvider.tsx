"use client";
import { trpc } from "@/server/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {  httpBatchLink } from "@trpc/client";
import {  useState } from "react";

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
        httpBatchLink({
          transformer: superjson,
          url: "http://localhost:3000/api/trpc",
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
