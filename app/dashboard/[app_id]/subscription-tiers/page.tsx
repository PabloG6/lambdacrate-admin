import { EmptyDescription } from "@/components/empty-description";

export default function Page() {
  return (
    <main className="w-full h-full items-center justify-center">
      <EmptyDescription
        title={"Create Subscription Tiers for your users."}
        description={
          "Subscription tiers allow users to subscribe to different offerings of your service. You may have up to four subscription tiers. You can also add multiple feature flags to a tier."
        }
        href={"subscription-tiers/new"}
        buttonText={"Add a Tier"}
      />
    </main>
  );
}
