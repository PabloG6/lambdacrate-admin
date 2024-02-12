import { getFeatures } from "@/app/apps/[appId]/edit/actions";
import { useForm } from "react-hook-form";

export default async function Layout({
  params,
  children
}: {
  params: { app_id: string };
  children: React.ReactNode
}) {

  return (
    <>
       {children}</>
   
  );
}
