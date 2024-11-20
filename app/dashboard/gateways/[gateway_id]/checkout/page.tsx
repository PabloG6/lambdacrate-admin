import ElementsProvider from "@/components/elements-provider.tsx";
import CheckoutForm from "@/components/stripe-card/checkout-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/trpc/server";
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
  return (
    <div className="grid grid-cols-5 gap-6  w-full px-8 py-4 h-full">
      <div className="col-span-2">
        <div className="gap-6 flex flex-col px-8 justify-center">
          <div>
            <h2 className="text-2xl font-bold">Order Summary</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between gap-2 flex-col">
              <span className="text-xl font-medium">{gateway.name}</span>
              <p className="flex gap-2">
                <span className="text-base text-muted-foreground">
                  {gateway.description}
                </span>
                <span className="text-base">&ndash;</span>
                <span className="capitalize">
                  {getPriceDetails(gateway.price_id)}
                </span>
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-base">Products</p>
            <Accordion type="single" collapsible>
              {gateway.products.map((product) => (
                <AccordionItem
                  value={product.id}
                  className="border rounded-md"
                  key={product.id}
                >
                  <AccordionTrigger className="py-2 px-2 hover:no-underline">
                    <p>
                      <span>{product.name}</span>{" "}
                      <span className="mx-2">&ndash;</span>
                      <span className="text-muted-foreground">
                        {product.description}
                      </span>
                    </p>
                  </AccordionTrigger>
                  <AccordionContent className="px-2">
                    <p className="font-mono">
                      <span className="font-medium">{product.rate_limit}</span>{" "}
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
  );
}
