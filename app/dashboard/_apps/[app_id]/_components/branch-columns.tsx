"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { GetBranchType, GetDeployment } from "@/types/apps";
import TextWithTooltip from "@/components/custom/text-with-tooltip";
import { formatDistance } from "date-fns";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export const branchColumns: ColumnDef<GetBranchType>[] = [
  {
    accessorKey: "slug",
    header: "Name",
    cell: ({ row }) => {
      const text = row.getValue("slug") as string;
      return (
        <TextWithTooltip className="font-mono max-w-[100px]" text={text} />
      );
    },
  },

  {
    accessorKey: "target_branch",
    header: "Branch",
  },

  {
    accessorKey: "active_deployment",
    header: "Status",
    cell: ({ row }) => {
      const deployment = row.getValue("active_deployment") as GetDeployment;

      if (!deployment) {
        return (
          <div className="font-mono capitalize text-xs border rounded-sm p-1 text-center text-orange-500 w-28">
            <span>Not Deployed</span>
          </div>
        );
      }

      const status = deployment.status.replaceAll("_", " ");

      const colorScheme = (function (status) {
        if (status == "active") {
          return "text-green-500";
        }

        if (status == "failed") {
          return "text-red-500";
        }

        return "text-yellow-500";
      })(status);
      return (
        <div
          className={cn(
            "font-mono capitalize text-xs border rounded-sm p-1 text-center w-28",
            colorScheme,
          )}
        >
          <span>{status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "branch_type",
    header: "Environment",
    cell: ({ row }) => {
      const branchType = row.getValue("branch_type") as string;
      return <div className="font-mono">{branchType}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("created_at") as Date;
      const formattedDate = formatDate(date);
      return <>{formattedDate}</>;
    },
  },

  {
    accessorKey: "updated_at",
    header: "Last Updated",
    cell: ({ row }) => {
      const date = row.getValue("updated_at") as Date;
      const formattedDate = formatDistance(date, Date.now(), {
        addSuffix: true,
      });
      return <>{formattedDate}</>;
    },
  },
];
