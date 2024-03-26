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
import { createNewApp } from "./actions";
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
import { AppearanceForm } from "./components/appearance-form";
import { AppInfo, AppSchema } from "@/lib/util/types";
import { FeatureFlagForm } from "./components/feature-flag-form";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
      <nav className="h-12 flex items-center py-6 border-b">
      <div className="py-4 pl-8 flex items-start border-r lg:max-w-64 w-full">
            <div className="text-base">Project Settings</div>
           
          </div>
          <Breadcrumb className="pl-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
     
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/dashboard/${name}`}>{name}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
      </nav>
      <div className="flex w-full h-full">
        <div className="w-full lg:max-w-64 flex flex-col border-r">
         
          <nav className="flex flex-col text-sm text-muted-foreground gap-4 pt-6 pl-8 w-full ">
            <Link href="#">General</Link>
            <Link href="#">Calls To Action</Link>
            <Link href="#">Appearance</Link>
            <Link href="#">Feature Flags</Link>
            <Link href="#">Subscription Tiers</Link>
            <Link href="#">Developer Settings</Link>
          </nav>
        </div>

        <Form {...form}>
          <form className="w-full space-y-4 h-full">
            <ScrollArea className="h-screen w-full" type="scroll">
              <div className="w-full md:p-10 lg:p-12 mx-8  space-y-4">
                <div className=" border-subtle flex w-full rounded-md border p-7 max-w-3xl flex-col bg-card-foreground">
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

                <div className="bg-default border-subtle flex w-full rounded-md border p-7 max-w-3xl flex-col bg-card-foreground">
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

                <div className="bg-default border-subtle flex w-full rounded-md border p-7 max-w-3xl flex-col bg-card-foreground">
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
                <div className="bg-default border-subtle flex w-full rounded-md border p-7 max-w-3xl flex-col bg-card-foreground">
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

                <div className="bg-default border-subtle flex w-full rounded-md border p-7 max-w-3xl flex-col bg-card-foreground">
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
            </ScrollArea>
          </form>
        </Form>

        <div className="md:max-w-80 w-full"></div>
      </div>
    </div>
  );
}
