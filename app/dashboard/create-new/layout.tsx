'use client';

import { AddCallToAction } from "@/components/create-project/add-call-to-action";
import { Appearance } from "@/components/create-project/appearance";
import { CreateSubscription } from "@/components/create-project/create-subscriptions";
import NewProject from "@/components/create-project/new-project";
import StepCard from "@/components/stepper/stepcard";
import { usePathname } from "next/navigation";
import { useState } from "react";
const INITIAL_STEP = "create-project";
const steps = [
    "create-project",
    "add-call-to-action",
    "choose-colors",
    "create-subscriptions",
    "create-flags",
    "set-env-vars",
    "choose-plan"


] as const


function stepTransform(step: (typeof steps)[number]) {
  const stepIndex = steps.indexOf(step);
  if (stepIndex > -1) {
    return steps[stepIndex];
  }
  return INITIAL_STEP;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<typeof steps[number]>("create-project");
    
  return (
    <div className="w-full space-y-4 h-full flex items-start justify-center pt-8 overflow-y-auto">
      <div className="w-full max-w-2xl">
        <div className="flex gap-2 w-full">
        <div className={"bg-card h-1 w-full rounded-[1px]"} />
        <div className={"bg-card h-1 w-full rounded-[1px]"} />

        <div className={"bg-card h-1 w-full rounded-[1px]"} />

        <div className={"bg-card h-1 w-full rounded-[1px]"} />

        <div className={"bg-card h-1 w-full rounded-[1px]"} />
        <div className={"bg-card h-1 w-full rounded-[1px]"} />

        <div className={"bg-card h-1 w-full rounded-[1px]"} />


        </div>
        
        <div className="pt-4">
        <StepCard>
            {currentStep == "create-project" && <NewProject nextStep={() => {
                console.log('done');
                setCurrentStep('add-call-to-action')
            }}/>}
            {currentStep == "add-call-to-action" && <AddCallToAction nextStep={() => {
                setCurrentStep('choose-colors')
            }}/>}
             {currentStep == "choose-colors" && <Appearance nextStep={() => {
                setCurrentStep('create-subscriptions')
            }}/>}

            {currentStep == "create-subscriptions" && <CreateSubscription nextStep={() => {
                setCurrentStep('create-flags')
            }}/>}       


        </StepCard>
        </div>
       
     
      </div>


    </div>
  );
}
