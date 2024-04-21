"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";

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

export default function Page() {
  const [name, setName] = useState("");
  const form = useForm<AppInfo>({
    resolver: zodResolver(AppSchema),
    defaultValues: {
      git_repository: "https://github.com/PabloG6/lambdacrate.git",
      name: "",

      description: "",

    },
  });

  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const appId = createUniqueNameId({ adjectives: 2 });
    console.log("use effect called");
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
    <div className="w-full h-full">
      <div className="flex w-full h-full">
      





        <Form {...form}>
          <form className="w-full space-y-4 h-full">
              <div className="space-y-4 max-w-4xl">
                <div className=" border-subtle flex w-full rounded-md border p-7 flex-col bg-card">
                  <div className="flex">
                   
                    <div>
                      <div className="text-foreground text-base font-semibold">
                        General
                      </div>

                      <div className="text-default text-sm text-muted-foreground">
                       General information about your app. {" "}
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
                              <Input placeholder="My New App" {...field} />
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
                </div>
                <section id="cta">
                <div className="bg-default border-subtle flex w-full rounded-md border p-7 flex-col bg-card">
                  <div className="flex">
                   
                    <div>
                      <div className="text-base font-semibold">
                        Calls To Action
                      </div>

                      <div className="text-default text-sm text-muted-foreground">
                        Style your landing page with custom copy that explains
                        what your app does.
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
                            <FormLabel>Main Headline</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Create commercial apis from docker containers in minutes"
                                {...field}
                              />
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
                          <FormLabel>Secondary Headline</FormLabel>

                          <FormControl className="flex">
                            <Textarea
                              placeholder="Lambdacrate deploys your docker container behind an api gateway alongside a fully functional, feature rich dashboard."
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    ></FormField>
                  </div>
                </div>
                </section>
             

               <section id="appearance">
               <div className="bg-default border-subtle flex w-full rounded-md border p-7  flex-col bg-card">
                  <div className="flex">
                  
                    <div>
                      <div className="text-base font-semibold">
                        Appearance
                      </div>

                      <div className="text-default text-sm text-muted-foreground">
                        Here you can customize attributes of your app to give it
                        a more personal feel.
                      </div>
                    </div>
                  </div>

                  <Separator className="my-7 mx-auto" />
                </div>
               </section>
                <div className="bg-default border-subtle flex w-full rounded-md border p-7  flex-col bg-card">
                  <div className="flex">
                   
                    <div>
                      <div className="text-base font-semibold">
                        Feature Flags
                      </div>

                      <div className="text-default text-sm text-muted-foreground">
                        This section allows you to place the most prominent
                        features of your API on your landing page.
                      </div>
                    </div>
                  </div>

                  <Separator className="my-7 mx-auto" />
                </div>

                <div className="bg-default border-subtle flex w-full rounded-md border p-7 flex-col bg-card">
                  <div className="flex">
                    
                    <div>
                      <div className=" text-base font-semibold">
                        Subscription Tiers
                      </div>

                      <div className="text-default text-sm text-muted-foreground">
                        Group multiple feature flags under one pricing tier,
                        allowing you to meet your customer&apos;s pricing needs.
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
                              <Input placeholder="My New App" {...field} />
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
                  </div>
                </div>
              </div>
          </form>
        </Form>

      </div>
    </div>
  );
}
