"use client";

import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { trpc } from "@/trpc/client";
import { CreateProductGateway, ShowProduct } from "@/trpc/api/gateway/types";
import { ColumnDef } from "@tanstack/react-table";
import { TruncatedCell } from "@/components/truncated-cell";
import GwProductForm from "@/components/GwProductForm";
import { DialogTitle } from "@radix-ui/react-dialog";
import { HelpCircle } from "lucide-react";
import { TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { useState } from "react";

type ParamProps = {
  gateway_id: string;
};

const productColumns: ColumnDef<ShowProduct>[] = [
  {
    id: "index",
    header: () => {
      return <div className="w-[32px] text-center border-r">#</div>;
    },
    cell: ({ row }) => {
      return <div className="font-mono text-center">{row.index}</div>;
    },
  },
  {
    accessorKey: "id",
    header: (obj) => {
      return <div className="w-[150px]">ID </div>;
    },
    meta: {},
    cell: ({ row }) => {
      return (
        <TruncatedCell
          content={row.getValue("id")}
          className="w-[150px] truncate whitespace-nowrap"
        >
          {row.getValue("id")}
        </TruncatedCell>
      );
    },
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <div className="max-w-[150px] w-full truncate whitespace-nowrap">
          {row.getValue("name")}
        </div>
      );
    },
  },

  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => {
      return (
        <div className="w-[350px] whitespace-nowrap truncate">
          {row.getValue("description") as string}
        </div>
      );
    },
  },

  {
    header: "Ext ID",
    accessorKey: "ext_id",
    cell: ({ row }) => {
      return (
        <div className="w-[150px] truncate whitespace-nowrap">
          {row.getValue("ext_id")}
        </div>
      );
    },
  },
  {
    header: "Tokens",
    accessorKey: "rate_limit",
  },
  {
    header: () => {
      return (
        <div className="flex flex-1 justify-center items-center gap-2">
          <span className="text-center">Refresh Window</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 hover:cursor-pointer" />
              </TooltipTrigger>

              <TooltipContent>Displayed in seconds.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
    accessorKey: "interval_count",
    cell: ({ row }) => {
      const constants = {
        hours: 3600, // 1 hour = 3600 seconds
        minutes: 60, // 1 minute = 60 seconds
        seconds: 1, // 1 second = 1 second
      };

      const unit = row.original.interval;
      const tokenWindow = constants[unit] * row.original.interval_count;
      return <span className="text-center">{tokenWindow}</span>;
    },
  },
];
export default function Page({
  params: { gateway_id },
}: {
  params: ParamProps;
}) {
  const { data: products, refetch } =
    trpc.gateway.products.index.useQuery(gateway_id);
  const [isDialogOpen, onDialogOpenChange] = useState<boolean>(false);
  const { mutateAsync } = trpc.gateway.products.create.useMutation();
  const onSubmit = async (data: CreateProductGateway) => {
    const response = await mutateAsync({ ...data, gateway_id: gateway_id });
    refetch();
    onDialogOpenChange(false);
  };

  return (
    <main className="w-full h-full">
      <div className="h-16 flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Products</h1>
      </div>
      <div className="h-12 w-full flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={onDialogOpenChange}>
          <DialogTrigger asChild>
            <Button>Create Product</Button>
          </DialogTrigger>
          <DialogTitle className="sr-only"></DialogTitle>
          <DialogContent>
            <GwProductForm onSubmit={onSubmit}></GwProductForm>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable data={products ?? []} columns={productColumns} />;
    </main>
  );
}
