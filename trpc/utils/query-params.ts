import { createSerializer, parseAsString } from "nuqs";

export const checkoutKeyParams = {
  idempotencyKey: parseAsString.withDefault(crypto.randomUUID()),
};

export const checkoutKeySerializer = createSerializer(checkoutKeyParams);
