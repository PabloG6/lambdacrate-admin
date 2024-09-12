"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import { trpc } from "@/server/trpc";
import { cn } from "@/lib/utils";
import {
  Check,
  CheckCheck,
  ChevronDown,
  Cpu,
  InfoIcon,
  MemoryStick,
} from "lucide-react";
import { Popover, PopoverTrigger } from "./ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { FormLabel } from "./ui/form";
type Props = {
  className?: string;
  onValueChange: (...value: any[]) => void;
};
type CpuOption = {
  ram: number;
  cpu_count: number;
  cpu_type: string;
  price_per_second: string;
  ext_name: string;
};

const SECONDS_A_MONTH = 2_628_288;
export default function ComputePicker({ className, onValueChange }: Props) {
  const { data: cpuOptions, isLoading, error } = trpc.cpu.getOptions.useQuery();

  const [label, setLabel] = useState("No Machines Selected");
  const [machineID, setMachineID] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <FormLabel className="block mb-1">Choose a machine size</FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className={cn(className, "pr-2")}>
            <span className="font-mono">{label}</span>
            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Command className="min-w-[450px] border rounded-md">
            <CommandList className="w-full">
              <CommandInput
                placeholder="Search your machine sizes..."
                autoFocus={true}
              />

              <CommandEmpty className="font-mono flex justify-center py-3"></CommandEmpty>
              <CommandGroup className="w-full">
                {cpuOptions?.map((option) => (
                  <CommandItem
                    className="py-2 w-full"
                    key={option.id}
                    onSelect={() => {
                      onValueChange(option.ext_name);
                      setLabel(
                        `${option.cpu_count} CPU, ${
                          option.ram
                        } RAM — $${Math.ceil(
                          option.price_per_second * SECONDS_A_MONTH
                        )}/mo`
                      );

                      setMachineID(option.id);
                      setOpen(false);
                    }}

                  >
                    <div className="grid grid-cols-4 gap-4 p-2 text-sm w-full font-medium text-muted-foreground">
                      <div className="font-mono flex items-center gap-3">
                        {machineID == option.id ? (
                          <Check className="w-3 h-3 " />
                        ) : (
                          <Cpu className="h-3 w-3" />
                        )}

                        <span className="ml-1">{option.cpu_count}</span>
                        {option.cpu_count > 1 ? "cores" : "core"}
                      </div>
                      <div className="font-mono flex gap-1 items-center">
                        <MemoryStick className="h-3 w-3" /> {option.ram} ram
                      </div>
                      <div className="font-mono capitalize">
                        {option.cpu_type}
                      </div>
                      <div className="font-mono text-xs flex items-center justify-center">
                        ${Math.ceil(option.price_per_second * SECONDS_A_MONTH)}/
                        <sub className="normal-case">month</sub>
                        <InfoIcon className="h-3 w-3 ml-1" />
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
