"use client";
import { Loader } from "lucide-react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
  useForm,
} from "react-hook-form";
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
import { createNewApp } from "@/app/new/actions";
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
type NewProjectProps = {
  nextStep: (opts?: string[]) => void;
};
export default function NewProject({ nextStep }: NewProjectProps) {
  const [name, setName] = useState("");
  const form = useForm<AppInfo>({
    resolver: zodResolver(AppSchema),
    defaultValues: {
      name: "",
      git_repository: "https://github.com/PabloG6/lambdacrate.git",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmitHandler = (data: AppInfo, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    startTransition(async () => {
      const response = await createProject(data);
      if(response.success) {
        redirect(`/dashboard/${response.app_id}/environment`)
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
          <ScrollArea className="mt-4 mb-2 py-4">
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

            <FormField
              name="git_repository"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository Url</FormLabel>

                  <FormControl className="flex">
                    <Input placeholder="My New App" {...field} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
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
