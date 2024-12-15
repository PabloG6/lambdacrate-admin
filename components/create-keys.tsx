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
import { Loader2 } from "lucide-react";
import {
  CreateApiKeySchema,
  createApiKeySchema,
} from "@/trpc/api/apikeys/types";

type Props = {
  onNotifySubmit?: () => void;
};
export default function CreateApiKey({ onNotifySubmit }: Props) {
  const params = useParams();
  const form = useForm<CreateApiKeySchema>({
    resolver: zodResolver(createApiKeySchema),
    defaultValues: {
      name: "",
    },
  });
  const { mutateAsync, isPending } = trpc.api_keys.create.useMutation();
  const onSubmit = async (data: CreateApiKeySchema) => {
    try {
      const result = await mutateAsync(data);
      onNotifySubmit?.();
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="My Example Key" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-3" disabled={isPending}>
          {isPending ?? <Loader2 />}{" "}
          {isPending ? "Creating..." : "Create api key"}
        </Button>
      </form>
    </Form>
  );
}
