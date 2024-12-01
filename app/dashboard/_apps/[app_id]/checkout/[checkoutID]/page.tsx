"use server";
import { BasicParamProps } from "@/lib/util/props";
import { HydrateClient, trpc } from "@/trpc/server";
import CheckoutPage from "../_components/checkout-page";
import PreviewCheckout from "../_components/preview-checkout";

type CheckoutProps = {
  checkoutID: string;
  app_id: string;
};

export default async function Page({ params }: BasicParamProps<CheckoutProps>) {
  void trpc.payments.createClientSecret.prefetch({ id: params.checkoutID });
  void trpc.payments.retrieveCheckoutCart.prefetch({ id: params.checkoutID });

  return (
    <HydrateClient>
      <main className="grid grid-cols-5 w-full gap-3">
        <div className="col-span-2 flex flex-col w-full h-full p-4">
        <CheckoutPage
          appID={params.app_id}
            checkoutID={params.checkoutID}
          
        />
        </div>
        <div className="col-span-3 w-full h-full p-4 flex flex-col" >
          <PreviewCheckout checkoutID={params.checkoutID}/>
        </div>

      </main>
    </HydrateClient>
  );
}
