"use client";
import { NavLink, Navbar } from "@/components/navbar";
import { getSubscriptionTier } from "../../actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Wallet } from "lucide-react";
import { link } from "fs";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
type Subscription = {
  id: string;
  name: string;
  email: string;
  start_date: Date;
  end_date: Date;
  auto_renew: boolean;
};
const columns: ColumnDef<Subscription>[] = [
  {
    id: "name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,

  },
  {
    id: "email",
    accessorKey: 'email',
    cell: ({ row }) => <div>{row.getValue("email")}</div>,

  },
  {
    id: "start_date",
    accessorKey: 'start_date',
    cell: ({ row }) => <div>{row.getValue("start_date")}</div>,

  },
  {
    id: "end_date",
    accessorKey: 'end_date',
    header: (header) => (<Button size='sm' variant={'ghost'}>End Date</Button>),
    cell: ({ row }) => <div>{row.getValue("end_date")}</div>,

  },

  {
    id: 'auto_renew',
    accessorKey: 'auto_renew',
    cell: ({row}) => <div>{row.getValue('auto_renew')}</div>
  }
];

const subscriptions: Subscription[] = []
export default function Page({
  params: { tier_id },
}: {
  params: { tier_id: string };
}) {
  //   const results = await getSubscriptionTier(tier_id);
  return (
    <div className="w-full h-full">
      <DataTable columns={columns} data={subscriptions} />
    </div>
  );
}
