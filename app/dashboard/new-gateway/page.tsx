"use client";

import { useState } from "react";
import {
  useForm,
  useFieldArray,
  FieldArrayWithId,
  UseFieldArrayRemove,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc/client";
import { createGatewaySchema, CreateGateway } from "@/trpc/api/gateway/types";
import GwProductForm from "@/components/GwProductForm";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, SquareChevronRight, XIcon } from "lucide-react";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function Page() {
  const form = useForm<CreateGateway>({
    defaultValues: {
      name: "",
      description: "",
      price: "basic",
      products: [],
    },
    resolver: zodResolver(createGatewaySchema),
  });
  const { fields, remove, append } = useFieldArray({
    name: "products",
    control: form.control,
  });

  const [isGwOpen, setGwOpen] = useState<boolean>(false);
  const { mutateAsync } = trpc.gateway.create.useMutation();
  const router = useRouter();
  const SubscriptionDisplay = {
    basic: (
      <div className="flex gap-2 items-center">
        <span className="text-sm">Basic</span>
      </div>
    ),
    standard: (
      <div className="flex gap-2 items-center">
        <span className="text-sm">Standard</span>
      </div>
    ),
    premium: (
      <div className="flex gap-2 items-center">
        <span className="text-sm">Premium</span>
      </div>
    ),
  };
  const onSubmit = async (data: CreateGateway) => {
    const response = await mutateAsync({ ...data });
    const uuid = crypto.randomUUID();
    router.replace(
      `/dashboard/new-gateway/${response.gateway_id}/checkout?ref_id=${uuid}`,
    );
  };

  return (
    <div className="flex w-full flex-col h-screen max-h-screen bg-background">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-grow overflow-hidden max-h-[calc(100vh-4rem)]"
        >
          <ScrollArea
            className="flex-grow px-4"
            style={{ maxHeight: "calc(100vh - 8rem)" }}
          >
            <div className="max-w-3xl mx-auto space-y-6 py-6">
              <div>
                <div className="text-foreground text-base font-semibold">
                  Gateway Information
                </div>
                <div className="text-sm text-muted-foreground">
                  Provide some information about your gateway.
                </div>
              </div>

              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder="e.g. My Gateway" {...field} />
                  </FormItem>
                )}
              />

              <FormField
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      placeholder="Short description of gateway (Internal Use)"
                      {...field}
                    />
                  </FormItem>
                )}
              />

              <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1 m-0">
                    <FormLabel>Choose a Subscription Tier</FormLabel>

                    <FormControl className="min-w-72">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={"basic"}
                      >
                        <SelectTrigger className="w-auto">
                          <SelectValue placeholder="Subscription Tier">
                            {SubscriptionDisplay[field.value ?? "basic"]}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">
                            <div className="items-start flex px-3 py-2">
                              <div className="flex gap-1 flex-col">
                                <div className="w-full flex gap-2 flex-col">
                                  <div className="flex gap-2">
                                    <SquareChevronRight className="w-5 h-5"></SquareChevronRight>
                                    <span className="text-uppercase">
                                      Basic Plan
                                    </span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    Basic Subscription
                                  </span>
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="standard"
                            className="relative flex w-full cursor-default select-none 
                            items-center rounded-sm 
                            py-1.5 pr-2 text-sm outline-none 
                            focus:bg-accent 
                            focus:text-accent-foreground 
                            data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                          >
                            <div className="items-start flex px-3 py-2">
                              <div className="flex w-full gap-1 flex-col">
                                <div className="w-full flex gap-2 flex-col">
                                  <div className="flex gap-2">
                                    <SquareChevronRight className="w-5 h-5"></SquareChevronRight>
                                    <span className="text-uppercase">
                                      Standard Plan
                                    </span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    Standard Subscription
                                  </span>
                                </div>
                              </div>
                            </div>
                          </SelectItem>

                          <SelectItem
                            value="premium"
                            className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                          >
                            <div className="items-start flex px-3 py-2">
                              <div className="flex w-full gap-1 flex-col">
                                <div className="w-full flex gap-2 flex-col">
                                  <div className="flex gap-2">
                                    <SquareChevronRight className="w-5 h-5"></SquareChevronRight>
                                    <span className="text-uppercase">
                                      Premium Plan
                                    </span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    Premium Subscription
                                  </span>
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Products</h2>
                  <Dialog open={isGwOpen} onOpenChange={setGwOpen}>
                    <DialogTitle className="sr-only">
                      Add a product.
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                      These are entries your users can subscribe to.
                    </DialogDescription>
                    <DialogTrigger asChild>
                      <Button type="button" size="sm" variant="outline">
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <GwProductForm
                        onSubmit={(values) => {
                          console.log(isGwOpen);
                          append(values);
                          setGwOpen(false);
                        }}
                      ></GwProductForm>
                    </DialogContent>
                  </Dialog>
                </div>

                {fields.length === 0 ? (
                  <div className="text-center space-y-2 py-8 text-muted-foreground">
                    You currently have no products.
                  </div>
                ) : (
                  <div className="space-y-2 m-auto">
                    {fields.map((field, index) => (
                      <ProductPreview
                        remove={remove}
                        index={index}
                        key={field.id}
                        field={field}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
          <div className="flex-none h-16 p-4 border-t bg-background">
            <div className="max-w-3xl mx-auto">
              <Button type="submit" className="w-full">
                Create Gateway
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

const ProductPreview = ({
  field,
  index,
  remove,
}: {
  index: number;
  remove: UseFieldArrayRemove;
  field: FieldArrayWithId<CreateGateway, "products", "id">;
}) => {
  return (
    <div className="w-full flex items-center border rounded-md justify-between h-12 px-3">
      <div className="flex gap-3 items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="w-8 h-8 rounded-full"
              variant="ghost"
              size="icon"
            >
              <XIcon />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-medium ">
                Remove this product?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
              <DialogFooter>
                <Button
                  variant={"destructive"}
                  size="sm"
                  onClick={() => {
                    console.log(field.id);
                    remove(index);
                  }}
                >
                  Remove
                </Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <p className="font-medium text-sm">
          {field.name} -{" "}
          <span className="text-muted-foreground font-medium">
            {field.description}
          </span>
        </p>
      </div>
      <Button type="button" className="h-8 w-8 rounded-full" variant="ghost">
        <ChevronDown />
      </Button>
    </div>
  );
};
