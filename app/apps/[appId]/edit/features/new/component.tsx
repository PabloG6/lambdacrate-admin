/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { typeid } from "typeid-js";

import React, { useEffect } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Navbar } from "@/app/new/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ChevronDown, ChevronsUpDown, Plus } from "lucide-react";
import { useState } from "react";
import {
  ControllerRenderProps,
  FieldArrayWithId,
  FormState,
  RegisterOptions,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Editor from "@/components/editor";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Collapsible } from "@/components/ui/collapsible";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { CheckedState } from "@radix-ui/react-checkbox";
import { upsertFeatures } from "../../actions";
import { parse } from "path";
import { useRouter } from "next/navigation";

export const FeatureSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    has_example: z.boolean().optional(),

    slug: z.string().min(1),
    id: z.string().optional(),
    
  })
  .superRefine((val, ctx) => {
    // if (val.has_example && !val.code) {
    //   ctx.addIssue({
    //     code: z.ZodIssueCode.custom,
    //     message: "Requires a code snippet",
    //     path: ["code"],
    //   });
    // }
  });

export const FeatureListSchema = z.object({
  features: z.array(FeatureSchema).nonempty(),
});
export type FeatureType = z.infer<typeof FeatureSchema>;
export type FeatureListType = z.infer<typeof FeatureListSchema>;

export default function Component({ params, features }: { params: { appId: string }, features: any[] }) {
  const featuresInitial: FeatureType[] = [
    {
      slug: "",
      description: "",
      title: "",

    },
  ];
  const form = useForm<FeatureListType>({
    defaultValues: { features: featuresInitial },

    resolver: zodResolver(FeatureListSchema),
  });

  const {
    register,
    setValue,
    control,
    handleSubmit,
    trigger,
    formState,
    getValues,
    watch,
  } = form;
  const { fields, append, remove } = useFieldArray({
    name: "features",
    control: control,
    keyName: "key"
  });
  const [selectedId, setSelectedId] = useState(fields[0].key);
  const values = watch();
  const router = useRouter();
  async function onValidSubmit(form: FeatureListType) {
    const parsed = FeatureListSchema.safeParse(form);

    if (parsed.success) {
      const response = await upsertFeatures(params.appId, parsed.data);
      if (response.ok) {
        router.replace(`/apps/${params.appId}/edit`)
      }
    }
  }
  return (
    <>
      <Navbar />
      <main className="w-full h-full flex flex-col items-center p-10">
        <div className="max-w-2xl w-full flex items-center flex-col">
          <div className="w-full min-h-12 flex justify-end">
            <Button
              size="icon"
              variant={"outline"}
              type="button"
              onClick={() => {
                trigger();
                const response = FeatureListSchema.safeParse(getValues());

                if (response.success) {
                  const typeId = typeid("feat");
                  const val = append({
                    slug: "",
                    description: "",
                    title: "",
                   
                  });
                  setSelectedId(typeId.toString());
                }
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Form {...form}>
            <form
              className="w-full items-center flex flex-col gap-4"
              onSubmit={handleSubmit(onValidSubmit, () => {
                console.log(formState.errors);
              })}
            >
              <div className="w-full  border-l pl-8 [& > step-item]:step [counter-reset:step] space-y-4 ">
                {fields.map((field, idx) => {
                  const title = watch(`features.${idx}.title`);
                  return (
                    <Collapsible
                      defaultOpen
                      key={field.key}
                      className="w-full step-item step "
                      onOpenChange={(props) => {
                        console.log(props);
                      }}
                      defaultValue={fields[0].key}
                    >
                      <CollapsibleTrigger
                        asChild
                        onClick={(props) => {
                          console.log(props);
                          setSelectedId(field.key);

                          console.log("hello world");
                        }}
                        className="flex flex-1 w-full hover:bg-gray-50 py-3 px-2 tems-center justify-between mb-4"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          <span className="sr-only">Toggle</span>
                          <span className="text-sm font-medium">
                            {title ? title : "Add a feature"}
                          </span>
                          <ChevronsUpDown className="h-4 w-4" />
                        </Button>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <FeatureInput index={idx}  form={form} />
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </div>
              <div className="flex justify-end w-full flex-1 ">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <code>{JSON.stringify(values)}</code>
    </>
  );
}

function FeatureInput({

  form,
  index,
}: {
  index: number;
  form: UseFormReturn<FeatureListType>;
}) {
  const { register, setValue, control, formState, getValues, watch } = form;
  const showSnippet = watch(`features.${index}.has_example`);
  const slug = watch(`features.${index}.slug`);
  return (
    <div className="w-full flex flex-col gap-6 bg-gray-100 py-3 px-4 rounded-sm h-full">
      <div className="flex flex-col space-y-1.5 w-full">
        <div className="w-full space-y-1.5">
          <FormField
            control={form.control}
            name={`features.${index}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Unlimited Help Mes"
                  {...field}
                  onChange={(event) => {
                    field.onChange(event);
                    const value = String(event.target.value)
                      .normalize("NFKD") // split accented characters into their base characters and diacritical marks
                      .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
                      .trim() // trim leading or trailing whitespace
                      .toLowerCase() // convert to lowercase
                      .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
                      .replace(/\s+/g, "-") // replace spaces with hyphens
                      .replace(/-+/g, "-");

                    setValue(`features.${index}.slug`, value);
                  }}
                ></Input>
              </FormItem>
            )}
          ></FormField>
        </div>
        <div className="flex items-center text-xs ">
          <span className="pr-1">Slug: </span>
          <span className="text-xs text-muted-foreground">{slug}</span>
        </div>
      </div>

      <div className="flex flex-col space-y-1.5 w-full">
        <FormField
          control={form.control}
          name={`features.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <Input
                placeholder="Get as many help me's as you want. "
                {...field}
              ></Input>
              {formState?.errors.features?.[index]?.description && (
                <span className="text-red-500 text-xs">
                  {formState.errors?.features?.[index]?.description?.message}
                </span>
              )}
            </FormItem>
          )}
        ></FormField>
      </div>

      <div className="flex flex-col space-y-1.5 w-full ">
        <FormField
          control={form.control}
          name={`features.${index}.has_example`}
          render={({ field }) => (
            <FormItem className="space-x-1.5 flex items-center space-y-0">
              <FormControl>
                <Checkbox
                  id="terms"
                  onCheckedChange={field.onChange}
                  checked={field.value}
                />
              </FormControl>
              <FormLabel
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowedpeer-disabled:opacity-70  mt-0 "
              >
                I&apos;d like to add this as a landing page feature
              </FormLabel>
            </FormItem>
          )}
        ></FormField>
      </div>
    </div>
  );
}
