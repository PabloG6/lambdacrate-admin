import { myRouter } from "@/server/_app";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) => {
   return  fetchRequestHandler({
        
        endpoint: '/api/trpc',
        router: myRouter,
        req,
        createContext: () => ({})
    })

}

export {handler as GET, handler as POST}