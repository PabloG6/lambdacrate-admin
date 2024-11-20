"use server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getFeatureFlags } from "./actions";
import { Suspense } from "react";
import Loading from "@/app/apps/[appId]/edit/features/new/loading";
import { EmptyDescription } from "@/components/empty-description";
import { FeatureFlagTable } from "./table";

export default async function Page({ params }: { params: { app_id: string } }) {
  const features = await getFeatureFlags(params.app_id);
  console.log(features);
  return (
    <Suspense fallback={<Loading />}>
      {!features.success || (features.results && features.results?.length == 0) ? (
        <main className="w-full h-full flex items-center justify-center">
          <EmptyDescription
            description="Feature flags give you more granular control over user api
                requests and communicate subscription tier offerings. Add a
                feature flag to a subscription tier to get additional user
                management for your api."
            title="Manage Feature Flags for this organization
                "

                href="feature-flags/new"
                buttonText="Add Flag"

          />
  
        </main>
      ) : (
        <div className="w-full">
          <div className="w-full flex justify-end">
            <Button size={"lg"} className="mt-4" asChild>
              <Link href="feature-flags/new">Add Flag</Link>
            </Button>
          </div>
          <FeatureFlagTable data={features.results} />
        </div>
      )}
    </Suspense>
  );
}
