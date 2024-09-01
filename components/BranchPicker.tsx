"use client";
import { trpc } from "@/server/trpc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { GitBranch } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
type Props = {
  app_id: string;
  branch: string;
  name: string;
  link: string;
};
export function BranchPicker({ app_id, name, link, branch }: Props) {
  const { data: appDetails } = trpc.apps.showDetails.useQuery({ id: app_id });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          className="gap-2  -ml-3  max-w-[200px]"
          variant={"ghost"}
        >
          <GitBranch className="h-3 w-3" />

          <Link href={"/" + link}>
            <span className="block max-w-[120px] whitespace-nowrap overflow-ellipsis overflow-hidden font-normal">
              {branch}
            </span>
          </Link>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 " align="start" alignOffset={32}>
        <ScrollArea className="h-40">
        {appDetails?.branches?.map((item, index) => (
          <DropdownMenuItem key={index} className="px-4">
            <Link href={["/", link, item.slug].join("")}>
              <span className="block w-48 whitespace-nowrap overflow-ellipsis overflow-hidden font-normal">
                {item.slug}
              </span>
            </Link>
          </DropdownMenuItem>
        ))}
        </ScrollArea>

        <DropdownMenuItem className="px-4">
          <Link href={`/dashboard/${app_id}/new_branch`}>
            + Create new branch
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
