"use client";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc/client";
import { useParams } from "next/navigation";

const createAccountSchema = z.object({
  email: z.string().email(),
});
type CreateAccount = z.infer<typeof createAccountSchema>;
export default function CreateAccount() {
  const params = useParams();
  const gatewayID = params["gateway_id"] as string;
  const form = useForm<CreateAccount>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      email: "",
    },
  });
  const { mutateAsync, isPending } =
    trpc.rate_limit.createAccount.useMutation();
  const onSubmit = async (data: CreateAccount) => {
    try {
      const result = await mutateAsync({ id: gatewayID!, payload: data.email });
    } catch (error) {}
  };

  return (
    <Form {...form}>
      {" "}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-3" disabled={isPending}>
          {isPending ? "Creating..." : "Create account"}
        </Button>
      </form>
    </Form>
  );
}
