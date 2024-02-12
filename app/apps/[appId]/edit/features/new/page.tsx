
import { Skeleton } from "@/components/ui/skeleton";
import { getFeatures } from "../../actions";

import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";
import Loading from "./loading";
import Component from "./component";

export default async function Page({
  params
}: {
  params: { appId: string };
}) {
  noStore();

  const features = await getFeatures(params.appId)
  console.log(features);
  return (
    <Suspense fallback={<Loading/>}>
        <Component params={params} features={features}/>
    </Suspense>
  );
}
