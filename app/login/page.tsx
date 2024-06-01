"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { GithubIcon, Loader, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
  const authSchema = z.object({
    email: z.string(),
    password: z.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
  });
  const [isLoading, setLoading] = useState<boolean>();
  const onSubmit = () => {
    setLoading(true);
    
  };
  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
        <div className="text-2xl font-semibold pb-6">Welcome to Lambdacrate</div>
      <div className="mx-auto lg:max-w-[450px] w-full gap-4 flex flex-col">
        <form onSubmit={handleSubmit((val, e) => onSubmit)}>
          <div className="grid gap-3">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                {...register("email")}
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />

              <span className="text-red-500 text-xs">
                {errors.email?.message}
              </span>
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="*******"
                type="password"
                {...register("password")}
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
              />

              <span className="text-red-500 text-xs">
                {errors?.password?.message}
              </span>

              <Link href="/forgot_password">
                <p className="text-xs font-light  mb-1 underline text-blue-500">
                  Forgot your password?
                </p>
              </Link>
            </div>
            <Button disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Log in with email
            </Button>
          </div>
        </form>
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">OR</span>
          </div>
        </div>
        <Link href="/login/github">
        <Button
          variant="outline"
          type="button"
          className="w-full"
          
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
          )}
          Log in with Github
        </Button></Link>
      
      </div>
    </main>
  );
}
