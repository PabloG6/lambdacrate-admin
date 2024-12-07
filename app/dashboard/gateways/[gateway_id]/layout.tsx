import { LayoutProps } from "@/lib/util/props";
import Link from "next/link";
import SideNav from "../../_components/side-nav";
import { ArrowLeft } from "lucide-react";
import { HydrateClient } from "@/trpc/server";
type Props = {
  params: { gateway_id: string };
} & LayoutProps;
export default function Layout({ children, params: { gateway_id } }: Props) {
  const links = [
    { name: "Overview", link: `/dashboard/gateways/${gateway_id}` },
    { name: "Accounts", link: `/dashboard/gateways/${gateway_id}/accounts` },
    { name: "Products", link: `/dashboard/gateways/${gateway_id}/products` },
    {
      name: "Subscriptions",
      link: `/dashboard/gateways/${gateway_id}/subscriptions`,
    },
    {
      name: "Settings",
      link: `/dashboard/gateways/${gateway_id}/settings`,
    },
  ];
  return (
    <HydrateClient>
      <main className="flex w-full h-screen">
        <div className="flex flex-col p-8 max-w-[250px] w-full gap-3">
          <Link href="/dashboard">
            <div className="flex justify-start hover:underline hover:font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Back to Dashboard</span>
            </div>
          </Link>
          <SideNav links={links}></SideNav>
        </div>
        <div className="w-full h-full p-8">{children}</div>
      </main>
    </HydrateClient>
  );
}
