import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";

type Props = {
  nextStep: () => void;
};
const CallToActionSchema = z.object({
  headline: z.string(),
  description: z.string(),
});
type CallToAction = z.infer<typeof CallToActionSchema>;

export function AddCallToAction({ nextStep }: Props) {
    const {pending} = useFormStatus();
  const form = useForm<CallToAction>({
    resolver: zodResolver(CallToActionSchema),
    defaultValues: {
      description: "",
      headline: "",
    },
  });

  const onFormSubmit = (data: any, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    console.log(data);
    nextStep();

  }
  return (
    <Form {...form}>
         <form onSubmit={form.handleSubmit(onFormSubmit)} className="w-full h-full flex flex-col flex-1">
      <div className="flex">
        <div>
          <div className="text-base font-semibold">Calls To Action</div>

          <div className="text-default text-sm text-muted-foreground">
            Style your landing page with custom copy that explains what your app
            does.
          </div>
        </div>
      </div>

      <Separator className="my-7 mx-auto" />
      <div className="space-y-8">
        <FormField
          name="headline"
          control={form.control}
          render={({ field }) => (
            <div className="flex gap-4 items-center">
              <FormItem className="w-full">
                <FormLabel>Main Headline</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Create commercial apis from docker containers in minutes"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            </div>
          )}
        ></FormField>

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary Headline</FormLabel>

              <FormControl className="flex">
                <Textarea
                  placeholder="Lambdacrate deploys your docker container behind an api gateway alongside a fully functional, feature rich dashboard."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
      </div>

      <div className="flex justify-end pt-6 gap-3 flex-1 items-end">
      <Button size={"sm"} variant={'ghost'} >
            <span>Skip This Step</span>
          </Button>
          <Button size={"sm"} className="rounded-sm" >
            {pending && <Loader className="animate-spin mr-2 h-4 w-4 duration-1000" />}
            <span>Next Step</span>
          </Button>
        </div>
    </form>
    </Form>
   
  );
}
