"use client";

import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";


import { branchSearchParams } from "@/trpc/api/branches/types";
import { trpc } from "@/trpc/client";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistance } from "date-fns";
import { ChevronDownIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { branchColumns } from "./_components/branch-columns";
import { GetBranchType } from "@/types/apps";

export default function Page({
  params: { app_id },
}: {
  params: { app_id: string };
}) {
  const { data: appStatus } = trpc.apps.showDetails.useQuery({ id: app_id });
  const {data: branches} = trpc.branches.allBranches.useQuery({id: app_id})
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
      <div className="lg:max-w-5xl w-full">
        
    <DataTable columns={branchColumns} onRowSelected={((value: GetBranchType) => {
      router.push(`/dashboard/${app_id}/${value.slug}`)
    })} data={branches?? []} schema={branchSearchParams}/>

      </div>
    </div>
  );
}
