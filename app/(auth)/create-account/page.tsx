"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ApiErrorsSchema } from "@/lib/util/types";
import {
  CreateProfileSchema,
  createProfileSchema,
} from "@/trpc/api/accounts/types";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { Loader, Loader2, Router } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const router = useRouter();
  const { mutate: createAccount, isPending } = trpc.accounts.create.useMutation();
  const form = useForm<createProfileSchema>({
    resolver: zodResolver(CreateProfileSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit, setError } = form;
  const onSubmit = (val: createProfileSchema, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    console.log(val);

    createAccount(val, {
      onSuccess: (_response) => {
        router.replace("/dashboard");
      },
      onError: (opts: unknown) => {
        console.log(opts);
        if (opts instanceof TRPCClientError) {
          const { data, success, error } = ApiErrorsSchema.safeParse(
            JSON.parse(opts.message),
          );

          console.log(error);
          if (success) {
            Object.entries(data.errors).forEach(([key, value]) => {
              console.log("key", key, "value", value[0]);
              const error = value[0];
              //@ts-ignore

              setError("email", { type: "custom", message: error });
            });
          }
        }
      },
    });
  };
  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <div className="text-2xl font-semibold pb-6">
        Create your Lambdacrate account.
      </div>
      <div className="mx-auto lg:max-w-[450px] w-full gap-4 flex flex-col">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-3">
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-1">
                    <FormLabel className="sr-only" htmlFor="email">
                      Email
                    </FormLabel>
                    <Input
                      id="email"
                      {...field}
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isPending}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-1">
                    <FormLabel className="sr-only" htmlFor="password">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder="*******"
                        type="password"
                        {...field}
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage />

                    <Link href="/forgot_password">
                      <p className="text-xs font-light  mb-1 underline text-blue-500">
                        Forgot your password?
                      </p>
                    </Link>
                  </FormItem>
                )}
              ></FormField>
              <Button disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign up with email
              </Button>
            </div>
          </form>
        </Form>
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">OR</span>
          </div>
        </div>
        <Link href="/login/github">
          <Button variant="outline" type="button" className="w-full">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GitHubLogoIcon className="mr-2 h-4 w-4" />
            )}
            Sign up with Github
          </Button>
        </Link>
      </div>
    </main>
  );
}
