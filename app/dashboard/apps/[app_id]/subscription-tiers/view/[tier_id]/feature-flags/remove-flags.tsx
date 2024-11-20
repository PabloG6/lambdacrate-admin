import { FeatureFlag } from "@/app/dashboard/[app_id]/feature-flags/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table } from "@tanstack/react-table";
import { Minus } from "lucide-react";
type TRecord  = {
  id: string;
}
type Props<TData extends TRecord> = {
  table: Table<TData>;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (values: TData[]) => void;
}
export function RemoveFlagsButton<TData extends TRecord>({table,open, onSubmit, setOpen}: Props<TData>) {
    const rows = table.getSelectedRowModel().rows;
    console.log(rows);
    return (
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            disabled={rows.length <= 0}
            onClick={() => setOpen(true)}
          >
            {" "}
            <Minus className="h-4 w-4 mr-2" /> Remove Selected
          </Button>
        </DialogTrigger>
  
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Remove Flags?
            </DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to remove <code>{Object.keys(rows).length}</code> feature flags?</p>
          <DialogFooter>
            <DialogClose asChild>
            <Button variant={'ghost'} size='sm'>Cancel</Button>
            </DialogClose>
         <Button variant={'destructive'} size='sm' onClick={() => {
          const rowsToDelete: TData[]= [];
          rows.map((row) => {
            rowsToDelete.push(row.original);
          })

          onSubmit(rowsToDelete)

         }}>Delete Flags</Button>
          </DialogFooter>
        </DialogContent>
        
      </Dialog>
    );
  }