"use client";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { trpc } from "@/trpc/client";
import { ColumnDef } from "@tanstack/react-table";
import { TruncatedCell } from "@/components/truncated-cell";
import { GetRtSubscriptions } from "@/trpc/api/accounts/rate_limit/types";
import SubscriptionForm from "@/components/subscription-form";
import { format } from "date-fns";
import { MoreVerticalIcon } from "lucide-react";

type ParamProps = {
  gateway_id: string;
};

const productColumns: ColumnDef<GetRtSubscriptions>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <div className="font-mono">{row.index}</div>;
    },
  },
  {
    accessorKey: "id",
    header: () => {
      return <div> ID </div>;
    },

    cell: ({ row }) => {
      return (
        <TruncatedCell content={row.getValue("id")} className="max-w-[150px]">
          {row.getValue("id")}
        </TruncatedCell>
      );
    },
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      return <div className="max-w-[250ps] w-full">{row.getValue("name")}</div>;
    },
  },

  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => {
      return <div className="w-[120px]">{row.getValue("email") as string}</div>;
    },
  },
  {
    header: "Created At",
    accessorKey: "created_at",
    cell: ({ row }) => {
      const date = row.getValue("created_at") as Date;
      const formattedDate = format(date, "MMMM dd, yyyy, h:mm a");

      return <div>{formattedDate}</div>;
    },
  },
  {
    header: "Updated At",
    accessorKey: "updated_at",
    cell: ({ row }) => {
      const date = row.getValue("updated_at") as Date;
      const formattedDate = format(date, "MMMM dd, yyyy, h:mm a");

      return <div>{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Button variant={"ghost"} size="icon">
          <MoreVerticalIcon />
        </Button>
      );
    },
  },
];
export default function Page({
  params: { gateway_id },
}: {
  params: ParamProps;
}) {
  const { data: subscriptions } =
    trpc.gateway.subscriptions.list.useQuery(gateway_id);
  const onSubmit = () => {};
  return (
    <main className="w-full h-full">
      <DataTable data={subscriptions ?? []} columns={productColumns} />;
    </main>
  );
}
