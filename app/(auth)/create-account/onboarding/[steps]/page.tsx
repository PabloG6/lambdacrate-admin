"use client";

import { useParams } from "next/navigation";
import { StripeSetup } from "../_components/stripe";
import { GithubSetup } from "../_components/github";
import BaseOnboarding from "../_components/base";

const componentSteps = {
  init: BaseOnboarding,
  stripe: StripeSetup,
  "git-provider": GithubSetup,
};
export default function Page() {
  const params = useParams<{ steps: "init" | "stripe" | "git-provider" }>();
  console.log(params);

  let Component = componentSteps[params.steps]
  return (
    <main className="grid grid-cols-5 w-full h-full">
      <div className="w-full h-full col-span-2 bg-primary"></div>
      <div className="col-span-3 w-full h-full">
        {<Component/>}
      </div>
    </main>
  );
}
