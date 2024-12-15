import ElementsProvider from "@/components/elements-provider.tsx";
import CheckoutForm from "@/components/stripe-card/checkout-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { HydrateClient, trpc } from "@/trpc/server";
import { getPriceDetails } from "@/trpc/utils/server-utils";
import { Suspense } from "react";

type ParamProps = {
  gateway_id: string;
};
type SearchParamProps = {
  ref_id: string;
};
export default async function Page({
  params: { gateway_id },
}: {
  params: ParamProps;
  searchParams: SearchParamProps;
}) {
  const gateway = await trpc.gateway.show(gateway_id);
  const products = await trpc.gateway.products.index(gateway_id);
  return (
    <HydrateClient>
      <div className="grid grid-cols-5 gap-6  w-full px-8 py-4 h-full">
        <div className="col-span-2">
          <div className="gap-6 flex flex-col px-8 justify-center">
            <div>
              <h2 className="text-2xl font-bold">Order Summary</h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between gap-2 flex-col">
                <span className="text-xl font-medium">{gateway.name}</span>
                <p className="flex gap-2 items-center">
                  <span className="text-base text-muted-foreground">
                    {gateway.description}
                  </span>
                  &mdash;
                  <span className="capitalize text-base">
                    {getPriceDetails(gateway.price_id)} Subscription
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-base">Products</p>
              <Accordion type="single" collapsible className="space-y-4">
                {products.map((product) => (
                  <AccordionItem
                    value={product.id}
                    className="border rounded-md"
                    key={product.id}
                  >
                    <AccordionTrigger className="flex w-full items-start py-2 px-2 hover:no-underline">
                      <div>
                        <p>{product.name}</p>{" "}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-2">
                      <p className="font-mono">
                        <span className="font-medium">
                          {product.rate_limit}
                        </span>{" "}
                        requests every{" "}
                        <span className="font-medium">
                          {product.interval_count}
                        </span>{" "}
                        <span>{product.interval}</span>
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <Suspense fallback={<Skeleton></Skeleton>}>
            <ElementsProvider checkout_id={gateway_id}>
              <CheckoutForm></CheckoutForm>
            </ElementsProvider>
          </Suspense>
        </div>
      </div>
    </HydrateClient>
  );
}
