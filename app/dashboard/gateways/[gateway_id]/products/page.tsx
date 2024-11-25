"use client";

import CreateAccount from "@/components/create-account";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { trpc } from "@/trpc/client";
import { ShowProduct } from "@/trpc/api/gateway/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

type ParamProps = {
  gateway_id: string;
};

const productColumns: ColumnDef<ShowProduct>[] = [
  {
    accessorKey: "id",
    header: "Product ID",
    cell: ({ row }) => {
      return <>{row.getValue("id")}</>;
    },
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      return <>{row.getValue("name")}</>;
    },
  },

  {
    header: "Description",
    accessorKey: "description",
  },

  {
    header: "Ext ID",
    accessorKey: "ext_id",
  },
  {
    header: "Max Tokens",
    accessorKey: "rate_limit",
  },
  {
    header: "Interval",
    accessorFn: (originalRow) => {},
  },
];
export default function Page({
  params: { gateway_id },
}: {
  params: ParamProps;
}) {
  const { data: gateway } = trpc.gateway.show.useQuery(gateway_id);

  return (
    <main className="w-full h-full">
      <div className="h-16 flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Customers</h1>
      </div>
      <div className="h-12 w-full flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Product</Button>
          </DialogTrigger>
          <DialogContent>
            <CreateAccount></CreateAccount>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable data={gateway?.products ?? []} columns={productColumns} />;
    </main>
  );
}
