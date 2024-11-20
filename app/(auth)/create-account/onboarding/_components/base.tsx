import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type OnboardingButtonProps = {
  onClick?: () => void;
  link: string;
  children: React.ReactNode;
};
const OnboardingButton = ({
  onClick,
  link,
  children,
}: OnboardingButtonProps) => {
  return (
    <Button
      onClick={onClick}
      asChild
      className="max-w-[220px] w-full justify-start"
    >
      <Link href={link}>{children}</Link>
    </Button>
  );
};
export default function BaseOnboarding() {
  const { mutateAsync: accountLinkMutation, isPending } =
    trpc.accounts.link_stripe_account.useMutation({
      onSuccess: (response) => {
        console.log(response);
      },
      onError: (error) => {
        console.log(error);
      }
    });

  const onStripeAccountLink = async () => {
      const accountLink = await accountLinkMutation();
      window.location.href = accountLink.url;
  };
  return (
    <main className="flex w-full min-h-screen items-center justify-center flex-col gap-6">
      <div className="items-center justify-center flex flex-col gap-3">
        <div className="flex  justify-start">
          <div className="flex items-center justify-around text-xs uppercase">
            <span className="px-2 text-muted-foreground">
              1. Connect Stripe Account
            </span>

            <span className="text-[10px]  text-amber-800 rcapitalize font-medium">
              Pending
            </span>
          </div>
        </div>
        <Button
          disabled={isPending}
          className="bg-[#635bff] max-w-[220px] w-full justify-center"
          onClick={onStripeAccountLink}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Connect Stripe Account
        </Button>
      </div>
      <div className="flex flex-col gap-3 items-center justify-center">
        <div className="flex  justify-start">
          <div className="flex justify-around items-center text-xs uppercase">
            <span className="px-2 text-muted-foreground">
              2. Connect a Git Provider
            </span>
            <span className="text-[10px]  text-amber-800 rcapitalize font-medium">
              Pending
            </span>
          </div>
        </div>

        <OnboardingButton link={""}>
          <GitHubLogoIcon />
          Connect with Github
        </OnboardingButton>

        <OnboardingButton link={""}>
          <GitHubLogoIcon />
          Connect with BitBucket
        </OnboardingButton>

        <OnboardingButton link={""}>
          <GitHubLogoIcon />
          Connect with GitLab
        </OnboardingButton>
      </div>
    </main>
  );
}
