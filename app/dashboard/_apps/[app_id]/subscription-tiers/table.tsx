"use client";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/components/navbar";

type SubTier = {
  name: string;
  description: string;
  price: number;
  id: string;
};

interface SubTierTableProps {
  rows: SubTier[];
}

const columns: ColumnDef<SubTier>[] = [
  {
    accessorKey: "name",
    header: (h) => (
      <Button variant={"ghost"} size="sm" className="-ml-3 ">
        Name
        <ChevronDown className="h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) => (
      <div className="w-24 flex items-center">
        <span>{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "description",
    cell: ({ row }) => (
      <div className="flex items-center w-full">
        <div className="max-w-[500px] w-full truncate">
          {row.getValue("description")}
        </div>
      </div>
    ),
    header: (h) => (
      <div className="flex items-center w-full">
        <Button variant="ghost" size="sm" className="px-3 -ml-3">
          Description
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "price",

    header: (h) => (
      <Button variant={"ghost"} size="sm" className="-ml-3">
        Price
        <ChevronDown className="h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) => <div>{row.getValue("price")}</div>,
  },
  {
    id: "id",

    cell: ({ row }) => {
      const tier = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(tier.id)}
            >
              Copy Sub Tier ID
            </DropdownMenuItem>

            <DropdownMenuItem className="space-x-3">
              {" "}
              <ArrowRightIcon /> View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


export default function  SubTierComponent(props: SubTierTableProps) {
  const path = usePathname();
  return (
    <div className="px-2 py-3 mt-4 max-w-6xl w-full h-full space-y-4">
            <div className="text-xl font-medium"><span>Your tiers</span></div>
            <div className=" grid grid-cols-3 gap-4">
      {props.rows.map((value) => (
     <Link href={`${path}/view/${value.id}`} key={value.id}>
         <Card className="w-full hover:bg-muted transition-all cursor-pointer" key={value.id}>
          <CardHeader>
            <CardTitle>{value.name}</CardTitle>
            <CardDescription>
              {value.description}
            </CardDescription>
          </CardHeader>
          <CardContent>

          </CardContent>
          <CardFooter className="flex justify-between">

          </CardFooter>
        </Card>
     </Link>
      ))}
    </div>

    </div>
  
  );
}
