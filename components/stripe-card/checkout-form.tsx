"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { useState } from "react";
type Props = {};
export default function CheckoutForm(props: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const params = useParams();
  const gatewayId = params["gateway_id"]!;
  const [isSubmitting, setSubmitting] = useState<boolean>();
  const onSubmitHandler = async (e: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    setSubmitting(true);

    try {
      if (!stripe || !elements) return null;
      stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `http://localhost:3000/dashboard/gateways/${gatewayId}`,
        },
      });
    } catch (error) {
      console.error("stripe error has occurred", error);
    }

    setSubmitting(false);
  };
  return (
    <div className="max-w-lg h-full flex flex-col gap-4">
      <p className="text-lg font-medium">Enter your Payment Information</p>
      <form onSubmit={onSubmitHandler} className="space-y-6">
        <PaymentElement></PaymentElement>
        <Button type="submit" disabled={isSubmitting} className="w-full py-6">
          Submit Payment
        </Button>
      </form>
    </div>
  );
}
