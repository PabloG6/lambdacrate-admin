"use client";

import CreateAccount from "@/components/create-account";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { GetRtAccounts } from "@/trpc/api/accounts/rate_limit/types";
import { trpc } from "@/trpc/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";

type ParamProps = {
  gateway_id: string;
};

const accountColumns: ColumnDef<GetRtAccounts>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <>{row.getValue("id")}</>;
    },
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => {
      return <>{row.getValue("email")}</>;
    },
  },
  {
    header: "Created At",
    accessorKey: "created_at",
    cell: ({ row }) => {
      const date = row.getValue("updated_at") as Date;
      const formattedDate = format(date, "MMMM dd, yyyy, h:mm a");

      return <>{formattedDate}</>;
    },
  },
  {
    header: "Updated at",
    accessorKey: "updated_at",
    cell: ({ row }) => {
      const date = row.getValue("updated_at") as Date;
      const formattedDate = format(date, "MMMM dd, yyyy, h:mm a");
      return <>{formattedDate}</>;
    },
  },
];
export default function Page({
  params: { gateway_id },
}: {
  params: ParamProps;
}) {
  const { data: accounts, refetch } =
    trpc.rate_limit.getAccounts.useQuery(gateway_id);
  const [isDialogOpen, setDialogOpenChange] = useState<boolean>(false);
  return (
    <main className="w-full h-full">
      <DataTable data={accounts ?? []} columns={accountColumns} />;
    </main>
  );
}
