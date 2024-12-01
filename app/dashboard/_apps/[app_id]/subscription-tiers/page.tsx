import { getSubscriptionTiers } from "./actions";
import SubTierComponent from "./table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({
  params: { app_id },
}: {
  params: { app_id: string };
}) {
  const results = await getSubscriptionTiers(app_id);

  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-end max-w-6xl">
        <Button size={"lg"} className="mt-4" asChild>
          <Link href="subscription-tiers/new">Create Tier</Link>
        </Button>
      </div>

      <SubTierComponent rows={results} />
    </div>
  );
}
