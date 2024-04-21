"use client";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MachineProps } from "./columns";

const columns: ColumnDef<MachineProps>[] = [
  {
    accessorFn: (row) => row,
    header: "Machine",
    cell: (cell) => {
      const row = cell.row.original;

      return (
        <div className="flex items-center gap-4">
           <div className="h-3 w-3 rounded-full flex items-center bg-green-300  animate-pulse justify-center">
            <span className="h-2 w-2 bg-green-500 rounded-full"></span>
          </div>
          <div>
       
       <div className="font-medium space-x-2 flex items-center">
         <span>{row.id}</span>
       </div>

       <div className="font-light">{row.name}</div>
     </div></div>
      
      );
    },
  },
  {
    accessorKey: "type",
    header: "Machine Type",
  },

  {
    accessorKey: "size",
    header: "Size/CPU",
  },
 
];

interface MachineTableProps {
  data: MachineProps[];
}

export function MachineTable({ data }: MachineTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
