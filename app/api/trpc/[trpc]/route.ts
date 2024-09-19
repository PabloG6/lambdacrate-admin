import { myRouter } from "@/server/_app";
import { createContext } from "@/server/contexts/auth";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

const handler = (req: NextRequest) => {
   return  fetchRequestHandler({
        
        endpoint: '/api/trpc',
        router: myRouter,
        req,
        createContext: () => createContext(req)
    })

}

export {handler as GET, handler as POST}