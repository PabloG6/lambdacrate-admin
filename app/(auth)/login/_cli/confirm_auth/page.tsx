"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
const signUpForm = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export default function Page() {
  const form = useForm<z.infer<typeof signUpForm>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="mx-auto max-w-sm space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">CLI Login</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your information to login to your account
        </p>
      </div>
      {/* <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onFormSubmit)}> 
          <div className="space-y-2">
            <FormLabel></FormLabel>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                    {...field}
                      id="email"
                      placeholder="m@example.com"
                      required
                      type="email"
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          </div>
          <div className="space-y-2">
            <FormLabel></FormLabel>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                     {...field}
                      id="email"
                      placeholder="*******"
                      required
                      type="password"
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          </div>
          <Button className="w-full" type="submit">Login</Button>
        </form>
      </Form> */}
    </div>
  );
}
