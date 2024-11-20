import { sessionCookieName } from "@/lib/auth/lucia";
import { authProcedure, createTRPCRouter, publicProcedure } from "@/trpc/trpc";
import { cookies } from "next/headers";
import {
  CreateProfileSchema,
  AuthProfileSchema,
  BasicProfileSchema,
  AccountLinkSchema,
  StripeAccountSchema,
  loginSchema,
} from "./types";
import { env } from "@/app/env";
import { TRPCError } from "@trpc/server";
import { buildAuthHeaders } from "@/trpc/utils/server-utils";

export const accountsRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateProfileSchema)
    .mutation(async ({ input }) => {
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
        const { data, success } = AuthProfileSchema.safeParse(response);
        if (success) {
          console.log(data);
          cookies().set(sessionCookieName, data.token, {
            expires: new Date(data.expires_in),
          });

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

        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: await request.text(),
        });
      }

      throw new TRPCError({
        message: "Internal server error",
        code: "INTERNAL_SERVER_ERROR",
      });
    }),

  login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    const response = await fetch(`${env.API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (response.ok) {
      const results = await response.json();

      const parsedResults = AuthProfileSchema.parse(results);
      cookies().set(sessionCookieName, parsedResults.token);
      return parsedResults;
    }
    //# TODO please fix this to return proper errors.
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }),

  logout: authProcedure.mutation(async ({}) => {
    cookies().delete(sessionCookieName);
  }),
  me: authProcedure.query(async ({}) => {
    //todo actually fetch the profile information here
    const sessionCookie = cookies().get(sessionCookieName)!.value;
    const response = await (
      await fetch(`${env.API_URL}/api/auth/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionCookie}`,
        },
      })
    ).json();

    const { data, success, error } = BasicProfileSchema.safeParse(response);
    console.log(error?.flatten());
    if (success) {
      return data;
    }
    throw new TRPCError({
      message: JSON.stringify(error.flatten()),
      code: "PARSE_ERROR",
    });
  }),

  create_stripe_account: authProcedure.mutation(async ({ ctx }) => {
    const response = (
      await fetch(`${env.API_URL}/api/accounts/create_stripe_account`, {
        method: "POST",
        headers: buildAuthHeaders(ctx, { "content-type": "application/json" }),
      })
    ).json();

    const account = StripeAccountSchema.parse(response);
    return account;
  }),
  link_stripe_account: authProcedure.mutation(async ({ ctx }) => {
    console.log("link stripe account");
    const response = await (
      await fetch(`${env.API_URL}/api/accounts/link_stripe_account`, {
        method: "POST",
        body: JSON.stringify({ type: "account_onboarding" }),
        headers: buildAuthHeaders(ctx, { "content-type": "application/json" }),
      })
    ).json();

    console.log(response);

    return AccountLinkSchema.parse(response);
  }),
});
