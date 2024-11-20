"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { LayoutProps } from "@/lib/util/props";
import { trpc } from "@/trpc/client";
import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
const stripePromise = loadStripe(
  "pk_test_51KUOljHuv7zG8s4Ay0s5T2fqRF2PhgKiA2YPT7nvtYmUJIFgexmRGCU3AU77PToQ195AitjgPVIlbl6G84FdnIQ600KQx8KmNb",
);

type Props = { checkout_id: string } & LayoutProps;
export default function ElementsProvider({ children, checkout_id }: Props) {
  const [idempotencyKey, setIdempotencyKey] = useQueryState(
    "ref_id",
    parseAsString,
  );
  const [paymentIntent, paymentIntentQuery] =
    trpc.payments.createClientSecret.useSuspenseQuery({
      id: checkout_id,
      idempotencyKey: idempotencyKey,
    });

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: paymentIntent.payment_intent }}
    >
      {children}
    </Elements>
  );
}
