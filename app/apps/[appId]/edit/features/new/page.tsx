/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import * as Collapsible from "@radix-ui/react-collapsible";
import { typeid } from "typeid-js";

import React, { useEffect } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Navbar } from "@/app/new/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import {
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
const featureSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().min(1),
  key: z.string().min(1),
});

const featureListSchema = z.object({
  features: z.array(featureSchema).nonempty(),
});
type FeatureType = z.infer<typeof featureSchema>;
type FeatureListType = z.infer<typeof featureListSchema>;
const initialFeatureId = typeid("feat");
const featuresInitial: FeatureType[] = [
  {
    slug: "",
    description: "",
    name: "",
    key: initialFeatureId.toString(),
  },
];
export default function Page() {
  const formHook = useForm<FeatureListType>({
    defaultValues: { features: featuresInitial },

    resolver: zodResolver(featureListSchema),
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
  } = formHook;
  const { fields, append, remove } = useFieldArray({
    name: "features",
    control: control,
  });
  const [selectedId, setSelectedId] = useState(fields[0].key);
  console.log(fields.map((field) => field.id));

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
                const response = featureListSchema.safeParse(getValues());

                if (response.success) {
                  const typeId = typeid("feat");
                  const val = append({
                    slug: "",
                    description: "",
                    name: "",
                    key: typeId.toString(),
                  });
                  setSelectedId(typeId.toString());
                }
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <form
            className="w-full items-center flex flex-col gap-4"
            onSubmit={handleSubmit(
              () => {
                console.log("errors");
              },
              () => {
                console.log(formState.errors);
              }
            )}
          >
            <div className="w-full  border-l pl-8 [& > step-item]:step [counter-reset:step] ">
              {fields.map((field, idx) => {
                const title = watch(`features.${idx}.name`)
                return (
                  <Collapsible.Root
                    defaultOpen
                    key={field.id}
                    open={field.key === selectedId}
                    className="w-full step-item step "
                    onOpenChange={(props) => {
                      console.log(props);
                    }}
                    defaultValue={fields[0].id}
                  >
                    <Collapsible.Trigger
                      onClick={(props) => {
                        console.log(props);
                        setSelectedId(field.key);

                        console.log("hello world");
                      }}
                      className="flex flex-1 w-full hover:bg-gray-50 py-3 px-2 tems-center justify-between mb-4"
                    >
                      <span className="text-sm font-medium">
                        {title ? title : "Add a feature"}
                      </span>
                      <ChevronDown className="h-4 w-4 shrink-0" />
                    </Collapsible.Trigger>

                    <Collapsible.Content>
                      <FeatureInput index={idx} field={field} form={formHook} />
                    </Collapsible.Content>
                  </Collapsible.Root>
                );
              })}
            </div>
          </form>
        </div>
      </main>
      <code></code>
    </>
  );
}

function FeatureInput({
  field,
  form,
  index,
}: {
  field: FieldArrayWithId<FeatureType>;
  index: number;
  form: UseFormReturn<FeatureListType>;
}) {
  const [slug, setSlug] = useState("");
  const { register, setValue, control, formState, getValues, watch } = form;

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-col space-y-1.5 w-full">
        <Label htmlFor="framework">Name</Label>
        <div className="w-full space-y-1.5">
          <Input
            placeholder="Unlimited Help Mes"
            {...register(`features.${index}.name` as const)}
            onChange={(event) => {
              const value = String(event.target.value)
                .normalize("NFKD") // split accented characters into their base characters and diacritical marks
                .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
                .trim() // trim leading or trailing whitespace
                .toLowerCase() // convert to lowercase
                .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
                .replace(/\s+/g, "-") // replace spaces with hyphens
                .replace(/-+/g, "-");
              setSlug(value);
              setValue(`features.${index}.slug`, value);
            }}
          ></Input>
        </div>
        <div className="flex items-center text-xs ">
          <span className="pr-1">Slug: </span>
          <span className="text-xs text-muted-foreground">{slug}</span>
        </div>
      </div>

      <div className="flex flex-col space-y-1.5 w-full">
        <Label htmlFor="framework">Description</Label>
        <Input
          placeholder="Get as many help me's as you want. "
          {...register(`features.${index}.description`)}
        ></Input>
        {formState?.errors.features?.[index]?.description && (
          <span className="text-red-500 text-xs">
            {formState.errors?.features?.[index]?.description?.message}
          </span>
        )}
      </div>
      <Editor/>
    </div>
  );
}
