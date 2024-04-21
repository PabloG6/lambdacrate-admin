'use client';

import { Loader } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

type Props = {
    className?: string;
    size?: 'default' | 'sm' | 'lg' | 'icon';
    text: string;
}
export default function ProgressButton({className, size, text}: Props) {
    const { pending } = useFormStatus();
   return <Button size={size} className={cn('rounded-sm', className)} disabled={pending} type='submit'>

    {pending && <Loader className="animate-spin mr-2 h-4 w-4 duration-1000" />}
    <span>{text}</span>
  </Button>
}