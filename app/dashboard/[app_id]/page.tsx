
import { NavLink, Navbar } from "@/components/navbar";
import {Overview} from "./overview";
import { getAppMetaData } from "./actions";
import { Suspense } from "react";
import Loading from "./loading";
const navLinks: NavLink[] = [
  { label: "Overview", href: "", segment: null },
  { label: "Users", href: "", segment: "users" },
];
export default async function Page({ params: {app_id} }: { params: { app_id: string } }) {
  // const appMetaData = await getAppMetaData(app_id);
  // console.log(appMetaData);
  return (
       <main className="h-full w-full">
      <Overview app_id={app_id} data={{}} />
    </main>

  );
}
