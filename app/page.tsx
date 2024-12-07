/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Cce9lmRwLZc
 */
import Link from "next/link";

import { Button } from "@/components/ui/button";
import BackgroundWrapper from "@/components/ui/background-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Metadata } from "next";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Table } from "@/components/custom/table";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckIcon, MinusIcon } from "lucide-react";
export const metadata: Metadata = {
  title: "Lambdacrate",
  description: "Granular security for your apis",
};
interface PlanFeature {
  type: string;
  features: {
    name: string;
    free: boolean;
    startup: boolean;
    team: boolean;
    enterprise: boolean;
  }[];
}

const planFeatures: PlanFeature[] = [
  {
    type: "Financial data",
    features: [
      {
        name: "Open/High/Low/Close",
        free: true,
        startup: true,
        team: true,
        enterprise: true,
      },
      {
        name: "Price-volume difference indicator	",
        free: true,
        startup: true,
        team: true,
        enterprise: true,
      },
    ],
  },
  {
    type: "On-chain data",
    features: [
      {
        name: "Network growth",
        free: true,
        startup: false,
        team: true,
        enterprise: true,
      },
      {
        name: "Average token age consumed",
        free: true,
        startup: false,
        team: true,
        enterprise: true,
      },
      {
        name: "Exchange flow",
        free: false,
        startup: false,
        team: true,
        enterprise: true,
      },
      {
        name: "Total ERC20 exchange funds flow",
        free: false,
        startup: false,
        team: true,
        enterprise: true,
      },
    ],
  },
  {
    type: "Social data",
    features: [
      {
        name: "Dev activity",
        free: false,
        startup: true,
        team: false,
        enterprise: true,
      },
      {
        name: "Topic search",
        free: true,
        startup: true,
        team: true,
        enterprise: true,
      },
      {
        name: "Relative social dominance",
        free: true,
        startup: true,
        team: false,
        enterprise: true,
      },
    ],
  },
];

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-4 lg:px-6 h-16 flex items-center backdrop-blur bg-background/50 sticky top-0 border-b border/80">
        <nav className="flex flex-1">
          <Link
            className="md:flex md:items-center md:justify-center hidden"
            href="#"
          >
            <Image width={120} height={80} src={"/logo.png"} alt={"Logo"} />
            <span className="sr-only">Lambdacrate</span>
          </Link>
          <Button size="icon" variant={"ghost"} className="md:hidden">
            <HamburgerMenuIcon></HamburgerMenuIcon>
          </Button>
        </nav>
        <nav className="hidden ml-auto flex-1 md:flex gap-4 sm:gap-6 justify-center w-full text-foreground/80">
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
                      <div className="flex flex-col gap-2 md:gap-1 md:flex-row items-center">
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
                <div className="flex flex-col gap-3 md:grid lg:grid-cols-3 md:grid-cols-2 md:gap-4 max-w-5xl">
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
            <section className="px-8">
              <Table className="hidden lg:table">
                <TableHeader>
                  <TableRow className="bg-muted hover:bg-muted">
                    <TableHead className="w-3/12 text-primary">Plans</TableHead>
                    <TableHead className="w-2/12 text-primary text-lg font-medium text-center">
                      Free
                    </TableHead>
                    <TableHead className="w-2/12 text-primary text-lg font-medium text-center">
                      Startup
                    </TableHead>
                    <TableHead className="w-2/12 text-primary text-lg font-medium text-center">
                      Team
                    </TableHead>
                    <TableHead className="w-2/12 text-primary text-lg font-medium text-center">
                      Enterprise
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {planFeatures.map((featureType) => (
                    <>
                      <TableRow className="bg-muted/50" key={featureType.type}>
                        <TableCell colSpan={5} className="font-bold">
                          {featureType.type}
                        </TableCell>
                      </TableRow>
                      {featureType.features.map((feature) => (
                        <TableRow
                          key={feature.name}
                          className="text-muted-foreground"
                        >
                          <TableCell>{feature.name}</TableCell>
                          <TableCell>
                            <div className="mx-auto w-min">
                              {feature.free ? (
                                <CheckIcon className="h-5 w-5" />
                              ) : (
                                <MinusIcon className="h-5 w-5" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="mx-auto w-min">
                              {feature.startup ? (
                                <CheckIcon className="h-5 w-5" />
                              ) : (
                                <MinusIcon className="h-5 w-5" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="mx-auto w-min">
                              {feature.team ? (
                                <CheckIcon className="h-5 w-5" />
                              ) : (
                                <MinusIcon className="h-5 w-5" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="mx-auto w-min">
                              {feature.enterprise ? (
                                <CheckIcon className="h-5 w-5" />
                              ) : (
                                <MinusIcon className="h-5 w-5" />
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ))}
                </TableBody>
              </Table>

              <div className="space-y-24 lg:hidden">
                <section>
                  <div className="mb-4">
                    <h4 className="text-xl font-medium">Free</h4>
                  </div>
                  <Table>
                  <TableBody>
                  {planFeatures.map((featureType) => (
                      <>
                        <TableRow
                          key={featureType.type}
                          className="bg-muted hover:bg-muted"
                        >
                          <TableCell
                            colSpan={2}
                            className="w-10/12 text-primary font-bold"
                          >
                            {featureType.type}
                          </TableCell>
                        </TableRow>
                        {featureType.features.map((feature) => (
                          <TableRow
                            className="text-muted-foreground"
                            key={feature.name}
                          >
                            <TableCell className="w-11/12">
                              {feature.name}
                            </TableCell>
                            <TableCell className="text-right">
                              {feature.enterprise ? (
                                <CheckIcon className="h-5 w-5" />
                              ) : (
                                <MinusIcon className="h-5 w-5" />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    ))}
                  </TableBody>
                  </Table>
                </section>
                <section>
                  <div className="mb-4">
                    <h4 className="text-xl font-medium">Startup</h4>
                  </div>
                  <Table>
                    <TableBody>   {planFeatures.map((featureType) => (
                      <>
                        <TableRow
                          key={featureType.type}
                          className="bg-muted hover:bg-muted"
                        >
                          <TableCell
                            colSpan={2}
                            className="w-10/12 text-primary font-bold"
                          >
                            {featureType.type}
                          </TableCell>
                        </TableRow>
                        {featureType.features.map((feature) => (
                          <TableRow
                            className="text-muted-foreground"
                            key={feature.name}
                          >
                            <TableCell className="w-11/12">
                              {feature.name}
                            </TableCell>
                            <TableCell className="text-right">
                              {feature.startup ? (
                                <CheckIcon className="h-5 w-5" />
                              ) : (
                                <MinusIcon className="h-5 w-5" />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    ))}</TableBody>
                 
                  </Table>
                </section>
                <section>
                  <div className="mb-4">
                    <h4 className="text-xl font-medium">Team</h4>
                  </div>
                  <Table>
                  <TableBody>
                  {planFeatures.map((featureType) => (
                      <>
                        <TableRow
                          key={featureType.type}
                          className="bg-muted hover:bg-muted"
                        >
                          <TableCell
                            colSpan={2}
                            className="w-10/12 text-primary font-bold"
                          >
                            {featureType.type}
                          </TableCell>
                        </TableRow>
                        {featureType.features.map((feature) => (
                          <TableRow
                            className="text-muted-foreground"
                            key={feature.name}
                          >
                            <TableCell className="w-11/12">
                              {feature.name}
                            </TableCell>
                            <TableCell className="text-right">
                              {feature.team ? (
                                <CheckIcon className="h-5 w-5" />
                              ) : (
                                <MinusIcon className="h-5 w-5" />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    ))}
                  </TableBody>
                  </Table>
                </section>
                <section>
                  <div className="mb-4">
                    <h4 className="text-xl font-medium">Enterprise</h4>
                  </div>
                  <Table>
                      <TableBody>
                      {planFeatures.map((featureType) => (
                      <>
                        <TableRow
                          key={featureType.type}
                          className="bg-muted hover:bg-muted"
                        >
                          <TableCell
                            colSpan={2}
                            className="w-10/12 text-primary font-bold"
                          >
                            {featureType.type}
                          </TableCell>
                        </TableRow>
                        {featureType.features.map((feature) => (
                          <TableRow
                            className="text-muted-foreground"
                            key={feature.name}
                          >
                            <TableCell className="w-11/12">
                              {feature.name}
                            </TableCell>
                            <TableCell className="text-right">
                              {feature.enterprise ? (
                                <CheckIcon className="h-5 w-5" />
                              ) : (
                                <MinusIcon className="h-5 w-5" />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    ))}
                      </TableBody>
                  </Table>
                </section>
              </div>
              {/* End xs to lg */}
            </section>
          </main>
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
        </ScrollArea>
      </BackgroundWrapper>

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
