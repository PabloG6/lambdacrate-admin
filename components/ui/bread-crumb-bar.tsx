"use client";

import {
  usePathname,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./breadcrumb";
import Link from "next/link";

export default function BreadcrumbBar() {
  const pathname = usePathname();

  const regex = /(\/)/g; // Regular expression to capture slashes

  const listedPaths = pathname
    .substring(1, pathname.length)
    .split(regex)
    .filter(Boolean);

  return (
    <nav className="flex w-full">
      <Breadcrumb>
        <BreadcrumbList>
          {listedPaths.map((path, index) => {
            if (path.includes("/")) {
              return <BreadcrumbSeparator key={index} />;
            } else {
              const url = listedPaths.slice(0, index + 1).join("");
              return (
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink className="capitalize" asChild>
                    <Link href={"/" +url}>{path.replace("_", " ")}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            }
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
