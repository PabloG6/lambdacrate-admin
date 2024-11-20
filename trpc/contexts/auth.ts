import "server-only";
import { sessionCookieName } from "@/lib/auth/lucia";
import { cookies, headers } from "next/headers";

export async function createContext() {
  const token = cookies().get(sessionCookieName)?.value;
  return {
    token,
  };
}

export const createTRPCContext = async (opts: {}) => {
  const token = cookies().get(sessionCookieName)?.value;
  const serverHeaders = new Headers(headers());
  return {
    token,
    headers: serverHeaders,
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
export type AuthContext = Awaited<ReturnType<typeof createContext>>;
