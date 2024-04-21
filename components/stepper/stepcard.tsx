import { Loader } from "lucide-react";
import { Button } from "../ui/button";

type StepCardProps = {
    children: React.ReactNode
}
export default function StepCard({children}: StepCardProps) {
   return <div className=" border-subtle flex w-full rounded-md border p-7 flex-col bg-card h-full">
        {children}
  </div>
}