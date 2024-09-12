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

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader, MinusCircleIcon } from "lucide-react";

import { useRouter } from "next/navigation";

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
import { trpc } from "@/server/trpc";
import FormContainer from "@/components/FormContainer";
import ComputePicker from "@/components/compute-picker";
import InvoicePreview from "@/components/invoice-preview";

export default function Page({ params }: { params: { app_id: string } }) {
  const router = useRouter();
  const form = useForm<BranchInputType>({
    resolver: zodResolver(BranchInputSchema),
    defaultValues: {
      name: "",
      app_id: params.app_id,
      machine_size: "",
      dashboard_size: 'hobby',
      branch_type: "development",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "secrets",
    control: form.control,
  });

  form.setValue("app_id", params.app_id);
  const { mutateAsync, isPending } = trpc.branches.add.useMutation({
    onSuccess: (branch) => {
      console.log("branch");
      router.replace(`/dashboard/${params.app_id}/${branch.slug}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onSubmitHandler = async (
    data: BranchInputType,
    e?: React.BaseSyntheticEvent
  ) => {
    console.log("hello world");
    e?.preventDefault();
    await mutateAsync(data);
  };

  return (
    <div className="w-full space-y-4 h-full flex items-start justify-center pt-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler, (error) => {
            console.log(error);
          })}
          className="w-full max-w-3xl m-auto px-4"
        >
          <div className="flex w-full flex-col pb-16">
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[300px] font-mono">
                          <SelectValue
                            placeholder="Choose a Branch Type"
                        
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="font-mono">
                        <SelectItem value="development">Staging</SelectItem>
                        <SelectItem value="staging">Development</SelectItem>
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
              <FormField
                control={form.control}
                name="dashboard_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dashboard Size</FormLabel>
                    <Select
                      onValueChange={field.onChange}
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
                      <SelectContent className="font-mono">
                        <SelectItem value="hobby">Hobby Plan</SelectItem>
                        <SelectItem value="starter">Starter Plan</SelectItem>
                        <SelectItem value="premium">Premium Plan</SelectItem>
                        <SelectItem value="enterprise">Enterprise Plan</SelectItem>

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
                      <ComputePicker onValueChange={field.onChange} />
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
            <div className="flex justify-end pt-6">
              <Button
                size="sm"
                className="rounded-sm"
                disabled={isPending}
                type="submit"
              >
                {isPending && (
                  <Loader className="animate-spin mr-2 h-4 w-4 duration-1000" />
                )}
                <span>+ Create Branch</span>
              </Button>{" "}
            </div>
          </div>
        </form>
      </Form>
      <InvoicePreview className="max-w-lg"/>
    </div>
  );
}
