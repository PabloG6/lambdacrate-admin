"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { AppInfo, AppSchema } from "@/lib/util/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon } from "@radix-ui/react-icons";

import {
  CheckIcon,
  Globe,
  Loader,
  MinusCircleIcon,
  SquareChevronRight,
} from "lucide-react";

import { redirect } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { createProject } from "../[app_id]/_actions/projects";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import FormContainer from "@/components/FormContainer";
import EnvVarsForm from "@/components/EnvVarForm";
const steps = [
  "getting-started",
  "configure_cta",
  "configure_appearance",
  "configure_subs",
  "configure_feature_flags",
  "configure_domains",

  "configure_env_vars",
  "choose-plan",
] as const;

const INITIAL_STEP = steps[0];
type stepTransform = (typeof steps)[number];

function stepTransform(step: (typeof steps)[number]): stepTransform {
  const stepIndex = steps.indexOf(step);
  if (stepIndex > -1) {
    return steps[stepIndex];
  }
  return INITIAL_STEP;
}

export default function Page({
  params,
}: {
  params: { page: (typeof steps)[number][] };
}) {
  const [openRepository, setOpenRepository] = useState<boolean>();
  const [repositories, setRepositories] = useState<any[]>();
  const [selectedRepository, setRepository] = useState<any>();
  const form = useForm<AppInfo>({
    resolver: zodResolver(AppSchema),
    defaultValues: {
      name: "",
      git_repository: "",
      dockerfile_path: "",
      destination_type: "cli",
      path: "",
    },
  });

  const {  watch } = form;

  const { fields, append, remove } = useFieldArray({
    name: "secrets",
    control: form.control,
  });

  const DestinationTypeDisplay = {
    cli: (
      <div className="flex gap-2 items-center">
        <SquareChevronRight className="w-5 h-5"></SquareChevronRight>
        <span className="text-uppercase">CLI</span>
      </div>
    ),
    http: (
      <div className="flex gap-2 items-center">
        <Globe className="w-5 h-5"></Globe>
        <span className="text-uppercase">HTTP</span>
      </div>
    ),
  };

  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    (async () => {
      const response = await fetch(`/github/repos`, {
        next: {},
      });
      if (response.ok) {
        setRepositories(await response.json());
      }
    })();
  }, []);
  const onSubmitHandler = (data: AppInfo, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    startTransition(async () => {
      console.log('createing project');
      const response = await createProject(data);
      console.log(response);
      if (response.success) {

        redirect(`/dashboard/${response.app_id}/environment`);
      } else {
      }
    });
  };

  return (
    <div className="w-full space-y-4 h-full flex items-start justify-center pt-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="w-full max-w-3xl m-auto px-4"
        >
          <div className="flex w-full flex-col pb-16">
            <div className="flex flex-col gap-6">
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
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <div className="flex gap-4 items-center">
                    <FormItem className="w-full m-0">
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
                  <FormItem className="m-0">
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
            </div>
            <div className="flex flex-col py-16 gap-6">
              <div className="flex">
                <div>
                  <div className="text-foreground text-base font-semibold">
                    Repository details
                  </div>

                  <div className="text-default text-sm text-muted-foreground">
                    Information about your repository such as the git url,
                    Dockerfile path, and target branch
                  </div>
                </div>
              </div>
              <FormField
                name="git_repository"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 m-0">
                    <FormLabel>Import a Repository</FormLabel>

                    <FormControl className="flex">
                      <Popover
                        onOpenChange={setOpenRepository}
                        open={openRepository}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openRepository}
                            className="w-full max-w-[300px] justify-between"
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
                              <CommandGroup className="overflow-hidden">
                                {repositories?.map((repository) => (
                                  <CommandItem
                                    key={repository.node_id}
                                    value={repository.clone_url}
                                    onSelect={(currentValue) => {
                                      setOpenRepository(false);

                                      setRepository(currentValue);
                                      field.onChange(currentValue);
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

              <FormField
                name="dockerfile_path"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 m-0">
                    <FormLabel>Docker File Path</FormLabel>
                    <Input
                      placeholder=".Dockerfile"
                      className="max-w-[300px]"
                      {...field}
                    ></Input>
                    <span className="text-muted-foreground text-xs font-medium">
                      Defaults to .Dockerfile
                    </span>
                  </FormItem>
                )}
              ></FormField>
              <div className="flex space-between gap-6">
                <FormField
                  name="destination_type"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full gap-1 m-0">
                      <FormLabel>Destination Type</FormLabel>

                      <FormControl className="flex">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={"cli"}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Destination Types">
                              {DestinationTypeDisplay[field.value ?? "cli"]}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cli">
                              <div className="items-start flex px-3 py-2">
                                <div className="flex w-full gap-1 flex-col">
                                  <div className="w-full flex gap-2 flex-col">
                                    <div className="flex gap-2">
                                      <SquareChevronRight className="w-5 h-5"></SquareChevronRight>
                                      <span className="text-uppercase">
                                        CLI
                                      </span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                      Forward events to a local webhook
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectSeparator />
                            <SelectItem
                              value="http"
                              className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            >
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
                <>
                  {form.watch("destination_type") == "cli" && (
                    <FormField
                      name="path"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex flex-col w-full gap-1 m-0">
                          <FormLabel>Path</FormLabel>

                          <FormControl className="flex">
                            <Input {...field} placeholder="/webhook"></Input>
                          </FormControl>
                        </FormItem>
                      )}
                    ></FormField>
                  )}

                  {form.watch("destination_type") == "http" && (
                    <FormField
                      name="http_url"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex flex-col w-full gap-1 m-0">
                          <FormLabel>HTTP URL</FormLabel>

                          <FormControl className="flex">
                            <Input
                              {...field}
                              placeholder="https://example.com/webhook"
                            ></Input>
                          </FormControl>
                        </FormItem>
                      )}
                    ></FormField>
                  )}
                </>
              </div>
            </div>

            <FormContainer
              title="Environment Variables"
              className=" border p-4 rounded-md"
              description="Enter your environment variables here. These are encrypted in the database at rest."
            >
              <div className="grid gap-4">
                <div className="grid grid-cols-12 items-center gap-2">
                  <EnvVarsForm
                    onSubmit={(values, ref) => {
                      append(values);
                    }}
                  />
                  <div className="col-span-12 px-2">
                    {fields.length > 0 ? (
                      <table className="table-fixed w-full">
                        <thead className="bg-card  w-full">
                          <tr className="">
                            <th
                              colSpan={5}
                              className="rounded-l-sm rounded-bl-sm h-8 text-left px-4"
                            >
                              {" "}
                              Key
                            </th>
                            <th colSpan={5} className="text-left px-4">
                              Value
                            </th>
                            <th
                              colSpan={1}
                              className="rounded-r-sm rounded-br-sm"
                            ></th>
                          </tr>
                        </thead>
                        <tbody className="w-full">
                          {fields.map((field, index) => (
                            <tr key={index}>
                              <td colSpan={5} className="pr-2 py-3">
                                <FormField
                                  name={`secrets.${index}.key`}
                                  render={({ field }) => (
                                    <>
                                      <FormItem className="space-y-2 w-full m-0 ">
                                        <Input
                                          autoFocus={false}
                                          placeholder="KEY"
                                          className="h-9 text-sm"
                                          {...field}
                                        />
                                      </FormItem>
                                    </>
                                  )}
                                ></FormField>
                              </td>
                              <td colSpan={5} className="py-2">
                                <FormField
                                  name={`secrets.${index}.value`}
                                  render={({ field }) => (
                                    <>
                                      <FormItem className="space-y-2  m-0 w-full">
                                        <Input
                                          className=" text-sm h-9"
                                          {...field}
                                        />
                                      </FormItem>
                                    </>
                                  )}
                                ></FormField>
                              </td>
                              <td colSpan={1}>
                                <div className="flex items-center justify-center">
                                  <Button
                                    size={"icon"}
                                    variant={"ghost"}
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    <MinusCircleIcon className="size-5"></MinusCircleIcon>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </FormContainer>

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
    </div>
  );
}
