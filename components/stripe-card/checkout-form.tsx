"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CardHeader, CardTitle } from "../ui/card";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
type Props = {
  return_url: string;
};
export default function CheckoutForm(props: Props) {
  const stripe = useStripe();
  const elements = useElements();
  
  const onSubmitHandler = async (e: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    try {
      if (!stripe || !elements) return null;

      await stripe?.confirmSetup({ elements, confirmParams: {
        return_url: props.return_url
      } });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-lg flex flex-col gap-4">
      <p className="text-2xl font-medium">Enter your Payment Information</p>
      <form onSubmit={onSubmitHandler} className="space-y-6">
        <PaymentElement options={{}}></PaymentElement>
        <Button type="submit" className="w-full py-6">
          Submit Payment
        </Button>
      </form>
    </div>
  );
}
