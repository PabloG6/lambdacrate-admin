"use client";

import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  Table as TTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/custom/table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import type { DataTableFilterField } from "@/components/data-table/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useQueryStates } from "nuqs";
import { searchParamsParser } from "@/lib/util/search-params";
import { useRouter } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowSelected?: (value: TData) => void;
  defaultColumnFilters?: ColumnFiltersState;
  // TODO: add sortingColumnFilters
  filterFields?: DataTableFilterField<TData>[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowSelected,

  defaultColumnFilters = [],
  filterFields = [],
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(defaultColumnFilters);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [columnVisibility, setColumnVisibility] =
    useLocalStorage<VisibilityState>("data-table-visibility", {});
  const [controlsOpen, setControlsOpen] = useLocalStorage(
    "data-table-controls",
    true,
  );
  const [_, setSearch] = useQueryStates(searchParamsParser);

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters, sorting, columnVisibility, pagination },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: (table: TTable<TData>, columnId: string) => () => {
      const map = getFacetedUniqueValues<TData>()(table, columnId)();
      // TODO: it would be great to do it dynamically, if we recognize the row to be Array.isArray
      if (["regions", "tags"].includes(columnId)) {
        const rowValues = table
          .getGlobalFacetedRowModel()
          .flatRows.map((row) => row.getValue(columnId) as string[]);
        for (const values of rowValues) {
          for (const value of values) {
            const prevValue = map.get(value) || 0;
            map.set(value, prevValue + 1);
          }
        }
      }
      return map;
    },
  });

  React.useEffect(() => {
    const columnFiltersWithNullable = filterFields.map((field) => {
      const filterValue = columnFilters.find(
        (filter) => filter.id === field.value,
      );
      if (!filterValue) return { id: field.value, value: null };
      return { id: field.value, value: filterValue.value };
    });

    const search = columnFiltersWithNullable.reduce(
      (prev, curr) => {
        prev[curr.id as string] = curr.value;
        return prev;
      },
      {} as Record<string, unknown>,
    );

    console.log({ search });

    setSearch(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnFilters]);

  return (
    <div className="flex w-full h-full flex-col gap-3 sm:flex-row">
      <div className="flex max-w-full flex-1 flex-col gap-4 p-1">
        <div className="border">
          <ScrollArea className="max-h-[470px]">
            <Table className="h-full">
              <TableHeader className="bg-muted/50 sticky top-0">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
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
                      onClick={() => onRowSelected?.(row.original)}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-full text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
