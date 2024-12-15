"use client";

import { Plus, SettingsIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import NewGateway from "./ui/new-gateway";
import { useState } from "react";
import { cn } from "@/lib/utils";
type Props = {
  title?: string;
  sheetContent: (onOpenChange: () => void) => React.ReactNode;
  sheetWidth?: string;
};
export function TopBar({
  sheetContent,
  title,
  sheetWidth = "w-[800px] sm:max-w-[850px]",
}: Props) {
  const [isOpen, onOpenChange] = useState<boolean>();

  return (
    <div className="flex flex-row w-full h-14 border-b justify-center">
      <div className="pl-8 pr-12 flex items-center w-full">
        <div className="flex-grow">
          {title && <h1 className="text-lg font-semibold">{title}</h1>}
        </div>
        <div className="flex items-center gap-3 justify-center">
          <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
              <Button
                className="rounded-full text-sm h-6 w-6 text-xs items-center justify-center"
                size={"icon"}
              >
                <Plus className="h-4 w-4 text-xs" size={8} />
              </Button>
            </SheetTrigger>
            <SheetContent className={cn(sheetWidth)}>
              {sheetContent(onOpenChange)}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
