"use client";

import {
  useParams,
  usePathname,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./breadcrumb";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { GitBranch } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import { trpc } from "@/server/trpc";
import { BranchPicker } from "../BranchPicker";

export default function BreadcrumbBar() {
  const branches = ["development", "staging", "production"];
  
  const pathname = usePathname();
  const regex = /(\/)/g; // Regular expression to capture slashes
  const { app_id: app_id, branch: branch } = useParams();
  const listedPaths = pathname
    .substring(1, pathname.length)
    .split(regex)
    .filter(Boolean);
    
  return (
    <nav className="flex w-full">
      <Breadcrumb>
        <BreadcrumbList className="gap-0">
          {listedPaths.map((path, index) => {
            if (path.includes("/")) {
              return <BreadcrumbSeparator key={index} />;
            } else {
              const url = listedPaths.slice(0, index + 1).join("");
              //if the branch param isn't null and it's equal to the path its a git branch.
              if (branch != null && branch == path) {
                return (
                  <BreadcrumbItem key={index} className="">
                    <BreadcrumbLink className={cn("gap-0")} asChild>
                     <BranchPicker app_id={app_id as string} branch={branch as string} name={path.replace("_", " ")} link={listedPaths.slice(0, index).join("")}/>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                );
              }
              return (
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink
                    className={cn(
                      app_id == path ? "" : "capitalize",
                      "max-w-[160px] overflow-ellipsis whitespace-nowrap overflow-hidden font-normal"
                    )}
                    asChild
                  >
                    <Link href={"/" + url}>{path.replace("_", " ")}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            }
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
