"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/server/trpc";
import { formatDistance } from "date-fns";
import { ChevronDownIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page({
  params: { app_id },
}: {
  params: { app_id: string };
}) {
  const { data: appStatus } = trpc.apps.showDetails.useQuery({ id: app_id });
  console.log(appStatus);
  const router = useRouter();
  return (
    <div className="h-full w-full space-y-6 px-12 py-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <p className="text-2xl font-semibold leading-6">{appStatus?.name}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground">Domains</p>
          <div className="text-xs gap-2 flex items-center">
            <span>{appStatus?.app_id}.lambdacrate.com </span>

            <div className="bg-muted py-1 px-2 flex gap-1 items-center rounded-full cursor-pointer">
              <span>+3</span>
              <ChevronDownIcon className="h-3 w-3"></ChevronDownIcon>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end lg:max-w-5xl">
        <p className="text-lg">Branches</p>
        <Link href={`/dashboard/${app_id}/new_branch`}>
          <Button size="sm">+ New Branch</Button>
        </Link>
      </div>
      <div className="lg:max-w-5xl w-full border rounded-lg ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Last Updated</TableHead>

              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appStatus?.branches?.length ?? 0 > 0 ? (
              appStatus?.branches?.map((branch) => (
                <TableRow key={branch.id} onClick={() => router.push(`${app_id}/${branch.slug}`)}>
                  <TableCell>{branch.name}</TableCell>
                  <TableCell>{branch.branch_type}</TableCell>
                  <TableCell>{branch.status}</TableCell>
                  <TableCell>
                    {formatDistance(Date.now(), branch.created_at, {
                      addSuffix: true,
                    })}
                  </TableCell>

                  <TableCell>
                    {formatDistance(Date.now(), branch.created_at, {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVerticalIcon></MoreVerticalIcon>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete Branch</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No Branches found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
