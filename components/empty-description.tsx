"use client";

import Link from "next/link";
import { Button } from "./ui/button";
interface DescriptionProps {
  title: string;
  description: string;
  href: string;
  buttonText: string;
}
export function EmptyDescription({
  title,
  description,
  href,
  buttonText,
}: DescriptionProps) {
    console.log(title);
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-lg font-medium">{title}</div>
      <div className="max-w-xl  text-muted-foreground text-center text-xs">
        <p>{description}</p>
      </div>

      <Button size={"lg"} className="mt-4" asChild>
        <Link href={href}>{buttonText}</Link>
      </Button>
    </div>
  );
}
