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
import { cn } from "@/lib/utils";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    footer?: string;
    className?: string;
    data: TData[];
  }
export function DataTable<TData, TValue>({
    columns,
    className, 
    footer,
    data,
  }: DataTableProps<TData, TValue>) {
    console.log(data);
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
    return (
      <div className={cn(className)}>
        <Table>
          <TableCaption>{footer}</TableCaption>
          <TableHeader >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                 {headerGroup.headers.map((header) => {
                  return <TableHead  key={header.id}>{header.isPlaceholder ? null: flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                  
                  })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-transparent">
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
  
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