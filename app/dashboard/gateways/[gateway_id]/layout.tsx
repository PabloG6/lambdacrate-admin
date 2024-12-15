"use client";
import GwProductForm from "@/components/GwProductForm";
import { TopBar } from "@/components/top-bar";
import { LayoutProps } from "@/lib/util/props";
import { usePathname } from "next/navigation";
import SideNav from "../../_components/side-nav";
import { useEffect, useMemo, useState } from "react";
type Props = {
  params: { gateway_id: string };
} & LayoutProps;

export default function Layout({ children, params: { gateway_id } }: Props) {
  const linksMemo = useMemo<{ name: string; link: string }[]>(
    () => [
      {
        name: "Accounts",
        link: `/dashboard/gateways/${gateway_id}/accounts`,
      },
      { name: "Products", link: `/dashboard/gateways/${gateway_id}/products` },
      {
        name: "Subscriptions",
        link: `/dashboard/gateways/${gateway_id}/subscriptions`,
      },
      {
        name: "Settings",
        link: `/dashboard/gateways/${gateway_id}/settings`,
      },
    ],
    [gateway_id],
  );
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<{
    name: string;
    link: string;
  }>(linksMemo[0]);

  useEffect(() => {
    const link =
      linksMemo.find((link) => link.link == pathname) || linksMemo[0];
    console.log(link);
    setActiveLink(link);
  }, [pathname, linksMemo]);
  return (
    <main className="flex w-full flex-col h-screen">
      <TopBar
        title={activeLink.name}
        sheetContent={(onOpenChange) => (
          <GwProductForm onSubmit={onOpenChange}></GwProductForm>
        )}
      ></TopBar>
      <div className="flex w-full">
        <div className="flex flex-col p-8 max-w-[250px] w-full gap-3">
          <SideNav links={linksMemo}></SideNav>
        </div>
        <div className="w-full h-full p-8">{children}</div>
      </div>
    </main>
  );
}
