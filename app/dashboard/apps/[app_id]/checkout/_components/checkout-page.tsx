"use client";

import { env } from "@/app/env";
import CheckoutForm from "@/components/stripe-card/checkout-form";
import { BasicParamProps } from "@/lib/util/props";
import { trpc } from "@/trpc/client";
import { Elements } from "@stripe/react-stripe-js";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import { useParams } from "next/navigation";
import { useEffect } from "react";
const stripePromise = loadStripe(
  "pk_test_51KUOljHuv7zG8s4Ay0s5T2fqRF2PhgKiA2YPT7nvtYmUJIFgexmRGCU3AU77PToQ195AitjgPVIlbl6G84FdnIQ600KQx8KmNb",
);

type Props = {
  checkoutID: string;
  appID: string;
};
export default function CheckoutPage(props: Props) {
  const [data, query] = trpc.payments.createClientSecret.useSuspenseQuery({
    id: props.checkoutID,
  });

  const params = useParams();
  const getReturnUrl = () => {
    return `${env.PUBLIC_BASE_URL}/dashboard/${props.appID}`;
  };

  const appearance: Appearance = {
    theme: "night",
    labels: "above",
    rules: {
      ".Input": {
        boxShadow: "none",
      },
      ".Tab": {
        boxShadow: "none",
      },
    },
    variables: {
      borderRadius: "6px",
      colorText: "hsl(210, 20%, 98%)",
      gridRowSpacing: "15px",
    },
  };
  return (
    <div className="w-full h-full lg:max-w-[500px]">
      {query.isFetched ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: data.payment_intent,
            appearance: appearance,
          }}
        >
          <CheckoutForm></CheckoutForm>
        </Elements>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}
