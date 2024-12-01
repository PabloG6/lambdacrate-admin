import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject, useRef } from "react";
import {
  CreateProductGateway,
  createProductGatewaySchema,
  productIntervals,
} from "@/trpc/api/gateway/types";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
type Props = {
  onSubmit: (
    product: CreateProductGateway,

    e?: React.BaseSyntheticEvent<any>,
  ) => void;
};
export default function GwProductForm({ onSubmit }: Props) {
  const keyInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<CreateProductGateway>({
    resolver: zodResolver(createProductGatewaySchema),
    defaultValues: {
      name: "",
      ext_id: "",
      description: "",
      rate_limit: 0,
      interval: "hours",
      interval_count: 1,
    },
  });

  const {
    formState: { isValid },
  } = form;
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e?.stopPropagation();
          e?.preventDefault();
          form.handleSubmit(
            (data, e) => {
              onSubmit(data, e);
            },
            (errors) => {
              console.log(errors);
            },
          )(e);
        }}
        className="flex px-4 flex-col gap-2"
      >
        <FormField
          name={"name"}
          render={({ field }) => (
            <>
              <FormItem className="space-y-2">
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Name of your product."
                  {...field}
                  ref={keyInputRef}
                />
              </FormItem>
            </>
          )}
        ></FormField>
        <FormField
          name={"description"}
          render={({ field }) => (
            <>
              <FormItem className="space-y-2">
                <FormLabel>Description</FormLabel>

                <Textarea
                  id=""
                  placeholder="Short description for your product. (Internal use)"
                  {...field}
                />
              </FormItem>
            </>
          )}
        ></FormField>

        <FormField
          name={"ext_id"}
          render={({ field }) => (
            <>
              <FormItem className="space-y-2 w-full">
                <FormLabel>Ext. ID</FormLabel>
                <Input className="w-full" {...field} />
                <FormDescription>
                  Optional, if none is provided one will be generated for you.
                </FormDescription>
              </FormItem>
            </>
          )}
        ></FormField>

        <FormField
          name={"rate_limit"}
          render={({ field }) => (
            <>
              <FormItem className="space-y-2 max-w-60">
                <FormLabel>Rate Limit</FormLabel>
                <Input
                  id=""
                  onWheel={(e) => {
                    e.currentTarget.blur();
                  }}
                  min="1"
                  type="number"
                  placeholder="50000"
                  className="w-auto"
                  {...field}
                />
              </FormItem>
            </>
          )}
        ></FormField>

        <FormField
          name="interval"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col w-full max-w-60 gap-1 m-0">
              <FormLabel>Intervals</FormLabel>

              <FormControl className=" w-auto">
                <Select onValueChange={field.onChange} defaultValue={"hours"}>
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="Choose an Interval"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectSeparator />
                    {Object.keys(productIntervals.enum).map((value) => {
                      return (
                        <SelectItem
                          key={value}
                          value={value}
                          className="relative flex w-auto cursor-default select-none items-center 
                      rounded-sm py-1.5 pr-2 text-sm outline-none focus:bg-accent 
                      focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                        >
                          <span className="capitalize font-medium">
                            {value}
                          </span>
                        </SelectItem>
                      );
                    })}
                    {}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        ></FormField>

        <FormField
          name="interval_count"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col w-full max-w-60 gap-1 m-0">
              <FormLabel>Interval Count</FormLabel>

              <FormControl className=" w-auto">
                <Input {...field} type="number"></Input>
              </FormControl>
            </FormItem>
          )}
        ></FormField>

        <div className="flex justify-end">
          <Button variant="outline" size="sm">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
