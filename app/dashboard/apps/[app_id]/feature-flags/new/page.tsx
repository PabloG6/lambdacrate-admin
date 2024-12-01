"use client";

import { createFlag } from "@/app/dashboard/_apps/[app_id]/feature-flags/actions";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
 const FeatureSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),

    slug: z.string().min(1),
  })
  .superRefine((val, ctx) => {
  
  });


export type FeatureType = z.infer<typeof FeatureSchema>;

export default function Page({ params }: { params: { app_id: string } }) {
  const router = useRouter();
  const form = useForm<FeatureType>({ resolver: zodResolver(FeatureSchema), defaultValues: {
    title: '',
    description: '',
    slug: '',
  } });
  const {formState, handleSubmit } = form;
  const onValid = async (data: any, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();

    const flag = await createFlag(params.app_id, data);
    if(flag) {
      console.log('flag');
      router.replace("../feature-flags")
    }

  };
  return (
    <form className="max-w-2xl" onSubmit={handleSubmit(onValid)}>
      <Form {...form}>
        <div className="text-lg pb-4">
          <span>Create Flag</span>
        </div>
        <div className="w-full flex flex-col gap-6  py-3 px-4 rounded-sm h-full">
          <div className="flex flex-col space-y-1.5 w-full">
            <div className="w-full space-y-1.5">
              <FormField
                control={form.control}
                name={`title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                  <FormControl>
                  <Input
                      placeholder="Unlimited Help Mes"
                      {...field}
                 
                    ></Input>
                  </FormControl>
                  </FormItem>
                )}
              ></FormField>
            </div>
            {formState?.errors.title && (
              <span className="text-red-500 text-xs">
                {formState.errors?.title?.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-1.5 w-full">
            <div className="w-full space-y-1.5">
              <FormField
                control={form.control}
                name={`slug`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feature Flag</FormLabel>
                  <FormControl>
                  <Input
                      placeholder="Unlimited Help Mes"
                      {...field}
                    
                    ></Input>
                  </FormControl>
                  </FormItem>
                )}
              ></FormField>
            </div>
            {formState?.errors.description && (
              <span className="text-red-500 text-xs">
                {formState.errors?.title?.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-1.5 w-full">
            <FormField
              control={form.control}
              name={`description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                  <Input
                    placeholder="Get as many help me's as you want. "
                    {...field}
                  ></Input>
                  </FormControl>
                  {formState?.errors.description && (
                    <span className="text-red-500 text-xs">
                      {formState.errors?.description?.message}
                    </span>
                  )}
                </FormItem>
              )}
            ></FormField>
          </div>
          <div className="flex justify-end w-full flex-1 gap-4 ">
            {!formState.isSubmitting ? (
              <>
                <Button variant={"outline"} className="min-w-[90px]" asChild>
                  <Link href={`../feature-flags`}>Cancel</Link>
                </Button>
                <Button type="submit">Add Flag</Button>
              </>
            ) : (
              <>
                <Skeleton className="h-12 w-24"></Skeleton>
                <Skeleton className="h-12 w-24"></Skeleton>
              </>
            )}
          </div>
        </div>
      </Form>
    </form>
  );
}
