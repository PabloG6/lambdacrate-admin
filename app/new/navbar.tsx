"use client";

import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

function splitWithSlashes(str: string) {
  return str.split(/(\/)/).filter(function (element) {
    return element !== "";
  });
}

type Props = {
  navigation: { label: string; href: string; segment: string | null }[];
  className?: string;
};
export function Navbar() {
  const pathName = usePathname();

  const paths = splitWithSlashes(pathName);
  return (
    <nav className="w-full min-h-12 border-b border-b-slate-100 flex justify-center">
      <div></div>
      <div className="Breadcrumbs flex justify-between">
        <div className="flex items-center text-sm">
          <div className="flex items-center space-x-2">
            <div className="py-2 px-2 hover:bg-gray-50 rounded-sm flex items-center justify-center">
              <p className="text-sm ">Create a new app</p>
             
            </div>
            <ChevronRightIcon className="h-5 w-5 text-slate-400"></ChevronRightIcon>
            <div className="py-2 px-2 hover:bg-gray-50 rounded-sm flex items-center justify-center">
              <p className="text-sm ">Customizations</p>
             
            </div>

            <ChevronRightIcon className="h-5 w-5 text-slate-400"></ChevronRightIcon>
            <div className="py-2 px-2 hover:bg-gray-50 rounded-sm flex items-center justify-center">
              <p className="text-sm ">Environment</p>
             
            </div>

            <ChevronRightIcon className="h-5 w-5 text-slate-400"></ChevronRightIcon>
            <div className="py-2 px-2 hover:bg-gray-50 rounded-sm flex items-center justify-center">
              <p className="text-sm ">Certificates</p>
             
            </div>

            <ChevronRightIcon className="h-5 w-5 text-slate-400"></ChevronRightIcon>
            <div className="py-2 px-2 hover:bg-gray-50 rounded-sm flex items-center justify-center">
              <p className="text-sm ">Pricing</p>
             
            </div>

            
    
          </div>
        </div>
        <div className="flex"></div>
        <div className="flex items-center space-x-2">
          <div
            className="relative flex items-center"
            data-state="closed"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:r4p:"
          ></div>
        </div>
      </div>
      <div></div>
    </nav>
  );
}
