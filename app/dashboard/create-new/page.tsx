"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "@/components/ui/textarea";
import { createUniqueNameId } from "mnemonic-id";

import { BaseSyntheticEvent, useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { AppInfo, AppSchema } from "@/lib/util/types";

import { createNewApp } from "@/app/new/actions";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function Page() {
  const [name, setName] = useState("");
  const {pending} = useFormStatus();
  const form = useForm<AppInfo>({
    resolver: zodResolver(AppSchema),
    defaultValues: {
      git_repository: "https://github.com/PabloG6/lambdacrate.git",
      name: "",
      description: "",

      app_id: name,
    },
  });

  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const appId = createUniqueNameId({ adjectives: 2 });
    console.log("use effect called");
    form.setValue("app_id", appId.toLowerCase());
    setName(appId.toLowerCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);
  const onFormSubmit = async (data: AppInfo, e?: BaseSyntheticEvent) => {
    console.log("form submit");
    console.log(data);

    const response: {
      app: { app_id: string; id: string; name: string };
      deployment_id: string;
    } = await createNewApp(data);

    const searchParams = new URLSearchParams();
    searchParams.set("deployment_id", response.deployment_id);
    router.replace(
      `/dashboard/${response.app.app_id}?${searchParams.toString()}`
    );
  };
  return (

        
        <Form {...form}>
          <form>
            <div className=" border-subtle flex w-full rounded-md border p-7  max-w-2xl flex-col bg-card">
              <div className="flex">
                <div>
                  <div className="text-foreground text-base font-semibold">
                    Create a new project
                  </div>

                  <div className="text-default text-sm text-muted-foreground">
                    Some info about your app.{" "}
                  </div>
                </div>
              </div>

              <Separator className="my-7 mx-auto" />
              <div className="space-y-8">
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
                          placeholder="This app is really easy..."
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
              </div>

              <div className="flex justify-end pt-6">
                <Button size={"sm"} className="rounded-sm">
                  <Loader className="animate-spin mr-2 h-4 w-4 duration-1000" />{" "}
                  <span>Create new project</span>
                </Button>
              </div>
            </div>
          </form>
        </Form>
  
  );
}
