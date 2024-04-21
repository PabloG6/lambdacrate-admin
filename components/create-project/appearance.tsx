import { getAllDefaultColors } from "@/lib/util/colors";
import { cn } from "@/lib/utils";
import { Check, Loader } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Form, FormField } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

type Props = {
  nextStep: () => void;
};

const appearanceFormSchema = z.object({
    secondaryColor: z.string().optional(),
    primaryColor: z.string().optional(),
})

type AppearanceType = z.infer<typeof appearanceFormSchema>;
export function Appearance({ nextStep }: Props) {
    const form = useForm<AppearanceType>({resolver: zodResolver(appearanceFormSchema)});
  const colors = getAllDefaultColors();
    const {pending} = useFormStatus();
const onFormSubmit = (data: any, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault()
    console.log()
    nextStep();
}
  return (
    <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="flex flex-col w-full h-full flex-1">
      {" "}
      <div className="space-y-4">
        <FormField
            name='primaryColor'
          render={({ field }) => (
            <>
              <div className="py-3 font-medium text-sm ">Primary Color</div>
              <div
                className={cn(
                  "grid grid-cols-11 grid-rows-1 max-w-[600px] rounded-md"
                )}
              >
                {colors.map((c, i) => (
                  <button
                    type="button"
                    onClick={() => {
                      field.onChange(c);
                    }}
                    style={{ backgroundColor: c }}
                    key={i}
                    className={`aspect-square  flex items-center justify-center ${
                      field.value == c
                        ? "rounded-full hover:rounded-full hover:m-[2px] m-[1px]"
                        : "hover:rounded-lg hover:m-[1px]"
                    }`}
                  >
                    <Check
                      className={cn(
                        `text-white`,
                        `${field.value == c ? "visible" : "invisible"} `
                      )}
                    />
                  </button>
                ))}
              </div>
            </>
          )}

        ></FormField>
        <FormField
          render={({ field }) => (
            <div className="">
              <div className="text-sm font-medium py-3">Secondary Color</div>
              <div
                className={cn(
                  "grid grid-cols-11 grid-rows-1 max-w-[600px] rounded-md"
                )}
              >
                {colors.map((c, i) => (
                  <button
                    type="button"
                    onClick={() => {
                      field.onChange(c);
                    }}
                    style={{ backgroundColor: c }}
                    key={i}
                    className={`aspect-square  flex items-center justify-center ${
                      field.value == c
                        ? "rounded-full hover:rounded-full hover:m-[2px] m-[1px]"
                        : "hover:rounded-lg hover:m-[1px]"
                    }`}
                  >
                    <Check
                      className={cn(
                        `text-white`,
                        `${field.value == c ? "visible" : "invisible"} `
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
                        name="secondaryColor"
        ></FormField>
          <div className="flex justify-end pt-6 gap-3">
      <Button size={"sm"} variant={'ghost'} >
            <span>Skip This Step</span>
          </Button>
          <Button size={"sm"} className="rounded-sm" >
            {pending && <Loader className="animate-spin mr-2 h-4 w-4 duration-1000" />}
            <span>Next Step</span>
          </Button>
        </div>
      </div>
    </form>
    </Form>
  );
}
