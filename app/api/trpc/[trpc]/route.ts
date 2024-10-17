import { apiRouter } from "@/trpc/api/root";
import { createTRPCContext } from "@/trpc/contexts/auth";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";



const handler = (req: NextRequest) => fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: apiRouter,
    createContext: (opts) => createTRPCContext({headers: req.headers}),
  });
export {handler as GET, handler as POST}