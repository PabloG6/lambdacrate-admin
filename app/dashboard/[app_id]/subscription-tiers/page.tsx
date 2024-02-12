import { EmptyDescription } from "@/components/empty-description";

export default function Page() {
  return (
   <main className="w-full h-full items-center justify-center">
     <EmptyDescription
      title={"Create Subscription Tiers for your users."}
      description={"Subscription tiers allow users to subscribe to different offerings of your service."}
      href={"subscription-tiers/new"}
      buttonText={"Add a Tier"}
    />
   </main>
  );
}
