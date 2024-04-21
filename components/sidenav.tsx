"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { useSelectedLayoutSegment } from "next/navigation";

export interface NavLinkProps {
  href: string;
  title: string;
  label?: string;
  icon?: LucideIcon;
  subLinks?: NavLinkProps[];
  segment: string | null;
  variant: "default" | "ghost";
}
interface NavProps {
  isCollapsed: boolean;
  className?: string;
  onChange: (props: NavLinkProps) => void;
  links: NavLinkProps[];
}

export function SideNav({ links, isCollapsed, className, onChange }: NavProps) {
  const segment = useSelectedLayoutSegment();
  return (
    <div
      className={cn(
        "group flex flex-col gap-4 py-2 lg:max-w-[345px] xl:max-w-[500px] w-full  pt-8 pr-4 border-r h-full",
        className
      )}
    >
      <nav className="grid gap-3 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 space-y-3 ">
        {links.map((link, index) => (
          <div key={index} className="w-full">
            <Link
          
              href={link.href}
              onClick={() => onChange(link)}
              className={cn(
                buttonVariants({
                  variant: link.segment === segment ? "default" : "ghost",
                  size: "sm",
                }),
                link.segment === segment &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white cursor-pointer",
                "justify-start"
                , "w-full"
              )}
            >
              {link?.icon && <link.icon className="mr-2 h-4 w-4" />}
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    link.variant === "default" &&
                      "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>

            {link?.subLinks && (
              <nav className="grid gap-4 mx-3 border-l  px-6">
                {link?.subLinks.map((sublink, val) => (
                  <Link href={sublink.href} passHref={true} key={`${index}-${val}`} className="cursor-pointer">
                    <span className="text-xs">{sublink.title}</span>
                  </Link>
                ))}
              </nav>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
