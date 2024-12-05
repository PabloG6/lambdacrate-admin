/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Cce9lmRwLZc
 */
import Link from "next/link";

import { Button } from "@/components/ui/button";
import BackgroundWrapper from "@/components/ui/background-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lambdacrate",
  description: "Granular security for your apis",
};
export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-4 lg:px-6 h-16 flex items-center backdrop-blur bg-background/50 sticky top-0 border-b border/80">
        <nav className="flex flex-1">
          <Link className="flex items-center justify-center" href="#">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Lambdacrate</span>
          </Link>
        </nav>
        <nav className="ml-auto flex-1 flex gap-4 sm:gap-6 justify-center w-full text-foreground/80">
          <Link
            className="text-sm font-medium hover:text-foreground underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-foreground underline-offset-4"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:text-foreground underline-offset-4"
            href="#"
          >
            Documentation
          </Link>
        </nav>
        <nav className="flex gap-3 flex-1 justify-end">
          <Button variant={"ghost"} asChild>
            <Link href={"/login"}>Login</Link>
          </Button>
          <Button variant={"default"} asChild>
            <Link href={"/create-account"}>Create Account</Link>
          </Button>
        </nav>
      </div>
      <BackgroundWrapper>
        <ScrollArea className="h-screen">
          <main className="flex-1">
            <section className="w-full pt-12 md:pt-24 lg:pt-32 ">
              <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
                <div className="flex flex-col items-center justify-center max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                  <div>
                    <p className=" pb-10 text-xl max-w-4xl text-foreground text-balance font-semibold tracking-tighter sm:text-4xl md:text-5xl text-center">
                      Protect your APIs with fully customizeable Rate Limiting
                    </p>

                    <div className="flex flex-col items-center space-y-4">
                      <p className="text-balance mx-auto max-w-2xl text-muted-foreground text-base dark:text-gray-400 text-center">
                        Limit customer access to your api&apos;s through user
                        accounts, subscriptions and unique api keys.
                      </p>
                      <div className="space-x-3">
                        <Button asChild className="w-36">
                          <Link href="/create-account">Get Started</Link>
                        </Button>
                        <Button asChild variant={"outline"} className="w-36">
                          <Link href={"/login"}>
                            {" "}
                            <span>Log In</span>
                          </Link>
                        </Button>
                      </div>

                      <div className="space-x-4"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container flex items-center justify-center m-auto"></div>
            </section>
            <div className="h-24"></div>
            <section className="w-full py-12 md:py-24 lg:py-32">
              <div className="container space-y-12 px-4 md:px-6 max-w-5xl">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <p className="text-xl font-medium tracking-tighter ">
                      Features
                    </p>
                    <p className="max-w-2xl text-muted-foreground mx-auto text-center">
                      At lambdacrate, we build powerful api gateways that give
                      our customers a secure way to instantly profit
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 max-w-5xl">
                  <div className="p-6 border rounded-md">
                    <h3 className="mb-2 font-bold">User Accounts</h3>
                    <p className="text-sm leading-normal text-foreground/70">
                      Have onboarding
                    </p>
                  </div>
                  <div className="p-6 border rounded-md">
                    <h3 className="mb-2 font-bold">Documentation</h3>
                    <p className="text-sm leading-normal text-foreground/70">
                      Deploy beautiful documentation using our service and mdx.
                    </p>
                  </div>

                  <div className="p-6 border rounded-md">
                    <h3 className="mb-2 font-bold">Collect Payments</h3>
                    <p className="text-sm leading-normal text-foreground/70">
                      Create subscription tiers, allowing you to seamlessly
                      collect payments from your users.
                    </p>
                  </div>
                  <div className="p-6 border rounded-md">
                    <h3 className="mb-2 font-bold">Development Environments</h3>
                    <p className="text-sm leading-normal text-foreground/70">
                      Develop and test your api locally using our cli tool. This
                      allows
                    </p>
                  </div>
                  <div className="p-6 border rounded-md">
                    <h3 className="mb-2 font-bold">Deep Customization</h3>
                    <p className="text-sm leading-normal text-foreground/70">
                      Customize color schemes, landing pages, border radius, to
                      give your website a unique, branded feel
                    </p>
                  </div>
                  <div className="p-6 border rounded-md">
                    <h3 className="mb-2 font-bold">Custom Domains</h3>
                    <p className="text-sm leading-normal text-foreground/70">
                      Add your own domain and custom email address to your
                      application.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </ScrollArea>
      </BackgroundWrapper>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 SaaS Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
