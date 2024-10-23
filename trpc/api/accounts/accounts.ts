import { sessionCookieName } from "@/lib/auth/lucia";
import { authProcedure, createTRPCRouter, publicProcedure } from "@/trpc/trpc";
import { cookies } from "next/headers";
import { CreateProfileSchema, GetProfileSchema } from "./types";
import { env } from "@/app/env";
import { TRPCError } from "@trpc/server";
import { ApiErrorsSchema } from "@/lib/util/types";

export const accountsRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateProfileSchema)
    .mutation(async ({ input }) => {
      console.log("calling this");
      console.log(env.API_URL);
      const request = await fetch(`${env.API_URL}/api/accounts/create`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (request.ok) {
        const response = await request.json();
        console.log(response);
        const { data, success, error } = GetProfileSchema.safeParse(response);
        if (success) {
          return data;
        }

        //TODO something here for the errors.
        throw new TRPCError({
          message: "failed to parse response",
          code: "PARSE_ERROR",
        });
      }

      if (request.status == 422) {
        //that means there's unique errors that don't pass server validation.
    
          throw new TRPCError({code: 'UNPROCESSABLE_CONTENT', message: await request.text()})
        
      }

      throw new TRPCError({message: 'Internal server error', code: 'INTERNAL_SERVER_ERROR'})
    }),

  logout: authProcedure.mutation(async ({ ctx }) => {
    cookies().delete(sessionCookieName);
  }),
  me: authProcedure.query(async ({ ctx }) => {
    //todo actually fetch the profile information here
    return {
      user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
      },
    };
  }),
});
