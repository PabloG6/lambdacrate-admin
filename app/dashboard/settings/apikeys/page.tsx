"use client";

import CreateAccount from "@/components/create-account";
import CreateApiKey from "@/components/create-keys";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { formatDate } from "@/lib/format";
import { GetRtAccounts } from "@/trpc/api/accounts/rate_limit/types";
import { ApiKeySchema } from "@/trpc/api/apikeys/types";
import { trpc } from "@/trpc/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";

const accountColumns: ColumnDef<ApiKeySchema>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
    header: "Key",
    accessorKey: "key",
  },
  {
    header: "Created At",
    accessorKey: "created_at",
    cell: ({ row }) => {
      const date = row.getValue("updated_at") as Date;
      const formattedDate = formatDate(date);

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
export default function Page() {
  const { data: api_keys, refetch } = trpc.api_keys.list.useQuery();
  const [isDialogOpen, setDialogOpenChange] = useState<boolean>(false);
  return (
    <>
      <div className="h-16 flex flex-col gap-3"></div>
      <div className="flex-col max-w-6xl w-full">
        <div className="h-12 w-full flex justify-end">
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpenChange}>
            <DialogTrigger asChild>
              <Button>Create Api Key</Button>
            </DialogTrigger>
            <DialogContent>
              <CreateApiKey
                onNotifySubmit={() => {
                  console.log("notifying submit");
                  setDialogOpenChange(false);
                  refetch();
                }}
              ></CreateApiKey>
            </DialogContent>
          </Dialog>
        </div>

        <DataTable data={api_keys ?? []} columns={accountColumns} />
      </div>
    </>
  );
}
