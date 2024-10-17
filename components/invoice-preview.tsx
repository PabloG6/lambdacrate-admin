"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { trpc } from "@/trpc/client";
import { Button } from "./ui/button";
import { TotalType } from "@/trpc/api/payments/types";
// import { trpc } from "@/server/trpc";

const taxRate = 0.1; // 10% tax rate
type ClassProps = {
  className?: string;
  onCheckout: (data: TotalType | undefined) => void;
};
export default function InvoicePreview({ className, onCheckout }: ClassProps) {
  const searchParams = useSearchParams();

  const queryParams = Object.fromEntries(searchParams.entries());

  const utils = trpc.useUtils();
  const { isFetching, data, isError, isSuccess } =
    trpc.payments.invoice_preview.useQuery(queryParams, {refetchOnWindowFocus: false});


  useEffect(() => {
    utils.payments.invoice_preview.invalidate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
              <TableHead className="">Name</TableHead>
              <TableHead className="text-right">Plan</TableHead>
              <TableHead className="text-right">
                Price/<sub>hr</sub>
              </TableHead>
              <TableHead className="text-right">
                Total/<sub>mo</sub>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.items.map((item) => (
              <React.Fragment key={item.id}>
                <TableRow>
                  <TableCell className="w-[50%]">
                    <div className="truncate">{item.name}</div>
                    {item.breakdown && (
                      <Collapsible
                        open={isBreakdownOpen}
                        onOpenChange={setIsBreakdownOpen}
                      >
                        <CollapsibleTrigger className="flex items-center text-sm text-blue-500 hover:underline">
                          {isBreakdownOpen ? (
                            <>
                              Hide Breakdown
                              <ChevronUp className="h-4 w-4 ml-1" />
                            </>
                          ) : (
                            <>
                              Show Breakdown
                              <ChevronDown className="h-4 w-4 ml-1" />
                            </>
                          )}
                        </CollapsibleTrigger>
                      </Collapsible>
                    )}
                  </TableCell>
                  <TableCell className="text-right">Hobby</TableCell>
                  <TableCell className="text-right">
                    ${(item.total).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${(item.total).toFixed(2)}
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
                                <TableHead>CPU Count</TableHead>
                                <TableHead className="text-right">
                                  Ram
                                </TableHead>
                                <TableHead className="text-right">
                                  Hrly Rate
                                </TableHead>
                                <TableHead className="text-right">
                                  Monthly Total
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {item.breakdown.map((breakdownItem, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    {breakdownItem.cpu_count}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {breakdownItem.ram}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    $
                                    {(
                                      breakdownItem.price_per_hour * 36_00
                                    ).toFixed(5)}
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
            <span>${data?.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (10%)</span>
            <span>${(0).toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${data?.total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Checkout</Button>
      </CardFooter>
    </Card>
  );
}
