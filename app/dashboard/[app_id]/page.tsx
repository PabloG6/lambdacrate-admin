
import { NavLink, Navbar } from "@/components/navbar";
import {Overview} from "./overview";
import { getAppMetaData } from "./actions";
import { Suspense } from "react";
import Loading from "./loading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
const navLinks: NavLink[] = [
  { label: "Overview", href: "", segment: null },
  { label: "Users", href: "", segment: "users" },
];
export default async function Page({ params: {app_id} }: { params: { app_id: string } }) {

  return (
       <div className="h-full w-full space-y-6">
      <div className="w-full h-full space-y-6">
      <h2 className="text-2xl font-semibold mb-10">Overview</h2>
      <Tabs className="mb-8" defaultValue="development">
        <TabsList>
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value={"preview"}>Preview</TabsTrigger>
          <TabsTrigger value={"production"}>Production</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-col gap-2 space-y-4">
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <p className="text-sm text-muted-foreground">Visit Site</p>
          </div>
          <div className="flex items-center ">
            <Link
              href={`https://${app_id}.lambdacrate.com`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="text-xs">{app_id}.lambdacrate.com</span>
            </Link>
            <OpenInNewWindowIcon className="ml-2" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">

          </div>
        </div>
      </div>
     <Suspense fallback="Loading...">
        <Overview app_id={app_id}/>
      </Suspense>
    </div>
    </div>

  );
}
