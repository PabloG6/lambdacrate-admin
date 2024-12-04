"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import NewGateway from "./ui/new-gateway";
import { useState } from "react";

export function TopBar() {
  const [isOpen, onOpenChange] = useState<boolean>();

  return (
    <div className="flex flex-row px-8 w-full h-14 border-b items-center">
      <Input
        className="h-8 max-w-80 hover:outline-none focus-visible:outline-none focus-visible:ring-transparent "
        placeholder="Search Gateways"
      ></Input>
      <div className="flex-grow"></div>
      <div className=" flex items-center justify-center">
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
          <SheetTrigger asChild>
            <Button
              className="rounded-full text-sm h-6 w-6 text-xs items-center justify-center"
              size={"icon"}
            >
              <Plus className="h-4 w-4 text-xs" size={8} />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[800px] sm:max-w-[850px]">
            <NewGateway onOpenChange={onOpenChange}></NewGateway>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
