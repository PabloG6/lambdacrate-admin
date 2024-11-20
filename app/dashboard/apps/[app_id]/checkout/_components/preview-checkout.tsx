"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/trpc/client";

type Props = {
  checkoutID: string;
};
export default function PreviewCheckout(props: Props) {
  const [data, query] = trpc.payments.retrieveCheckoutCart.useSuspenseQuery({
    id: props.checkoutID,
    
  }, {refetchOnWindowFocus: false});

  return (
    <div className="flex flex-col gap-5">
        <p className="text-2xl font-medium">Order Summary</p>
      {data.items.map((item, index) => (
        <Card key={index} className="max-w-[600px]">
          <CardHeader>
            <CardTitle className="text-xl">{item.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Hourly Price:</div>
              <div className="text-right">
                ${item.hourly_price.toFixed(3)}/hr
              </div>
              <div>Monthly Price:</div>
              <div className="text-right">
                ${item.monthly_price.toFixed(2)}/mo
              </div>
              <div>Total Cost (Month):</div>
              <div className="text-right">${item.total.toFixed(2)}</div>
              {/* <div>CPU:</div>
                  <div className="text-right">{item.}</div>
                  <div>RAM:</div>
                  <div className="text-right">{item.ramSize}</div>
                  <div>Type:</div>
                  <div className="text-right">{item.type}</div> */}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
