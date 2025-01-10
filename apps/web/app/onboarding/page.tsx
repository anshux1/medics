"use client";

import { useState } from "react";

import { OnBoardingComfig } from "@/config/OnBoarding";
import { BlurOut } from "@workspace/ui/components/blur-out";
import { Button } from "@workspace/ui/components/button";
import RoleSelectCard from "@/components/onBoarding/RoleSelect";
import CreateInstitute from "@/components/onBoarding/CreateInstitute";
import { WordFadeIn } from "@workspace/ui/components/word-fade-in";

export default function Component() {
  const [step, setStep] = useState(1);
  const [animateSelectCard, setAnimateSelectCard] = useState<
    "hidden" | "visible"
  >("visible");
  const [animateForm, setAnimateForm] = useState<"hidden" | "visible">(
    "visible",
  );

  const hendleContinue = () => {
    setStep(2);
    setAnimateSelectCard("hidden");
    setAnimateForm("visible");
  };
  const handleBack = () => {
    setStep(1);
    setAnimateSelectCard("visible");
    setAnimateForm("hidden");
  };
  return (
    <div className="p-10">
      <WordFadeIn
        words={
          step === 1
            ? OnBoardingComfig.step1.heading
            : OnBoardingComfig.step2.heading
        }
        className="scroll-m-20 text-start text-4xl font-extrabold tracking-tight lg:text-5xl"
      />
      <h3 className="w-3/5 leading-7 opacity-80 [&:not(:first-child)]:mt-6">
        {step === 1
          ? OnBoardingComfig.step1.description
          : OnBoardingComfig.step2.description}
      </h3>
      <BlurOut animate={animateSelectCard}>
        <RoleSelectCard step={step} />
      </BlurOut>
      <BlurOut animate={animateForm}>
        <CreateInstitute step={step} />
      </BlurOut>
      <div className="flex gap-2">
        <Button
          onClick={handleBack}
          variant="outline"
          className={`${step === 2 && "visible"}`}
        >
          Back
        </Button>
        <Button onClick={hendleContinue}>
          {step === 2 ? "Create" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
