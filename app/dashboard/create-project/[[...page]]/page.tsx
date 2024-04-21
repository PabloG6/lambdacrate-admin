"use client";

import { AddCallToAction } from "@/components/create-project/add-call-to-action";
import { Appearance } from "@/components/create-project/appearance";
import { CreateSubscription } from "@/components/create-project/create-subscriptions";
import NewProject from "@/components/create-project/new-project";
import StepCard from "@/components/stepper/stepcard";

import { useRouter } from "next/navigation";
import { useState } from "react";

const steps = [
  "getting-started",
  "configure_cta",
  "configure_appearance",
  "configure_subs",
  "configure_feature_flags",
  "configure_domains",

  "configure_env_vars",
  "choose-plan",
] as const;

const INITIAL_STEP = steps[0];
type stepTransform = (typeof steps)[number];

function stepTransform(step: (typeof steps)[number]): stepTransform {
  const stepIndex = steps.indexOf(step);
  if (stepIndex > -1) {
    return steps[stepIndex];
  }
  return INITIAL_STEP;
}

export default function Page({
  params,
}: {
  params: { page: (typeof steps)[number][] };
}) {
  console.log(params);
  const path = params?.page[0] ?? INITIAL_STEP;
  console.log(path);
  const [configOpts, setConfigOpts] = useState<string[]>([]);
  const router = useRouter();

  const checkCurrentStep = (target: (typeof steps)[number]) => {
    const current = stepTransform(path);
  
    return current == target && configOpts.indexOf(current) > -1;
  };

  const nextStep = (current: stepTransform) => {
    const index = steps.indexOf(current);
    if (index > -1) {
      console.log("index: ", steps[index + 1]);
      return steps[index + 1];
    }
    return INITIAL_STEP;
  };

  const currentStep = stepTransform(path);
  return (
    <div className="w-full space-y-4 h-full flex items-start justify-center pt-8">
      <div className="w-full max-w-xl">
        <div className="flex gap-2 w-full">
          <div className={"bg-card h-1 w-full rounded-[1px]"} />
          <div className={"bg-card h-1 w-full rounded-[1px]"} />
          <div className={"bg-card h-1 w-full rounded-[1px]"} />


        </div>

        <div className="pt-4">
          <StepCard>
            {currentStep == "getting-started" && (
              <NewProject
                nextStep={(options) => {

                  router.push(`/dashboard/create-project/${nextStep(currentStep)}`);
               }}
              />
            )}
            {checkCurrentStep("configure_cta") && (
              <AddCallToAction
                nextStep={() => {
                  router.push(`/dashboard/create-project/${nextStep(currentStep)}`);
                }}
              />
            )}
            {checkCurrentStep("configure_appearance") && (
              <Appearance
                nextStep={() => {
                  router.push(`/dashboard/create-project/${nextStep(currentStep)}`);
                }}
              />
            )}

            {checkCurrentStep("configure_subs") && (
              <CreateSubscription
                nextStep={() => {
                  router.push(`/dashboard/create-new/${nextStep(currentStep)}`);
                }}
              />
            )}
          </StepCard>
        </div>
      </div>
    </div>
  );
}
