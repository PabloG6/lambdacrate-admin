"use client";

import { Button } from "@/components/ui/button";
import EnvVarsForm from "@/components/EnvVarForm";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Loader, MinusCircleIcon } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { BranchInputSchema, BranchInputType } from "@/types/apps";
import FormContainer from "@/components/FormContainer";
import ComputePicker from "@/components/compute-picker";
import InvoicePreview from "@/components/invoice-preview";
import { Skeleton } from "@/components/ui/skeleton";
import { useCallback, useEffect } from "react";
import { trpc } from "@/trpc/client";

export default function Page({ params }: { params: { app_id: string } }) {
  const {
    isFetching,
    data: branches,
    isSuccess,
  } = trpc.branches.git_branches.useQuery(params.app_id, {
   
    refetchOnWindowFocus: false,
  });

  const {mutate: createBranch} = trpc.branches.add.useMutation({onSuccess: (data) => {
    console.log(data);
    router.push(`/dashboard/${params.app_id}/checkout/${data.payment_ticket_id}`)
  }});

  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("branch_type", "development");
    params.set("dashboard_size", "hobby");

    params.set("target_branch", "trunk");
    router.push(pathname + `?${params.toString()}`, {scroll: false});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const pathname = usePathname();

  const updateQueryParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);

      return params.toString();
    },

    [searchParams]
  );

  const form = useForm<BranchInputType>({
    resolver: zodResolver(BranchInputSchema),
    defaultValues: {
      name: "",
      app_id: params.app_id,
      target_branch: "trunk",
      machine_size: "",
      dashboard_size: "hobby",
      branch_type: "development",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "secrets",
    control: form.control,
  });


  form.setValue("app_id", params.app_id);

 


  //path stuff for invoice


  return (
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit((data, e) => {
            e?.preventDefault()
            createBranch(data);
          })}
          className="w-full space-y-4 h-full flex items-start justify-center pt-8"
        >
          <div className="max-w-3xl w-full">
          <div className="flex w-full flex-col  m-auto pb-16">
            <div className="flex flex-col gap-6">
              <div className="flex">
                <div>
                  <div className="text-foreground text-base font-semibold">
                    Create a new Branch
                  </div>
                </div>
              </div>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <div className="flex gap-4 items-center">
                    <FormItem className="w-full m-0">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Staging Branch..." {...field} />
                      </FormControl>
                    </FormItem>
                  </div>
                )}
              ></FormField>
            </div>
            <div className="flex flex-col py-6 gap-6">
              <FormField
                control={form.control}
                name="branch_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch Type</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const updatedParams = updateQueryParams(
                          "branch_type",
                          value
                        );

                        console.log();
                        router.push(pathname + `?${updatedParams}`, {scroll: false});
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[300px] font-mono">
                          <SelectValue placeholder="Choose a Branch Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="font-mono">
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="staging">Staging</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs">
                      Branch types determine determine which users have access
                      to your application.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col py-6 gap-6">
              {isFetching && (
                <div className="h-[93px] w-[300px] space-y-2">
                  <Skeleton className="h-3 w-[100px]" />
                  <Skeleton className="h-7 w-[300px]" />
                  <Skeleton className="h-4 w-[200px]"></Skeleton>
                </div>
              )}

              {isSuccess && (
                <div>
                  <FormField
                    control={form.control}
                    name="target_branch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Branch</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const updatedParams = updateQueryParams(
                              "target_branch",
                              value
                            );
                            field.onChange(value);

                            router.push(pathname + `?${updatedParams}`, {scroll: false});
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[300px] font-mono">
                              <SelectValue
                                placeholder="Choose a Target Branch "
                                className="font-mono"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            className="font-mono"
                            defaultValue={field.value}
                          >
                            {branches.map((branch, idx) => (
                              <SelectItem key={idx} value={branch.name}>
                                {branch.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs">
                          Choose your target branch.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col py-6 gap-6">
              <FormField
                control={form.control}
                name="dashboard_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dashboard Size</FormLabel>
                    <Select
                      onValueChange={(value: string) => {
                        const updatedParams = updateQueryParams(
                          "dashboard_size",
                          value
                        );
                        field.onChange(value);
                        router.push(pathname + `?${updatedParams}`, {scroll: false});
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[300px] font-mono">
                          <SelectValue
                            placeholder="Choose a Dashboard Size"
                            className="font-mono"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        className="font-mono"
                        defaultValue={field.value}
                      >
                        <SelectItem value="hobby">Hobby Plan</SelectItem>
                        <SelectItem value="starter">Starter Plan</SelectItem>
                        <SelectItem value="premium">Premium Plan</SelectItem>
                        <SelectItem value="enterprise">
                          Enterprise Plan
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs">
                      Determine the cpu resources your client dashboard
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col py-3 gap-6">
              <FormField
                render={({ field }) => {
                  return (
                    <FormItem className="">
                      <ComputePicker
                        onValueChange={(value) => {
                          const updatedParams = updateQueryParams(
                            "machine_size",
                            value
                          );
                          field.onChange(value);
                          router.push(pathname + `?${updatedParams}`, {scroll: false});
                        }}
                      />
                    </FormItem>
                  );
                }}
                name={"machine_size"}
              ></FormField>
            </div>

            <FormContainer
              title="Environment Variables"
              className=" border p-4 rounded-md"
              description="Enter your environment variables here. These are encrypted in the database at rest."
            >
              <div className="grid gap-4">
                <div className="grid grid-cols-12 items-center gap-2">
                  <EnvVarsForm
                    onSubmit={(values, ref) => {
                      append(values);
                    }}
                  />
                  <div className="col-span-12 px-2">
                    {fields.length > 0 ? (
                      <table className="table-fixed w-full">
                        <thead className="bg-card  w-full">
                          <tr className="">
                            <th
                              colSpan={5}
                              className="rounded-l-sm rounded-bl-sm h-8 text-left px-4"
                            >
                              {" "}
                              Key
                            </th>
                            <th colSpan={5} className="text-left px-4">
                              Value
                            </th>
                            <th
                              colSpan={1}
                              className="rounded-r-sm rounded-br-sm"
                            ></th>
                          </tr>
                        </thead>
                        <tbody className="w-full">
                          {fields.map((field, index) => (
                            <tr key={index}>
                              <td colSpan={5} className="pr-2 py-3">
                                <FormField
                                  name={`secrets.${index}.key`}
                                  render={({ field }) => (
                                    <>
                                      <FormItem className="space-y-2 w-full m-0 ">
                                        <Input
                                          autoFocus={false}
                                          placeholder="KEY"
                                          className="h-9 text-sm"
                                          {...field}
                                        />
                                      </FormItem>
                                    </>
                                  )}
                                ></FormField>
                              </td>
                              <td colSpan={5} className="py-2">
                                <FormField
                                  name={`secrets.${index}.value`}
                                  render={({ field }) => (
                                    <>
                                      <FormItem className="space-y-2  m-0 w-full">
                                        <Input
                                          className=" text-sm h-9"
                                          {...field}
                                        />
                                      </FormItem>
                                    </>
                                  )}
                                ></FormField>
                              </td>
                              <td colSpan={1}>
                                <div className="flex items-center justify-center">
                                  <Button
                                    size={"icon"}
                                    variant={"ghost"}
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    <MinusCircleIcon className="size-5"></MinusCircleIcon>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </FormContainer>
        
          </div>
          </div>

          <InvoicePreview className="max-w-lg sticky top-8" onCheckout={() => {}}/>

        </form>


      </Form>

  );
}
