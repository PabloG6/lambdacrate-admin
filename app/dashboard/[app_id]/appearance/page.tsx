"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaintBucket, Paintbrush } from "lucide-react";
import { ReactElement, JSXElementConstructor } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  ControllerFieldState,
  UseFormStateReturn,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { updateAppDetails } from "./action";
import { useParams } from "next/navigation";

const themeSchema = z.object({
  radius: z.string().min(1),
  color: z.string().min(1),
});

export default function Page() {
  const form = useForm<z.infer<typeof themeSchema>>({
    defaultValues: {
      radius: "0.3",
      color: "bg-green-500",
    },
  });

  const color=form.watch('color');
  return (
    <div className="w-full h-full pb-16">
      <div className="flex flex-col gap-3">
        <p className="text-xl font-medium">Customize your website appearance</p>
        <p className="text-muted-foreground text-sm">
          Change the color theme, headlines and CTAs of your storefront
        </p>
      </div>

      <section className="py-4 w-full ">
        <Form {...form}>
          <form className="space-y-8 max-w-[600px]">
            <div className="space-y-4">
              <div className="mb-4 mt-6">
                <div className="text-lg font-semibold ">Ui Themes</div>
                <div className="text-xs text-muted-foreground">
                  Change the color scheme of your website, (affects buttons,
                  surface color etc.)
                </div>
              </div>
              <FormField
                name="radius"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Radius</FormLabel>
                    <ToggleGroup
                      type="single"
                      size="sm"
                      defaultValue={field.value}
                      className="justify-start flex-shrink-0"
                      variant="outline"
                      onValueChange={field.onChange}
                    >
                      {["0.1", "0.3", "0.5", "0.8", "1.0"].map((r) => (
                        <ToggleGroupItem
                          key={r}
                          value={r}
                          className="data-[state=on]:border-primary-foreground"
                        >
                          {r}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormItem>
                )}
              ></FormField>

              <FormField
                name="color"
                render={({ field }) => (
                  <div className="flex flex-col items-start gap-3 ">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} size={"sm"} type="button">
                          {" "}
                          <PaintBucket className="h-4 w-4 mr-2" /> Customize
                          Colors
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent
                        align="start"
                        sideOffset={2}
                        className="w-90"
                      >
                        <div className="text-xs  font-semibold mb-2">
                          Customize{" "}
                        </div>

                        <div className="text-xs text-muted-foreground mb-6">
                          Customize the color scheme of your app{" "}
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { name: "Green", color: "bg-green-500" },
                            { color: "bg-violet-500", name: "Violet" },
                            { color: "bg-orange-500", name: "Orange" },

                            { color: "bg-slate-500", name: "Slate" },

                            { color: "bg-red-500", name: "Red" },
                            { color: "bg-blue-500", name: "Blue" },
                            { color: "bg-yellow-500", name: "Yellow" },
                            { color: "bg-rose-500", name: "Rose" },
                            { color: "bg-fuchsia-500", name: "Fuschia" },
                          ].map((color) => (
                            <Button
                              variant="outline"
                              size="sm"
                              key={color.name}
                              onClick={() => field.onChange(color.color)}
                            >
                              {color.name}
                              <div
                                className={cn(
                                  `h-4 w-4  ml-2 rounded-full`,
                                  color.color
                                )}
                              ></div>
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <div className="flex space-x-3">
                      <div>
                        <div
                          className={cn(
                            color,
                            `h-12 w-12 rounded-full border-primary-foreground border-2 m-auto mb-2`
                          )}
                        ></div>
                        <div className="text-xs text-muted-foreground font-semibold">
                          Primary
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              ></FormField>
            </div>
          </form>
        </Form>
      </section>
      <Separator></Separator>
      <HeadlineForm />
      <FeaturesForm />
      <PricingForm />
    </div>
  );
}

function HeadlineForm() {
    const {app_id}: {app_id: string} = useParams();
  const headlineSchema = z.object({
    headline_title: z.string().min(3),
    id: z.string().min(1),
    headline_description: z.string().min(5),
  });
  const form = useForm<z.infer<typeof headlineSchema>>({
    resolver: zodResolver(headlineSchema),
    defaultValues: {
      headline_description: "",
      headline_title: "",
      id: app_id,
    },
  });


  async function  onSubmit(values: any, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();
    const response = await updateAppDetails(values)
    console.log('update app details', response)
  }

  console.log(form.formState);
  return (
    <section className="space-y-4 py-6">
      <div className="space-y-2">
        <div className="text-lg font-semibold">Headlines</div>
        <div className="text-sm text-muted-foreground">
          Customize the headlines of each section of your landing page.{" "}
        </div>
      </div>

      <div>
        <Form {...form}>
          <form
            className="max-w-[600px] "
        
            onSubmit={
              form.handleSubmit(onSubmit, (errors) => console.log(errors))
            }
          >
            <div className="py-6">
              <div className="mb-6">
                <div className="font-medium">Main Headlines</div>
                <div className="text-xs text-muted-foreground">
                  What your user sees first when they visit your site.
                </div>
              </div>
              <div className="space-y-4">
                <FormField
                  name="headline_title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>

                      <span className="text-red-500"></span>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="headline_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Description" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Button variant={"secondary"}>Update Details</Button>
            </div>
          </form>
          
        </Form>
      </div>
    </section>
  );
}

function FeaturesForm() {

    const featureSchema = z.object({
        features_title: z.string().min(1),
        features_description: z.string().min(1),
        id: z.string().min(1),
    })

    const {app_id}: {app_id: string} = useParams();
    const form = useForm<z.infer<typeof featureSchema>>({resolver: zodResolver(featureSchema), defaultValues: {
        features_title: '',
        features_description: '',
        id: app_id
    }})

    async function  onSubmit(values: any, e?: React.BaseSyntheticEvent) {
        e?.preventDefault();
        const response = await updateAppDetails(values)
        console.log('update app details', response)
      }
    
  return (
    <section>
      <div className="space-y-2">
        <div className="font-medium mb-6">Features Section</div>
        <div className="text-xs"></div>
      </div>
      <Form {...form}>
          <form
            className="max-w-[600px] "
        
            onSubmit={
              form.handleSubmit(onSubmit, (errors) => console.log(errors))
            }
          >
            <div className="py-6">
              
        
              <div className="space-y-4">
                <FormField
                  name="features_title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>

                      <span className="text-red-500"></span>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="features_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Description" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Button variant={"secondary"}>Update Details</Button>
            </div>
          </form>
          
        </Form>
   
    </section>
  );
}

function PricingForm() {
    const {app_id}: {app_id: string} = useParams();
    const pricingSchema = z.object({
      pricing_title: z.string().min(3),
      id: z.string().min(1),
      pricing_description: z.string().min(5),
    });
    const form = useForm<z.infer<typeof pricingSchema>>({
      resolver: zodResolver(pricingSchema),
      defaultValues: {
        pricing_title: "",
        pricing_description: "",
        id: app_id,
      },
    });
  
  
    async function  onSubmit(values: any, e?: React.BaseSyntheticEvent) {
      e?.preventDefault();
      const response = await updateAppDetails(values)
    }
  
    return (
      <section className="space-y-4 py-6">
       
  
        <div>
          <Form {...form}>
            <form
              className="max-w-[600px] "
          
              onSubmit={
                form.handleSubmit(onSubmit)
              }
            >
              <div className="py-6">
                <div className="mb-6">
                  <div className="font-medium">Pricing Section</div>
                  <div className="text-xs text-muted-foreground">
                    What your user sees first when they visit your site.
                  </div>
                </div>
                <div className="space-y-4">
                  <FormField
                    name="pricing_title"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Title" {...field} />
                        </FormControl>
  
                        <span className="text-red-500"></span>
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name="pricing_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea placeholder="Description" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-full flex justify-end">
                <Button variant={"secondary"}>Update Details</Button>
              </div>
            </form>
            
          </Form>
        </div>
      </section>
    
  );
}
