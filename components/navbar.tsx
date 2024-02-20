"use client";

import Link from "next/link";
import * as React from "react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";
export type NavLink = { label: string; href: string; segment: string | null }
type Props = {
  navigation: NavLink[];
  className?: string;
};

export const Navbar: React.FC<React.PropsWithChildren<Props>> = ({ navigation, className }) => {
  const selectedSegment = useSelectedLayoutSegment();
    console.log("selected segment", selectedSegment)
    
    const pathname = usePathname();

  return (
    <nav className={cn("sticky top-0 d z-20", className)}>
      <div className="flex overflow-x-auto items-center w-full pl-1">
        <ScrollArea className="border-none">
       <div className="w-full flex items-center py-2">
       {navigation.map(({ label, href, segment }, index) => {
            console.log(href, pathname?.startsWith(href))

            const active = segment === selectedSegment;
            return (
          
                 <Link
              href={href}
              key={href}
       
                  className={cn(
                    "text-sm hover:text-primary text-muted-foreground px-4 h-7 flex items-center min-w-20 justify-center rounded-full",
                    active
                    ? "bg-muted font-medium text-primary-foreground"
                    : "text-muted-foreground"
                
                  )}
            >
              {label}
            </Link>
          
             
          )})}
       </div>

        </ScrollArea>
   
      </div>

    </nav>
  );
};
