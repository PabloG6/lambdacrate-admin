"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { DotsVerticalIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { createUniqueNameId } from "mnemonic-id";
import * as z from "zod";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { Righteous } from "next/font/google";
import { errors } from "undici-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { GithubIcon, Package2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppInfo, AppSchema } from "@/lib/util/types";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppearanceForm } from "@/app/new/components/appearance-form";
import { FeatureFlagForm } from "@/app/new/components/feature-flag-form";
import { createNewApp } from "@/app/new/actions";

export default function Page() {
  const [name, setName] = useState("");
  const form = useForm<AppInfo>({
    resolver: zodResolver(AppSchema),
    defaultValues: {
      git_repository: "https://github.com/PabloG6/lambdacrate.git",
      name: "",
      primary_color: "",
      description: "",
      features: [],
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
    <div className="w-full h-full">
      <div className="flex w-full h-full">
      

        <Form {...form}>
          <form className="w-full space-y-4 h-full">
              <div className="space-y-4">
                <div className=" border-subtle flex w-full rounded-md border p-7 max-w-3xl flex-col bg-card">
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

                <div className="bg-default border-subtle flex w-full rounded-md border p-7 max-w-3xl flex-col bg-card">
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

                <div className="bg-default border-subtle flex w-full rounded-md border p-7 max-w-3xl flex-col bg-card">
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
                  <AppearanceForm control={form.control} />
                </div>
                <div className="bg-default border-subtle flex w-full rounded-md border p-7 max-w-3xl flex-col bg-card">
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
                  <FeatureFlagForm control={form.control} parent={form} />
                </div>

                <div className="bg-default border-subtle flex w-full rounded-md border p-7 max-w-3xl flex-col bg-card">
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
