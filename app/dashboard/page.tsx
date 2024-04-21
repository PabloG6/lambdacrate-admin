import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GitHubLogoIcon, PlusIcon } from "@radix-ui/react-icons";
import { unstable_noStore } from "next/cache";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AppWindowMac,
  ExternalLink,
  GithubIcon,
  LayoutGrid,
  MoreVerticalIcon,
  TimerResetIcon,
  Zap,
} from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { AppItem, AppObject } from "@/components/app-item";
import App from "next/app";
import { env } from "../env";

export default async function Component() {
  unstable_noStore();
  const response = await fetch(`${env.API_URL}/api/apps`, {
    cache: "no-cache",
  });
  const appList = await response.json();

  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))]  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="max-w-6xl w-full mx-auto">
          <div className="flex w-full justify-end py-6">
            {appList.length > 0 ? (
              <Button size={"icon"} asChild>
                <Link href="/dashboard/create-project/getting-started">
                  <PlusIcon />
                </Link>
              </Button>
            ) : (
              <></>
            )}
          </div>
          <div className="grid grid-cols-3 gap-7 w-full"></div>
          <>
            {appList.length > 0 ? (
              <div className="grid grid-cols-3 gap-5">
                {appList.map((item: AppObject) => (
                  <AppItem props={item} key={item.id} />
                ))}
              </div>
            ) : (
              <div className="w-full flex h-full items-center justify-center">
                <div className="flex flex-col items-center w-[330px] gap-6">
                  <LayoutGrid />
                  <div className="text-center mb-6 space-y-4">
                    <h2 className="font-medium text-lg">Your Apps</h2>
                    <p className="text-muted-foreground text-sm">
                      You don&apos;t have any apps. Click the button below to
                      start creating your first app.
                    </p>

                    <Button asChild>
                      <Link href="/dashboard/create-project/getting-started">
                        Create an app
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
          <div className=" grid grid-cols-3 gap-5 "></div>
        </div>
      </main>
    </div>
  );
}
