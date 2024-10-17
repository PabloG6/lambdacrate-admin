"use client";
import {
  CheckIcon,
  ChevronDown,
  Globe,
  Loader,
  Scroll,
  SquareChevronRight,
} from "lucide-react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
  useForm,
} from "react-hook-form";
import { Endpoints } from "@octokit/types";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
  FormDescription,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { redirect, usePathname, useRouter } from "next/navigation";
import { AppInfo, AppSchema } from "@/lib/util/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUniqueNameId } from "mnemonic-id";
import {
  useState,
  useEffect,
  BaseSyntheticEvent,
  JSXElementConstructor,
  ReactElement,
  useTransition,
} from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import next from "next";
import { Accordion } from "../ui/accordion";
import { Collapsible } from "../ui/collapsible";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { createProject } from "@/app/dashboard/[app_id]/_actions/projects";
import ProgressButton from "../ui/progress-button";
import { start } from "repl";
import { env } from "@/app/env";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectItem } from "@radix-ui/react-select";
type NewProjectProps = {
  nextStep: (opts?: string[]) => void;
};
export default function NewProject({ nextStep }: NewProjectProps) {
  const [openRepository, setOpenRepository] = useState<boolean>();
  const [repositories, setRepositories] = useState<any[]>();
  const [selectedRepository, setRepository] = useState<any>();
  const form = useForm<AppInfo>({
    resolver: zodResolver(AppSchema),
    defaultValues: {
      name: "",
      git_repository: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    (async () => {
      const response = await fetch(`/github/repos`, {
        next: { revalidate: 3 * 60 },
      });
      if (response.ok) {
        setRepositories(await response.json());
      }
    })();
  }, []);
  const onSubmitHandler = (data: AppInfo, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    startTransition(async () => {
      const response = await createProject(data);
      if (response.success) {
        redirect(`/dashboard/${response.app_id}/environment`);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)}>
        <div className="flex w-full flex-col">
          <div className="flex">
            <div>
              <div className="text-foreground text-base font-semibold">
                Create a new project
              </div>

              <div className="text-default text-sm text-muted-foreground">
                Some info about your project.
              </div>
            </div>
          </div>
          <ScrollArea className="mt-4 mb-2 py-4 space-y-2">
            <div className="flex flex-col gap-3">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <div className="flex gap-4 items-center">
                    <FormItem className="w-full">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My New Project" {...field} />
                      </FormControl>
                    </FormItem>
                  </div>
                )}
              ></FormField>
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>

                    <FormControl className="flex">
                      <Textarea
                        placeholder="This is my new project..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <div className="flex  space-between">
                <FormField
                  name="git_repository"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full gap-1">
                      <FormLabel>Destination Type</FormLabel>

                      <FormControl className="flex">
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Destination Types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='cli'>
                            <div className="items-start flex px-3 py-2">
                              <div className="flex w-full gap-1 flex-col">
                                <div className="w-full flex gap-2 flex-col">
                                    <div className="flex gap-2">
                                    <SquareChevronRight className="w-5 h-5"></SquareChevronRight>
                                    <span className="text-uppercase">CLI</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                      Forward events to a local webhook
                                    </span>
                      
                                </div>
                              </div>
                            </div>
                            </SelectItem>
                            <SelectSeparator/>
                          <SelectItem value='http' className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                          <div className="items-start flex px-3 py-2">
                            <div className="flex w-full gap-1 flex-col">
                                <div className="w-full flex gap-2 flex-col">
                                    <div className="flex gap-2">
                                    <Globe className="w-5 h-5"></Globe>
                                    <span className="uppercase">Http</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                      Send events to an http endpoint
                                    </span>
                      
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="git_repository"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full gap-1">
                      <FormLabel>Endpoint Url</FormLabel>

                      <FormControl className="flex">
                        <Input {...field} placeholder="https://example.com/webhook"></Input>
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <FormField
                name="git_repository"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Import a Repository</FormLabel>

                    <FormControl className="flex">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openRepository}
                            className="w-[250px] justify-between"
                          >
                            <span className="max-w-[220px] overflow-ellipsis overflow-hidden">
                              {selectedRepository
                                ? repositories?.find(
                                    (repository) =>
                                      repository.clone_url?.toLowerCase() ===
                                      selectedRepository
                                  )?.full_name
                                : "Select a repository"}
                            </span>
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0" align="start">
                          <Command>
                            <CommandInput
                              placeholder="Search repositories..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No repository found.</CommandEmpty>
                              <CommandGroup>
                                {repositories?.map((repository) => (
                                  <CommandItem
                                    key={repository.node_id}
                                    value={repository.clone_url}
                                    onSelect={(currentValue) => {
                                      setOpenRepository(false);

                                      setRepository(currentValue);
                                      console.log("here we go");
                                    }}
                                  >
                                    {repository.full_name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        repository.clone_url === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
            </div>
          </ScrollArea>

          <div className="flex justify-end pt-6">
            <Button
              size="sm"
              className="rounded-sm"
              disabled={isPending}
              type="submit"
            >
              {isPending && (
                <Loader className="animate-spin mr-2 h-4 w-4 duration-1000" />
              )}
              <span>Create Project</span>
            </Button>{" "}
          </div>
        </div>
      </form>
    </Form>
  );
}
