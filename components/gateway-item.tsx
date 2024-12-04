"use client";
import { ExternalLink, MoreVerticalIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, useState } from "react";
import { createGatewayResponse } from "@/trpc/api/gateway/types";
import { z } from "zod";
type Props = {
  data: z.infer<typeof createGatewayResponse>;
};
export function GatewayItem({ data }: Props) {
  const [inputText, setInputText] = useState<string>("");
  const [isOpen, setOpen] = useState<boolean>();
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }
  return (
    <div className="flex  flex-col p-3  border rounded-md bg-card">
      <div className="flex gap-2 w-full">
        <div className="flex w-full space-x-2">
          <Avatar>
            <AvatarFallback />
          </Avatar>

          <div className="flex flex-col gap-1">
            <div className="flex gap-4">
              <span className="text-base font-medium text-foreground">
                {data.name}
              </span>{" "}
            </div>
            <div className="text-xs flex text-muted-foreground items-center space-x-1">
              <span>{data.gateway_id}</span>
              <ExternalLink className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div>
          <Dialog
            open={isOpen}
            onOpenChange={(open: boolean) => {
              setInputText("");
            }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full">
                <MoreVerticalIcon className="h-5 w-5 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>App Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DialogTrigger className="w-full">
                    <DropdownMenuItem onClick={() => {}}>
                      Destroy
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuItem>Disable</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Modify Billing</DropdownMenuItem>
                  <DropdownMenuItem>Manage Domains</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Docs</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="max-w-lg">
              <DialogTitle>Are you absolutely sure? </DialogTitle>

              <DialogDescription>
                This action cannot be undone. You will lose all customer data,
                environment variables, and metrics. Are you sure you want to
                permanently delete this project?
              </DialogDescription>
              <Label className="text-sm">
                Enter{" "}
                <span className="font-medium text-muted-foreground">
                  {data.gateway_id}
                </span>{" "}
                to confirm that you want to delete this project.
              </Label>
              <div>
                <Input onChange={handleChange} />
              </div>
              <DialogFooter>
                <Button
                  variant={"destructive"}
                  className="w-full"
                  disabled={!(inputText == data.gateway_id)}
                  onClick={async () => {
                    console.log("destroying");
                    setOpen(false);
                  }}
                >
                  <span>Destroy</span>{" "}
                  <code className="pl-3">{`\`${data.name}\``}</code>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="py-4 space-x-2 flex items-center"></div>
      <div className="py-4 space-y-3"></div>
      <div className="flex w-full mt-auto">
        <Button
          variant={"outline"}
          size={"lg"}
          asChild
          className="w-full bg-inherit"
        >
          <Link href={`/dashboard/gateways/${data.gateway_id}`}>
            More Details
          </Link>
        </Button>
      </div>
    </div>
  );
}
