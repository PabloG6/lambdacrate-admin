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
const appSchema = z.object({
  name: z.string().min(1, {message: "This field is required"}),
  git_repository: z.string().min(1, {message: "This field is required"}),
  app_id: z.string().min(5, {message: "This field is required"}),
});

export type AppInfo = z.infer<typeof appSchema>;
export default function Page() {
  const [name, setName] = useState("");
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<AppInfo>({
    resolver: zodResolver(appSchema),
    defaultValues: {
      git_repository: "https://github.com/PabloG6/lambdacrate.git",
      name: "Lambdacrate",
      app_id: name,
    },
  });

  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const appId = createUniqueNameId({ adjectives: 2 })
    console.log('use effect called');
    setValue("app_id", appId)
    setName(appId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);
  const onFormSubmit = async (data: AppInfo, e?: BaseSyntheticEvent) => {
    console.log("form submit");
    console.log(data);
    
    const response: {app_id: string; id: string; name: string} = await createNewApp(data);
    console.log('response', response);
    router.replace(`/apps/${response.app_id}/edit`)
  };
  return (
    <>
      <div className="w-full max-w-[550px] mx-auto p-6 space-y-6">
        <Card className=" w-full">
          <CardHeader>
            <CardTitle>Create your app</CardTitle>
            <CardDescription>
              Give us some details of your app to get started
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onFormSubmit)}>
          <CardContent>
    
              <div className="grid w-full items-center gap-6">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name of your project"
                    {...register("name")}
                  />
                  {errors?.name?.message ? (
                    <span className="text-red-500 text-xs">{errors.name.message}</span>
                  ) : (
                    <p className="text-xs">
                      {" "}
                      <span>Your app id: </span>
                      <code>{name}</code>
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Git Repository</Label>
                  <Input
                    placeholder="e.g. https://github.com/Lambdacrate/helpme.git"
                    {...register("git_repository")}
                  ></Input>
                  {errors?.git_repository?.message && (
                    <span className="text-red-500 text-xs">
                      {errors.git_repository.message}
                    </span>
                  )}
                </div>
              </div>

              

          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="rounded-full px-6" type="submit">Create App</Button>
          </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
export function H() {
  /*
         <div className="flex justify-between space-y-1.5">
                  <div >
                 
                    <Label htmlFor="framework">Target Production</Label>
                    <p className="text-xs max-w-64">
                    Build an app for a production environment, otherwise create a test environment.
                    </p>

                  </div>
                  <Switch></Switch>
                  
                </div>
  /*
   <section className="pt-6">
              <div className="space-y-2">
                <div className="pb-3 ">
                  <span className="text-3xl font-semibold text-gray-700">
                    Customizations
                  </span>
                </div>
              </div>

              <section id="call-to-action" className="space-y-8">
                <div className="pb-8 flex flex-col space-y-2">
                  <span className="text-xl font-medium text-slate-500">
                    Website Details
                  </span>
                  <span className="text-sm font-medium text-slate-400">
                    Information about your app
                  </span>
                </div>
                <Label htmlFor="referral-1">Title </Label>
                <div className="">
                  <Input
                    id="referral-1-name"
                    placeholder="Lambdacrate"
                    {...register("title")}
                  />
                  {errors?.title?.message && (
                    <span className="text-red-500">{errors.title.message}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Call to Action</Label>
                  <div className="">
                    <Textarea
                      id=""
                      placeholder="Deploy a storefront for your rest api with ease."
                      className="resize-none"
                      {...register("call_to_action")}
                    />
                    {errors?.call_to_action?.message ? (
                      <span className="text-red-500">
                        {errors.call_to_action.message}
                      </span>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Value proposition that prompts your users to sign up.
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <div className="">
                    <Textarea
                      id=""
                      placeholder="Quickly go from zero to production with the click of a button. "
                      {...register("page_description")}
                      className="resize-none"
                    />

                    {errors?.page_description?.message ? (
                      <span className="text-red-500">
                        {errors.page_description.message}
                      </span>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Expand on your value proposition for the user.
                      </p>
                    )}
                  </div>
                </div>
              </section>
              <div className="w-full h-16"></div>
              <section id="web-features" className="">
                <div className="pb-8 flex flex-col space-y-2">
                  <span className="text-2xl font-medium text-slate-500">
                    Pricing And Features
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    Subscription tiers and their corresponding features. Each
                    subscription can give access to multiple features.
                  </span>
                </div>
                <div className="space-y-8">
                  <div className="space-y-1">
                    <Label>Title</Label>
                    <Input
                      placeholder="Choose a pricing plan that's right for you. "
                      {...register("pricing_title")}
                    />

                    {errors?.pricing_title?.message ? (
                      <span className="text-red-500 text-sm">
                        {errors.pricing_title.message}
                      </span>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        A short title for the pricing page of your website.
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="description">Description</Label>
                    <div className="space-y-1">
                      <Textarea
                        id=""
                        placeholder="Choose from a variety of pricing options, tailored to every developer. "
                        {...register("pricing_description")}
                        className="resize-none"
                      />
                      {errors?.pricing_description?.message ? (
                        <span className="text-red-500 text-sm">
                          {errors.pricing_description.message}
                        </span>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          A short description that expands on the pricing title.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid w-full gap-2 border-b pb-6">
                    <div className="flex w-full justify-between">
                      <p className="text-muted-foreground text-lg">Features</p>
                      <Button size="icon">
                        <PlusIcon />
                      </Button>
                    </div>
                    <div className="flex flex-row gap-2 justify-center items-center"></div>
                  </div>
                </div>

                <section id="subscription-form" className="mt-8 mb-6 space-y-8">
                  <div className="pb-8 flex flex-col space-y-2">
                    <div className="flex justify-between w-full items-center">
                      <span className="text-lg font-medium text-slate-500">
                        Subscription Details
                      </span>
                      <Button
                        className="rounded-lg"
                        variant={"default"}
                        size="icon"
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Here you can add different subscription tiers to
                      differentiate your users. You may add up to three sub
                      tiers
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="min-w-[150px]">
                              Name
                            </TableHead>
                            <TableHead className="w-[70px]">Price</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Features
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              Premium
                            </TableCell>
                            <TableCell>$49.00</TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge className="text-xs font-normal rounded-full">
                                15 Features
                              </Badge>
                            </TableCell>

                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="icon" variant="ghost">
                                    <DotsVerticalIcon className="w-4 h-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    View order
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Customer details
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex flex-row justify-end w-full"></div>
                  </div>
                </section>
              </section>
            </section>

            <Button className="rounded-full px-6" type="submit">
              Create My App
            </Button>
    */
}
