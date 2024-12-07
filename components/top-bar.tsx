"use client";

import { Plus, SettingsIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import NewGateway from "./ui/new-gateway";
import { useState } from "react";

export function TopBar() {
  const [isOpen, onOpenChange] = useState<boolean>();

  return (
    <div className="flex flex-row w-full h-14 border-b justify-center">
      <div className="max-w-6xl px-12 flex items-center w-full">
        <Input
          className="h-8 max-w-80 hover:outline-none focus-visible:outline-none focus-visible:ring-transparent "
          placeholder="Search Gateways"
        ></Input>
        <div className="flex-grow"></div>
        <div className="flex items-center gap-3 justify-center">
          <Button variant={"ghost"} size="icon">
            <SettingsIcon />
          </Button>
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
    </div>
  );
}
