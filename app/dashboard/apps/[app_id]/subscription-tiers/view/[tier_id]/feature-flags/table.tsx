"use client";
import { getFeatureFlags } from "@/app/dashboard/[app_id]/feature-flags/actions";
import {
  FeatureFlag,
  FeatureFlagTable,
} from "@/app/dashboard/[app_id]/feature-flags/table";
import { DataTable } from "@/app/examples/tasks/components/data-table";
import { DataTableColumnHeader } from "@/app/examples/tasks/components/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandGroup,
  CommandEmpty,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,

  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  ChevronDown,
  Key,
  Minus,
  Plus,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { typeid } from "typeid-js";
import {
  addFeatureFlagTiers,
  getFeatureFlagTiers,
  getMissingFlagTiers,
  removeFeatureFlags,
} from "../../../actions";
import { CommandDialog } from "cmdk";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,

} from "@/components/ui/table";
import table from "../../../table";
import { DialogClose } from "@radix-ui/react-dialog";
import { RemoveFlagsButton } from "./remove-flags";
const columns: ColumnDef<FeatureFlag>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
  },

  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader title="ID" column={column} className="w-[100px]" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">
        <div className="truncate">{row.getValue("id")}</div>
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: (h) => (
      <Button size="sm" variant="ghost" className="space-x-2">
        <span>Title</span>
        <ChevronDown className="h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Key" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue("slug")}</div>
    ),
  },

  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="w-auto">{row.getValue("description")}</div>
    ),
  },
];
export default function SubFeatureFlagTable({ data }: { data: FeatureFlag[] }) {
  const { tier_id }: { tier_id: string } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [removableFlags, setFeatureFlags] = useState<any[]>([]);
  const [missingFlags, setMissingFlags] = useState<any[]>([]);
  useEffect(() => {
    async function fetchFlags() {
      const results = await getFeatureFlagTiers(tier_id);
      console.log(results);
      setFeatureFlags([...results]);
    }

    async function fetchMissingFlags() {
      const response = await getMissingFlagTiers(tier_id);
      setMissingFlags([...response]);
      console.log("missing flags", response);
    }
    fetchFlags();
    fetchMissingFlags();
  }, [tier_id]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [openRemoveFlags, isRemoveFlagsOpen] = useState<boolean>(false);
  const table = useReactTable({
    data: removableFlags,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),

    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="w-full h-full pt-6">
      <div className="w-full flex justify-end gap-2 py-2">
        <RemoveFlagsButton table={table} setOpen={isRemoveFlagsOpen} open={openRemoveFlags} onSubmit={async function (values: any[]) {
          const response = await removeFeatureFlags(values);
          const results = await getFeatureFlagTiers(tier_id);
          setFeatureFlags([...results])
          table.toggleAllPageRowsSelected(false);

          isRemoveFlagsOpen(false);
        } } />
        <AddFlagButton
          featureFlags={missingFlags}
          open={open}
          setOpen={setOpen}
          onSubmit={async (values: any[]) => {
            const response = await addFeatureFlagTiers(tier_id, {
              flags: values,
            });
            console.log("adding feature flag tiers");
            const results = await getFeatureFlagTiers(tier_id);
            setOpen(false);
            setFeatureFlags([...results]);

            table.toggleAllPageRowsSelected(false);
          }}
        ></AddFlagButton>
      </div>
      <div>
        <div className="rounded-md border">
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function AddFlagButton({
  open,
  onSubmit,
  featureFlags,
  setOpen,
}: {
  featureFlags: any[];
  onSubmit: (values: any[]) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  useEffect(() => {
    console.log("use effect called for add flag button.");
  }, []);
  const [selectedFlags, setSelectedFlag] = useState<any[]>([]);
  useEffect;
  const [isSubmitting, setSubmitting] = useState<boolean>();
  const { tier_id }: { tier_id: string } = useParams();
  const submit = async () => {
    setSubmitting(true);

    setSubmitting(false);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        console.log("open change", open);
        setOpen(open);
        setSelectedFlag([]);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Flag
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Feature Flags</DialogTitle>
        </DialogHeader>
        <Command>
          <CommandInput placeholder="Search flags" />
          <ScrollArea className="w-[400px] whitespace-nowrap py-2">
            <div className="w-max flex items-center space-x-2">
              {selectedFlags.map((val) => (
                <Badge
                  variant={"secondary"}
                  key={val.id}
                  onClick={() => {
                    console.log("hello world", val);
                    const index = selectedFlags.findIndex(
                      (t) => val.slug == t.slug
                    );
                    console.log(index);
                    selectedFlags.splice(index, 1);
                    setSelectedFlag([...selectedFlags]);
                  }}
                >
                  <X className="h-3 w-3 -ml-1" /> <span>{val.slug}</span>
                </Badge>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <CommandEmpty>No Flags found.</CommandEmpty>
          <CommandGroup>
            {featureFlags.map((value: FeatureFlag) => {
              const isDisabled = selectedFlags.find(
                (s) => s.slug == value.slug
              );
              return (
                <CommandItem
                  disabled={isDisabled}
                  className="my-2"
                  value={`${value.title}:${value.slug}`}
                  key={value.id}
                  onSelect={(value) => {
                    console.log("select", value);
                    const [title, slug] = value.split(":");

                    const featureFlag = featureFlags.find(
                      (val) => val.slug === slug.trim()
                    );

                    setSelectedFlag([
                      ...selectedFlags,
                      {
                        feature_id: featureFlag?.id,
                        tier_id: tier_id,
                        slug: featureFlag?.slug,
                        id: featureFlag?.id,
                      },
                    ]);
                  }}
                >
                  <code className="truncate text-xs">
                    <div className="inline-flex truncate max-w-[200px]">
                      {" "}
                      {value.title}
                    </div>
                    : <Badge variant={"secondary"}>{value.slug}</Badge>
                  </code>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
        <DialogFooter className="flex items-center gap-4">
          <code className="text-xs text-muted-foreground">
            {" "}
            {selectedFlags.length > 0 ? (
              <span>{selectedFlags.length} flags selected</span>
            ) : (
              <span>No flags selected</span>
            )}
          </code>
          <Button
            disabled={selectedFlags.length == 0 || isSubmitting}
            size="sm"
            onClick={async () => await onSubmit(selectedFlags)}
          >
            Add Flags
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


