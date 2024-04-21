import { Loader } from "lucide-react";
import { Button } from "../ui/button";

type StepCardProps = {
    children: React.ReactNode
}
export default function StepCard({children}: StepCardProps) {
   return <div className=" border-subtle flex w-full rounded-md border p-7  max-w-2xl flex-col bg-card min-h-[540px]">
        {children}
  </div>
}