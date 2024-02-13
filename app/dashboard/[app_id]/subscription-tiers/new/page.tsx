"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { createSubscription } from "../actions";
export const SubscriptionSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(1),
  })
  .superRefine((val, ctx) => {
  
  });


export type Subscription = z.infer<typeof SubscriptionSchema>;

export default function Page({ params }: { params: { app_id: string } }) {
  const router = useRouter();
  const form = useForm<Subscription>({ resolver: zodResolver(SubscriptionSchema), defaultValues: {
    title: '',
    description: '',
    price: 0,
  } });
  const {formState, handleSubmit } = form;
  const onValid = async (data: any, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();

    const {success} = await createSubscription(params.app_id, data);
    if(success) {
      console.log('flag');
      router.replace("../subscription-tiers")
    }

  };
  return (
    <form className="max-w-2xl" onSubmit={handleSubmit(onValid)}>
      <Form {...form}>
        <div className="text-lg pb-4">
          <span>Create Tier</span>
        </div>
        <div className="w-full flex flex-col gap-6  py-3 px-4 rounded-sm h-full">
          <div className="flex flex-col space-y-1.5 w-full">
            <div className="w-full space-y-1.5">
              <FormField
                control={form.control}
                name={`title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                  <FormControl>
                  <Input
                      placeholder="e.g. Basic Plan"
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
                name={`price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                  <FormControl>
                  <Input
                      placeholder="$89.00"
                      {...field}
                    
                    ></Input>
                  </FormControl>
                  </FormItem>
                )}
              ></FormField>
            </div>
            {formState?.errors.price && (
              <span className="text-red-500 text-xs">
                {formState.errors?.price?.message}
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
                <Button type="submit">Add Tier</Button>
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
