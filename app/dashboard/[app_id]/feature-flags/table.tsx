"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

type Feature = {
  slug: string;
  title: string;
  description: string;
  id: string;
};

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

interface FeatureFlag {
  id: string;
  description: string;
  title: string;
  slug: string;
}
interface FeatureTableProps {
  data: FeatureFlag[];
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const columns: ColumnDef<FeatureFlag>[] = [
  {
    accessorKey: "title",
    header: (h) => (
      <div className="flex items-center gap-3">
        <span className="text-base">Title</span>{" "}
        <ChevronDown className="h-4 w-4" />
      </div>
    ),
  },
  {
    accessorKey: "slug",
    header: (h) => (
      <div className="flex items-center gap-3">
        <span className="text-base">Key</span>{" "}
        <ChevronDown className="h-4 w-4" />
      </div>
    ),
  },

  {
    accessorKey: "description",
    header: (h) => (
      <div className="flex items-center gap-3">
        <span className="text-base">Description</span>{" "}
        <ChevronDown className="h-4 w-4" />
      </div>
    ),
  },


];

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  console.log(data);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="max-w-6xl">
      <Table className="table-fixed w-full max-w-6xl">
        <TableCaption>A list of your feature flags</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              <TableHead className="max-w-[300px]">
                <div className="flex items-center gap-3">
                  <span className="text-base">Title</span>{" "}
                  <ChevronDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="max-w-[300px]">
                <div className="flex items-center gap-3">
                  <span className="text-base">Key</span>{" "}
                  <ChevronDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="max-w-[400px]">
                <div className="flex items-center gap-3">
                  <span className="text-base">Description</span>{" "}
                  <ChevronDown className="h-4 w-4" />
                </div>
              </TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="hover:bg-transparent">
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="text-base w-70 max-w-70 text-ellipsis max-w-70 whitespace-nowrap overflow-hidden"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  );
}

export function FeatureFlagTable(props: FeatureTableProps) {
  return (
    <DataTable data={props.data} columns={columns}/>
  )
}
