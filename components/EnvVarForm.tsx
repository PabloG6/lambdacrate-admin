import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvVarsSchema, EnvVarsType } from "@/lib/util/types";
import { z } from "zod";
import { RefObject, useRef } from "react";
type Props = {
  onSubmit: (
    envVars: EnvVarsType,
    keyInputRef?: RefObject<HTMLInputElement>,
  ) => void;
};
export default function EnvVarsForm({ onSubmit }: Props) {
  const keyInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof EnvVarsSchema>>({
    resolver: zodResolver(EnvVarsSchema),
    defaultValues: {
      key: "",
      value: "",
    },
  });

  const {
    formState: { isValid },
    getValues,
    reset,
  } = form;
  return (
    <Form {...form}>
      {" "}
      <div className="flex col-span-10 ">
        <FormLabel className="w-full ml-3 font-light text-sm">Key</FormLabel>
        <FormLabel className="w-full ml-3 font-light text-sm">Value</FormLabel>
      </div>
      <FormField
        name={"key"}
        render={({ field }) => (
          <>
            <FormItem className="space-y-2 col-span-5">
              <Input placeholder="EXAMPLE_KEY" {...field} ref={keyInputRef} />
            </FormItem>
          </>
        )}
      ></FormField>
      <FormField
        name={"value"}
        render={({ field }) => (
          <>
            <FormItem className="space-y-2 col-span-5">
              <Input id="" placeholder="EXAMPLE VALUE" {...field} />
            </FormItem>
          </>
        )}
      ></FormField>
      <Button
        size={"default"}
        disabled={!isValid}
        variant={"outline"}
        className="col-span-2 text-sm font-normal"
        type="button"
        onClick={() => {
          console.log("clicking button");

          onSubmit(getValues(), keyInputRef);
          reset();

          setTimeout(() => {
            keyInputRef?.current?.focus();
          }, 20);
        }}
      >
        Add
      </Button>
    </Form>
  );
}
