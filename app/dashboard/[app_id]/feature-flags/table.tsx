"use client";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import Link from "next/link";



export interface FeatureFlag {
  id: string;
  description: string;
  title: string;
  slug: string;
  inserted_at: Date
}
interface FeatureTableProps {
  data: FeatureFlag[];
}



export const columns: ColumnDef<FeatureFlag>[] = [
  {
    accessorKey: "title",
    header: (h) => (
      <Button size="sm" variant="ghost" className="space-x-2" >
       <span>
       Title
       </span>
        <ChevronDown className="h-4 w-4" />
      </Button>
    ),

    cell: ({row}) => (<div className="w-[150px] truncate">
      {row.getValue("title")}
    </div>)
  },
  {
    accessorKey: "slug",
    cell: ({row}) => (<code>{row.getValue("slug")}</code>),
    header: (h) => (
      <Button size="sm" variant="ghost" className="space-x-2" >
      <span>
      Key
      </span>
       <ChevronDown className="h-4 w-4" />
     </Button>
    ),
    
  },

  {
    accessorKey: "description",
    cell: ({row}) => (<div className="flex space-x-2"><span className="max-w-[500px] truncate">{row.getValue('description')}</span></div>),
    header: (h) => (
      <Button size="sm" variant="ghost" className="space-x-2" >
      <span>
      Description
      </span>
       <ChevronDown className="h-4 w-4" />
     </Button>
    ),
  },


];



export function FeatureFlagTable(props: FeatureTableProps) {
  return (
    <div className="border rounded-md mt-4">
          <DataTable data={props.data} footer="Your feature flags" columns={columns}/>

    </div>
  )
}
