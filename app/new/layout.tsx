"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";

export default function Layout({children}: {children: React.ReactNode}) {

    const paths = usePathname();
    console.log(paths);
    return  <main>{children}</main>
}

