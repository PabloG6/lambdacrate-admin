"use server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getFeatureFlags } from "./actions";
import { Suspense } from "react";
import Loading from "@/app/apps/[appId]/edit/features/new/loading";
import { DataTable, FeatureFlagTable } from "./table";

export default async function Page({ params }: { params: { app_id: string } }) {
  const features = await getFeatureFlags(params.app_id);

  return (
    <Suspense fallback={<Loading />}>
      {features.results.length == 0 ? (
        <main className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-lg font-medium mt-[-320px]">
              Manage Feature Flags for this organization
            </div>
            <div className="max-w-xl  text-muted-foreground text-center text-xs">
              <p>
                Feature flags give you more granular control over user api
                requests and communicate subscription tier offerings. Add a
                feature flag to a subscription tier to get additional user
                management for your api.
              </p>
            </div>

            <Button size={"lg"} className="mt-4" asChild>
              <Link href="feature-flags/new">Add Flag</Link>
            </Button>
          </div>
        </main>
      ) : (
        <FeatureFlagTable data={features.results} />
      )}
    </Suspense>
  );
}
