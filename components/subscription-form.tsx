import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { createProductGatewaySchema } from "@/trpc/api/gateway/types";
import {
  CreateSubscription,
  createSubscriptionSchema,
} from "@/trpc/api/accounts/rate_limit/types";
import { trpc } from "@/trpc/client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
type Props = {
  gateway_id: string;
  onSubmit: (
    product: CreateSubscription,

    e?: React.BaseSyntheticEvent<any>,
  ) => void;
};
export default function SubscriptionForm({ onSubmit, gateway_id }: Props) {
  const { data: accounts } = trpc.rate_limit.getAccounts.useQuery(gateway_id);
  const { data: products } = trpc.gateway.products.index.useQuery(gateway_id);
  const { mutateAsync: createSubscriptionAsync } =
    trpc.gateway.subscriptions.create.useMutation();
  const [productsComboboxStatus, setProductsComboboxStatus] =
    useState<boolean>(false);
  const [accountsComboboxStatus, setAccountsComboboxStatus] =
    useState<boolean>(false);
  const form = useForm<CreateSubscription>({
    resolver: zodResolver(createSubscriptionSchema),
    defaultValues: {
      email: "",
      product_id: "",
    },
  });
  const [email, setEmail] = useState<string>();
  const [product, setProduct] = useState<string>();
  const { watch } = form;
  const accountID = watch("email");
  const productID = watch("product_id");

  useEffect(() => {
    const account = accounts?.find((account) => account.id == accountID);
    if (account) {
      setEmail(`${account.email} - ${account.id}`);
    }
  }, [accountID, accounts]);

  useEffect(() => {
    const product = products?.find((product) => product.id == productID);
    if (product) {
      setProduct(`${product.name} - ${product.id}`);
    }
  }, [productID, products]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e?.stopPropagation();
          e?.preventDefault();
          form.handleSubmit(
            async (data, e) => {
              console.log("hello world create subscription async");
              await createSubscriptionAsync({
                gateway_id: gateway_id,
                accounts_id: data.email,
                products_id: data.product_id,
              });
              onSubmit(data, e);
            },
            (errors) => {
              console.log(errors);
            },
          )(e);
        }}
      >
        <FormField
          name="email"
          render={({ field }) => (
            <>
              <FormItem className="space-y-2 w-full max-w-[420px]">
                <FormLabel>Account</FormLabel>
                <Popover
                  open={accountsComboboxStatus}
                  onOpenChange={setAccountsComboboxStatus}
                >
                  <PopoverTrigger className="w-auto w-full" asChild>
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full justify-between"
                    >
                      <span className="truncate">
                        {email ?? "Select an account..."}
                      </span>
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width]">
                    <Command>
                      <CommandInput placeholder="Search for a product..."></CommandInput>
                      <CommandList>
                        <CommandEmpty>No account found...</CommandEmpty>
                        <CommandGroup>
                          {accounts?.map((account) => {
                            return (
                              <CommandItem
                                key={account.id}
                                value={account.id}
                                onSelect={(value) => {
                                  field.onChange(value);
                                  setAccountsComboboxStatus(false);
                                }}
                              >
                                <span>{account.email}</span> &mdash;{" "}
                                <span>{account.id}</span>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            </>
          )}
        ></FormField>
        <FormField
          name="product_id"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col w-full max-w-[420px] gap-1 m-0">
              <FormLabel>Product</FormLabel>
              <FormControl className=" w-auto">
                <Popover
                  open={productsComboboxStatus}
                  onOpenChange={setProductsComboboxStatus}
                >
                  <PopoverTrigger className="w-auto">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <span className="truncate">
                        {product ?? "Select a Product..."}
                      </span>{" "}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width]">
                    <Command>
                      <CommandInput placeholder="Search for a product..."></CommandInput>
                      <CommandList>
                        <CommandEmpty>No product found...</CommandEmpty>
                        <CommandGroup>
                          {products?.map((product) => {
                            return (
                              <CommandItem
                                key={product.id}
                                value={product.id}
                                onSelect={(value) => {
                                  field.onChange(value);
                                  setProductsComboboxStatus(false);
                                }}
                              >
                                <span>{product.name}</span> &mdash;{" "}
                                <span>{product.description}</span>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
