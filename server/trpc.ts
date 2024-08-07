import {
  createTRPCReact,
 
} from "@trpc/react-query";
import { AppRouter } from "./_app";



export const trpc = createTRPCReact<AppRouter>({});

