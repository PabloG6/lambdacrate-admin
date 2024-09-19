'use client';
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { SearchParamSchema } from "@/types/invoice";
import { trpc } from "@/server/trpc";
// import { trpc } from "@/server/trpc";

const invoiceItems = [
  {
    id: 1,
    description: "Dashboard",
    quantity: 1,
    price: 300,
    breakdown: [
      { description: "Dashboard", hours: 4, rate: 50 },
      { description: "API", hours: 6, rate: 60 },
    ],
  },
  { id: 2, description: "Hosting (3 months)", quantity: 3, price: 75 },
  { id: 3, description: "Domain Name (1 year)", quantity: 1, price: 50 },
];

const taxRate = 0.1; // 10% tax rate
type ClassProps = {
  className?: string;
};
export default function InvoicePreview({ className }: ClassProps) {
  const searchParams = useSearchParams();

  const queryParams = Object.fromEntries(searchParams.entries())

const utils = trpc.useUtils();
const {isFetching, data, isError, isSuccess} = trpc.payments.invoice_preview.useQuery(queryParams);
  useEffect(() => {

    const queryParams = Object.fromEntries(searchParams.entries())
    utils.payments.invoice_preview.invalidate();
    console.log(data);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  const subtotal = invoiceItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const [isBreakdownOpen, setIsBreakdownOpen] = React.useState(false);

  return (
    <Card className={cn("w-full max-w-3xl mx-auto", className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Invoice</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="font-mono">
              <TableHead className="w-[50%]">Description</TableHead>
              <TableHead className="text-right">Plan</TableHead>
              <TableHead className="text-right">Price/mo</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item) => (
              <React.Fragment key={item.id}>
                <TableRow>
                  <TableCell>
                    {item.description}
                    {item.breakdown && (
                      <Collapsible
                        open={isBreakdownOpen}
                        onOpenChange={setIsBreakdownOpen}
                      >
                        <CollapsibleTrigger className="flex items-center text-sm text-blue-500 hover:underline">
                          {isBreakdownOpen ? (
                            <>
                              Hide Breakdown{" "}
                              <ChevronUp className="h-4 w-4 ml-1" />
                            </>
                          ) : (
                            <>
                              Show Breakdown{" "}
                              <ChevronDown className="h-4 w-4 ml-1" />
                            </>
                          )}
                        </CollapsibleTrigger>
                      </Collapsible>
                    )}
                  </TableCell>
                  <TableCell className="text-right">1</TableCell>
                  <TableCell className="text-right">
                    ${item.total.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${item.total}
                  </TableCell>
                </TableRow>
                {item.breakdown && (
                  <TableRow>
                    <TableCell colSpan={4} className="p-0">
                      <Collapsible
                        open={isBreakdownOpen}
                        onOpenChange={setIsBreakdownOpen}
                      >
                        <CollapsibleContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Task</TableHead>
                                <TableHead className="text-right">
                                  Hours
                                </TableHead>
                                <TableHead className="text-right">
                                  Rate
                                </TableHead>
                                <TableHead className="text-right">
                                  Amount
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {item.breakdown.map((breakdownItem, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    {breakdownItem.name}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {breakdownItem.cpu_count}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    ${breakdownItem.price_per_hour.toFixed(2)}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    $
                                    {(
                                      breakdownItem.price_per_hour * 2_688_288
                                    ).toFixed(2)}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CollapsibleContent>
                      </Collapsible>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>

        <div className="mt-6 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
