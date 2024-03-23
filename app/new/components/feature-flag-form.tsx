'use client';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AppInfo, FeatureSchema, FeatureType } from "@/lib/util/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlagOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Control, UseFormReturn, useForm } from "react-hook-form";
type FeatureFlagForm = {
    control: Control<AppInfo, any, AppInfo>;
    parent: UseFormReturn<AppInfo, any, AppInfo>;
}
export function FeatureFlagForm({control, parent}: FeatureFlagForm) {
    const[open, isOpen] = useState<boolean>();
    async function  onSubmit(values: any, e?: React.BaseSyntheticEvent) {
        e?.preventDefault();
        console.log(values);
        isOpen(false);
        parent?.setValue('features',  [...parent.getValues().features, values])
        console.log(parent?.getValues().features);
        
      }
  const form = useForm<FeatureType>({
    resolver: zodResolver(FeatureSchema),
    defaultValues: {
      name: "",

      description: "",
      slug: "",
    },
  });
  return (
    <>{parent?.getValues().features?.length > 0 ? <>Hello World</>:   <Dialog 
    open={open}
    
onOpenChange={(open)=> {
    form.reset();

    isOpen(open);
}}>
  <div className="w-full h-full flex items-center justify-center">
    <div className="flex flex-col items-center w-[330px]">
      <FlagOff />
      <div className="text-center mb-6 space-y-2">
        <h2 className="font-medium text-lg">Feature Flags</h2>
        <p className="text-[#606060] text-sm">
          You don&apos;t have any features yet. Click the button below to
          create one.
        </p>
        <DialogTrigger asChild>
        <Button  type='button'>Create a flag</Button>

        </DialogTrigger>
      
      </div>
    </div>
  </div>

  <DialogContent>
    <DialogHeader>Add a new flag</DialogHeader>
    <div>
      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit, (err) => {
            console.log(err);
        })}>
          <FormField
            control={form.control}
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} />
                </FormItem>
              </>
            )}
            name="name"
          ></FormField>
                      <FormField
            control={form.control}
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Input {...field} />
                </FormItem>
              </>
            )}
            name="description"
          ></FormField>
            <FormField
            control={form.control}
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <Input {...field} />
                </FormItem>
              </>
            )}
            name="slug"
          ></FormField>
   


       
        

          <DialogFooter className="py-4">
            <Button >Create Flag</Button>
          </DialogFooter>
            </form>
      </Form>
    </div>
  </DialogContent>
</Dialog>}
    </>
  
  );
}
