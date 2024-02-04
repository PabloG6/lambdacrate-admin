"use client";

import { Navbar } from "@/app/new/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  FieldArrayWithId,
  UseFormRegister,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";
const featureSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().min(1),
});

const featureListSchema = z.object({ features: z.array(featureSchema) });
type FeatureType = z.infer<typeof featureSchema>;
type FeatureListType = z.infer<typeof featureListSchema>;
export default function Page() {
  const { register, setValue, control, formState } = useForm<FeatureListType>();
  const { fields, append, remove } = useFieldArray({
    name: "features",
    control: control,
  });
  return (
    <>
      <Navbar />
      <main className="w-full h-full flex flex-col items-center p-10">
        <div className="max-w-[420px] w-full flex items-center flex-col">
          <div className="w-full min-h-12 flex justify-end">
            <Button
              size="icon"
              variant={"outline"}
              type="button"
              onClick={() => append({ name: "", description: "", slug: "" })}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <form className="w-full items-center flex flex-col gap-4">
            {fields.map((field, idx) => (
              <FeatureInput field={field} index={idx} register={register} key={field.id} />
            ))}
          </form>
        </div>
      </main>
    </>
  );
}

function FeatureInput({
  field,
  index,
  register,
}: {
  field: FieldArrayWithId<FeatureType>;
  index: number;
  register: UseFormRegister<FeatureListType>;
}) {
  const [slug, setSlug] = useState("");

  return (
    <>
      <div className="flex flex-col space-y-1.5 w-full">
        <Label htmlFor="framework">Name</Label>
        <div className="w-full space-y-1.5">
          <Input
            placeholder="Unlimited Help Mes"
            {...register(`features.${index}.name`)}
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
              // setValue('slug', value)
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
        <Input placeholder="Get as many help me's as you want. "></Input>
      </div>
    </>
  );
}
