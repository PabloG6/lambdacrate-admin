"use client";

import { DataTable } from "@/components/data-table/data-table";
import { GetRtAccounts } from "@/trpc/api/accounts/rate_limit/types";
import { trpc } from "@/trpc/client";
import { ColumnDef } from "@tanstack/react-table";

type ParamProps = {
  gateway_id: string;
};

const accountColumns: ColumnDef<GetRtAccounts>[] = [
  {
    accessorKey: "id",
    header: "Account ID",
    cell: ({ row }) => {
      return <>{row.getValue("id")}</>;
    },
  },
  {
    header: "Email address",
    accessorKey: "email",
    cell: ({ row }) => {
      return <>{row.getValue("email")}</>;
    },
  },
  {
    header: "Created At",
    accessorKey: "created_at",
    cell: ({ row }) => {
      return <>{row.getValue("created_at")}</>;
    },
  },
  {
    header: "Updated at",
    accessorKey: "updated_at",
    cell: ({ row }) => {
      return <>{row.getValue("updated_at")}</>;
    },
  },
];
export default function Page({
  params: { gateway_id },
}: {
  params: ParamProps;
}) {
  const { data: accounts } = trpc.rate_limit.getAccounts.useQuery(gateway_id);

  return <DataTable data={accounts ?? []} columns={accountColumns} />;
}
