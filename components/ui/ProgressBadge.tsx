"use server";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { setTimeout } from "timers/promises";

export default async function ProgressBadge() {
   
    

  return (
    <Badge variant={"outline"} className="text-xs font-medium space-x-2 px-4">
      <Loader2 className="h-4 w-4 animate-spin opacity-70" />{" "}
      <span>Setting up your project</span>
    </Badge>
  );
}
