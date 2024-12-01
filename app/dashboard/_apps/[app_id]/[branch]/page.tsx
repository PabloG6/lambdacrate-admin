"use client";
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  LinkIcon,
  Loader2,
  MoreVerticalIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { trpc } from "@/trpc/client";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

import { formatDistance } from "date-fns";
import router, { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import LogViewer from "@/components/LogViewer";
import DashboardStatus from "@/components/DashboardStatus";
import { useEffect, useState } from "react";
import WebSocketContextProvider, {
  useDeploymentChannel,
} from "@/contexts/WebsocketContextProvider";
import { z } from "zod";
import { BuildEventSchema } from "@/types/events";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { branchSearchParams } from "@/trpc/api/branches/types";
import { GetBranchType } from "@/types/apps";
import { Row } from "react-day-picker";
import { Overview } from "../overview";
/**
 * design ui that shows status of active deployment
 * - display status of dashboard deployment ()
 *
 *
 */

type ParamsProps<T> = {
  params: T;
};
type Props = {
  app_id: string;
  branch: string;
};
export default function Page({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Props;
}) {
  console.log("params: ", params);
  return (
    <WebSocketContextProvider>
      <Overview app_id={params.app_id} ></Overview>
    </WebSocketContextProvider>
  );
}
 