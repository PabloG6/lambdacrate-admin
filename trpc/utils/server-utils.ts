import "server-only";
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/unstable-core-do-not-import";
import { AuthContext } from "../contexts/auth";
export const stripePriceIDs = {
  basic: "price_1QMKMeHuv7zG8s4A64vvVEvf",
  standard: "price_1QMKN5Huv7zG8s4A4wQjPdUX",
  premium: "price_1QMKNxHuv7zG8s4A3miLHLnf",
};

export function getPriceDetails(id: string) {
  const keys = Object.keys(stripePriceIDs).find((key) => {
    console.log(stripePriceIDs[key as keyof typeof stripePriceIDs]);
  });
  console.log("keys: ", keys);
  return Object.keys(stripePriceIDs).find(
    (key) => stripePriceIDs[key as keyof typeof stripePriceIDs] == id,
  );
}
export function getTRPCStatusCode(code: number): TRPC_ERROR_CODE_KEY {
  const httpCodes: Record<number, string> = {
    400: "BAD_REQUEST",
    401: "UNAUTHORIZED",
    403: "FORBIDDEN",
    404: "NOT_FOUND",
    405: "METHOD_NOT_SUPPORTED",
    408: "TIMEOUT",
    409: "CONFLICT",
    412: "PRECONDITION_FAILED",
    413: "PAYLOAD_TOO_LARGE",
    415: "UNSUPPORTED_MEDIA_TYPE",
    422: "UNPROCESSABLE_CONTENT",
    429: "TOO_MANY_REQUESTS",
    499: "CLIENT_CLOSED_REQUEST",
    500: "INTERNAL_SERVER_ERROR",
    501: "NOT_IMPLEMENTED",
    502: "BAD_GATEWAY",
    503: "SERVICE_UNAVAILABLE",
    504: "GATEWAY_TIMEOUT",
  };

  return httpCodes[code] as TRPC_ERROR_CODE_KEY;
}

export function buildAuthHeaders({ token }: AuthContext, headers: {} = {}) {
  return {
    authorization: `Bearer ${token}`,
    ...headers,
  };
}
