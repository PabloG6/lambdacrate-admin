import { Loader, Wallet2 } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

type Props = {
    nextStep: () => void;
  };
export function CreateSubscription({nextStep} : Props) {
    return <div className="w-full h-full flex flex-col flex-1">
    <div className="w-full flex flex-col items-center justify-center flex-1">
     <div className="flex flex-col -mt-12 items-center w-[330px]">
      <Wallet2 />
      <div className="text-center mb-6 space-y-2">
        <h2 className="font-medium text-lg">Subscription Tiers</h2>
        <p className="text-muted-foreground text-sm">
          You don&apos;t have any sub tiers yet. Click the button below to
          create one.
        </p>
   
        <Button  type='button'>Create a sub tier</Button>

     
      
      </div>
    </div>

   </div>
   <div className="flex justify-end pt-6 gap-3 self-end">
      <Button size={"sm"} variant={'ghost'} >
            <span>Skip This Step</span>
          </Button>
          <Button size={"sm"} className="rounded-sm" >
            <span>Next Step</span>
          </Button>
        </div></div>
}