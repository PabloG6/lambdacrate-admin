"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRightFromSquare, PlusCircle, Sheet } from "lucide-react";
import { useForm } from "react-hook-form";
import { ColumnDef } from "@tanstack/react-table";
import * as z from "zod";
import { FeaturesTable } from "../../../new/features-table/features-table";
import { Checkbox } from "@/components/ui/checkbox";
import { SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
const landingPageSchema = z.object({
  headline: z.string().min(1, { message: "This field is required" }),
  headlineCopy: z.string().min(1, { message: "This field is required" }),
});
type Column = {
  is_displayed: boolean;
  id: string;
  title: string;
  description: string;
  slug: string;
};
export type PageSchema = z.infer<typeof landingPageSchema>;
export default function Page({ params }: { params: { appId: string } }) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<PageSchema>({
    resolver: zodResolver(landingPageSchema),
    defaultValues: {
      headline: "Lorem Ipsum Dolor stama",
      headlineCopy:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan lacus risus, ac pharetra nulla dignissim quis. Nulla blandit leo.",
    },
  });

  const columns: ColumnDef<Column>[] = [
    {
      id: "is_displayed",
      cell: ({ row }) => <Checkbox></Checkbox>,
    },

    {
      id: "title",
      header: ({ header }) => <>Title</>,
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
      id: "description",
      header: ({ header }) => <>Description</>,
      cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    {
      id: "slug",
      header: ({ header }) => <>Slug</>,
      cell: ({ row }) => <div>{row.getValue("slug")}</div>,
    },
    {
      id: "actions",
      header: ({ header }) => (
        <div className="flex justify-end">
          <Link href={`edit/features/new`}>
            <Button size={"icon"} variant={"ghost"} className="h-5 w-5">
              <PlusCircle />
            </Button>
          </Link>
        </div>
      ),
      cell: ({ row }) => <></>,
    },
  ];

  const onFormSubmit = () => {};
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full grid grid-cols-12 h-full gap-2 max-w-7xl px-4 py-8">
        <div className="col-span-12">
          <div className="w-full">
            <p className="text-base font-medium">Customize your Landing Page</p>
            <p className="text-sm text-muted-foreground">
              App Id:{" "}
              <span className="text-xs text-muted-foreground">
                {params.appId}
              </span>
            </p>
          </div>
        </div>
        <div className=" relative w-full mx-auto lg:col-span-2 text-sm py-6 space-y-3 ">
          <div className="sticky space-y-3 top-6">
            <button className="py-2 px-4 border rounded-sm w-full flex space-between">
              <div className="flex justify-start items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                <span>Main Headlines</span>
              </div>
            </button>
            <button className="py-2 px-4 border rounded-sm cursor-pointer w-full text-start space-between">
              <span>Features</span>
            </button>
            <button className="py-2 px-4 border rounded-sm w-full text-start space-between">
              <span>Pricing </span>
            </button>
          </div>
        </div>

        <div className="w-full col-span-12 lg:col-span-7 mx-auto p-6 space-y-6">
          <Card className=" w-full mx-auto">
            <CardHeader>
              <CardTitle>Headlines</CardTitle>
              <CardDescription>
                The first thing your users see. A short description of what your
                app does.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <CardContent>
                <div className="grid w-full items-center gap-6">
                  <div className="flex flex-col space-y-1.5">
                    <div className="grid grid-cols-8 items-center">
                      <Label htmlFor="name" className="col-span-2">
                        Title
                      </Label>
                      <div className="col-span-6">
                        <Input
                          id="name"
                          placeholder="e.g. Number one Pick for Link Previews"
                          {...register("headline")}
                        />
                        {errors?.headline?.message ? (
                          <span className="text-red-500 text-xs">
                            {errors.headline.message}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Your main headline is the first thing your users
                            see. Make it snappy
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <div className="grid grid-cols-8">
                      <Label htmlFor="framework" className="col-span-2">
                        Description
                      </Label>

                      <div className="col-span-6">
                        <Textarea
                          placeholder="e.g. https://github.com/Lambdacrate/helpme.git"
                          {...register("headlineCopy")}
                        ></Textarea>
                        {errors?.headlineCopy?.message ? (
                          <span className="text-red-500 text-xs">
                            {errors.headlineCopy.message}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            A short copy of describing what your app does.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </form>
          </Card>

          <Card className=" w-full mx-auto">
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>
                Features describe what your website can do. They are created
                with a unique title, description, and a slug is generated from
                the description presented. At least 5 features are selected to
                be shown on the landing page.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <CardContent>
                <div className="grid w-full items-center gap-6">
                  <div className="flex flex-col space-y-1.5">
                    <div className="grid grid-cols-8 items-center">
                      <Label htmlFor="name" className="col-span-2">
                        Title
                      </Label>
                      <div className="col-span-6">
                        <Input
                          id="name"
                          placeholder="e.g. Number one Pick for Link Previews"
                          {...register("headline")}
                        />
                        {errors?.headline?.message ? (
                          <span className="text-red-500 text-xs">
                            {errors.headline.message}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Your main headline is the first thing your users
                            see. Make it snappy
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <div className="grid grid-cols-8">
                      <Label htmlFor="framework" className="col-span-2">
                        Description
                      </Label>

                      <div className="col-span-6">
                        <Textarea
                          placeholder="e.g. https://github.com/Lambdacrate/helpme.git"
                          {...register("headlineCopy")}
                        ></Textarea>
                        {errors?.headlineCopy?.message ? (
                          <span className="text-red-500 text-xs">
                            {errors.headlineCopy.message}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            A short copy of describing what your app does.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <FeaturesTable columns={columns} data={[]} />
                  </div>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-3 h-full py-6">
          <div className=" sticky top-6 space-y-2">
            <div className="flex items-center gap-2">
              <p className="font-medium text-sm text-foreground">Preview</p>
              <ArrowUpRightFromSquare className=" h-4 w-4 text-muted-foreground" />
            </div>
            <div className="w-[390px] mx-auto border border-slate-300 h-[300px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
